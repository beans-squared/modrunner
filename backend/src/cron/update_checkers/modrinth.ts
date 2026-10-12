import { CronJob } from 'cron'
import { logger } from '../../logger.js'
import { database } from '../../database.js'
import * as schema from '../../database/schema.js'
import { eq } from 'drizzle-orm'

const MAX_BATCH_CALL_SIZE = 1900

export default new CronJob('*/1 * * * * *', async () => {
	logger.debug('Checking Modrinth projects for updates...')

	const projects = await database.select({ id: schema.project.id }).from(schema.project).where(eq(schema.project.platform, 'Modrinth'))

	if (projects.length <= 0) return logger.debug('Not tracking any Modrinth projects, skipping update check.')

	// Split into batches of MAX_BATCH_CALL_SIZE if needed
	let batches = []
	if (projects.length > MAX_BATCH_CALL_SIZE) {
		for (let i = 0; i < Math.ceil(projects.length / MAX_BATCH_CALL_SIZE); i++) {
			batches.push(projects.slice(0, MAX_BATCH_CALL_SIZE))
			projects.splice(0, MAX_BATCH_CALL_SIZE)
		}
	} else {
		batches.push(projects)
	}

	// Grab the data from Modrinth
	const responseData = []
	for (const batch of batches) {
		const response = await modrinth.api.getProjects(batch)
		responseData.push(response.data)
	}
})
