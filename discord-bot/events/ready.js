const logger = require('./../logger');
const cron = require('node-cron');
const { Projects } = require('../database/db');
const { ActivityType } = require('discord.js');
const { startServer } = require('../api/server');
const { sendUpdateEmbed } = require('../utils');

module.exports = {
  name: 'clientReady',
  async execute(client) {
    logger.info('Ready status reported.');

    // Betterstack uptime heartbeat
    if (process.env.DOPPLER_ENVIRONMENT === 'prd') {
      cron
        .schedule('*/5 * * * *', () => {
          fetch(process.env.BETTERSTACK_HEARTBEAT_URL);
        })
        .on('task:failed', (ctx) => ctx.task.start());
    }

    // Start web server
    startServer(client);

    // Discord presence (run once on startup, then every 10m with cronjob)
    await updatePresence(client);
    const updatePresenceJob = cron.schedule('*/10 * * * *', async () => {
      logger.debug('Updating Discord presence');
      let projects = await Projects.findAndCountAll();
      client.user.setPresence({
        activities: [
          {
            type: ActivityType.Custom,
            name: `Watching ${projects.count} projects for updates in ${client.guilds.cache.size} servers.`,
          },
        ],
        status: 'online',
      });
    });
    updatePresenceJob.on('execution:failed', (ctx) => {
      logger.error('A scheduled Discord presence update failed to execute properly. Automatically restarting job');
      ctx.task.start();
    });

    // Project update checking
    const updateCheckJob = cron.schedule('*/3 * * * *', '../jobs/updateCheck.js', { noOverlap: true });
    updateCheckJob.on('execution:finished', async (ctx) => {
      for (const item of ctx.execution.result) {
        await sendUpdateEmbed(item.requestedProject, item.dbProject, client);
      }
    });
    updateCheckJob.on('task:failed', (ctx) => {
      logger.error('A scheduled project update check failed to execute properly. Automatically restarting job');
      logger.error(ctx.error);
      ctx.task.start();
    });
  },
};

async function updatePresence(client) {
  logger.debug('Updating Discord presence');
  let projects = await Projects.findAndCountAll();
  client.user.setPresence({
    activities: [
      {
        type: ActivityType.Custom,
        name: `Watching ${projects.count} projects for updates in ${client.guilds.cache.size} servers.`,
      },
    ],
    status: 'online',
  });
}
