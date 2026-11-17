const logger = require('../logger');
const { getMods } = require('../api/curseforge');
const { getProjects } = require('../api/modrinth');
const getJSONResponse = require('../api/getJSONResponse');
const { Projects } = require('../database/db');

const MAX_BATCH_CALL_SIZE_MR = 500;

exports.task = async () => {
  logger.debug('Running global update check...');

  let detectedUpdates = [];

  // Get all projects from the database. We seperate them by platform so we can call the appropriate API and read the returned data correctly
  const dbCurseforgeProjects = await Projects.findAll({
    where: { platform: 'CurseForge' },
  });
  const dbModrinthProjects = await Projects.findAll({
    where: { platform: 'Modrinth' },
  });

  const dbCurseforgeProjectsIds = [];
  for (const dbProject of dbCurseforgeProjects) {
    // Temporarily prevent any non-Minecraft project on CurseForge from being checked for updates until I implement better support
    if (dbProject.gameId !== 432) continue;
    dbCurseforgeProjectsIds.push(dbProject.id);
  }

  const dbModrinthProjectIds = [];
  for (const dbProject of dbModrinthProjects) {
    dbModrinthProjectIds.push(dbProject.id);
  }

  // Call the CurseForge API
  let requestedMods;
  if (dbCurseforgeProjectsIds.length) {
    var curseforgeResponseData = await getMods(dbCurseforgeProjectsIds);
    if (curseforgeResponseData) {
      if (curseforgeResponseData.statusCode === 200) {
        requestedMods = await getJSONResponse(curseforgeResponseData.body);
      } else {
        logger.warn(`Unexpected ${curseforgeResponseData.statusCode} status code while checking CurseForge projects for updates.`);
      }
    } else {
      logger.warn('A request to CurseForge timed out while checking projects for updates.');
    }
  } else {
    logger.info('No CurseForge projects in database. Skipping.');
  }

  const requestedProjects = [];
  if (dbModrinthProjectIds.length) {
    // Split into batches
    let batches = [];
    if (dbModrinthProjectIds.length > MAX_BATCH_CALL_SIZE_MR) {
      for (let i = 0; i <= Math.ceil(dbModrinthProjectIds.length / MAX_BATCH_CALL_SIZE_MR) + 1; i++) {
        batches.push(dbModrinthProjectIds.slice(0, MAX_BATCH_CALL_SIZE_MR));
        dbModrinthProjectIds.splice(0, MAX_BATCH_CALL_SIZE_MR);
      }
    } else {
      batches.push(dbModrinthProjectIds);
    }

    // Grab the data from Modrinth
    for (const batch of batches) {
      const response = await getProjects(batch);
      if (response) {
        if (response.statusCode === 200) {
          const data = await getJSONResponse(response.body);
          for (const project of data) {
            requestedProjects.push(project);
          }
        } else {
          logger.warn(`Unexpected ${response.statusCode} status code while checking Modrinth projects for updates.`);
        }
      }
    }
  } else {
    logger.info('No Modrinth projects in database. Skipping.');
  }

  // Process information returned from the CurseForge API and perform checks
  if (dbCurseforgeProjects.length) {
    for (const dbProject of dbCurseforgeProjects) {
      // If the initial API call failed
      if (!requestedMods) break;
      const requestedMod = requestedMods.data.find((element) => element.id.toString() === dbProject.id);
      if (!requestedMod) {
        // logger.warn(`Modrunner failed to locate a database project ${dbProject.name}'s (${dbProject.id}) information in the response data.`);
        continue;
      }
      // Check if this project has been updated
      if (dbProject.dateUpdated.getTime() !== new Date(requestedMod.dateReleased).getTime()) {
        // Verify the file has been approved
        /*
        if (requestedMod.latestFilesIndexes[0].fileStatus !== 4) {
          logger.debug(`${dbProject.name}'s latest file has not been approved.`);
          continue;
        }
				*/
        // Verify the project has files
        if (requestedMod.latestFilesIndexes.length > 0) {
          // Verify that this latest file's ID is not in the database. If it is, it has already been reported as updated
          if (dbProject.fileIds.includes(requestedMod.latestFilesIndexes[0].fileId)) {
            logger.debug(`${dbProject.name}'s latest file has already been reported on.`);
            await dbProject.updateDate(requestedMod.dateReleased);
            continue;
          }
        } else {
          logger.debug(`Project ${dbProject.name} has no uploaded files.`);
          continue;
        }

        // If we get here, the project has passed all verification checks and has a legitmate update available
        logger.info(
          `Update detected for CurseForge project ${dbProject.name} (${dbProject.id})\nFilename: ${requestedMod.latestFilesIndexes[0].fileName}\nFile Id: ${requestedMod.latestFilesIndexes[0].fileId}`
        );

        await dbProject.updateDate(requestedMod.dateReleased);
        await dbProject.addFiles([requestedMod.latestFilesIndexes[0].fileId]);
        await dbProject.updateName(requestedMod.name);

        detectedUpdates.push({ requestedMod, dbProject });
      } else {
        logger.debug(`No update detected for ${dbProject.name}.`);
      }
    }
  }
  logger.debug('CurseForge update check complete.');

  // Process information returned from the Modrinth API and perform checks
  if (dbModrinthProjects.length) {
    for (const dbProject of dbModrinthProjects) {
      // If the initial API call failed
      if (!requestedProjects) break;
      const requestedProject = requestedProjects.find((project) => project.id === dbProject.id);
      // Check if the project was actually returned by the API
      if (!requestedProject) {
        logger.debug(`Detected a project that does not exist during Modrinth update check: ${dbProject.name} (${dbProject.id})`);
        continue;
      }
      // Check if the project has been updated
      for (const fileId of requestedProject.versions) {
        if (dbProject.fileIds.includes(fileId)) {
          logger.debug(`No update detected for ${dbProject.name}.`);
          continue;
        } else {
          logger.info(`Update detected for Modrinth project ${dbProject.name} (${dbProject.id})`);

          await dbProject.updateDate(requestedProject.updated);
          await dbProject.addFiles(requestedProject.versions);
          await dbProject.updateName(requestedProject.title);

          detectedUpdates.push({ requestedProject, dbProject });
        }
      }

      // if (dbProject.dateUpdated.getTime() !== new Date(requestedProject.updated).getTime()) {
      //   // Verify that this file's ID is not in the database. If it is, it has already been reported as updated
      //   let reported = false;
      //   for (const fileId of requestedProject.versions) {
      //     if (dbProject.fileIds.includes(fileId)) {
      //       // await dbProject.updateDate(requestedProject.updated);
      //       reported = true;
      //       break;
      //     }
      //   }
      //   if (reported) continue;

      //   // If we get here, the project has passed all verification checks and has a legitmate update available
      //   logger.info(`Update detected for Modrinth project ${dbProject.name} (${dbProject.id})`);

      //   await dbProject.updateDate(requestedProject.updated);
      //   await dbProject.addFiles(requestedProject.versions);
      //   await dbProject.updateName(requestedProject.title);

      //   await sendUpdateEmbed(requestedProject, dbProject, client);
      // } else {
      //   logger.debug(`No update detected for ${dbProject.name}.`);
      // }
    }
  }

  logger.debug('Modrinth update check complete.');

  return detectedUpdates;
};
