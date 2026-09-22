import { CronJob } from 'cron'
import { logger } from '../logger.js'

export default new CronJob('0 */5 * * * *', () => {
	if (process.env.CONFIG_HEARTBEAT_URL) {
		fetch(process.env.CONFIG_HEARTBEAT_URL).catch((error) => logger.error(error))
		logger.info('Heartbeat cronjob started.')
	} else {
		logger.warn('There is no defined heartbeat url.')
	}
})
