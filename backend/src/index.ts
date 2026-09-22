import { logger } from './logger.js'
import ipc from 'node-ipc'

import heartbeat from './cron/heartbeat.js'

// Cronjobs
heartbeat.start()

logger.info('Backend is fully intialized and ready to work.')
