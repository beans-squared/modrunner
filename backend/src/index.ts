import { logger } from './logger.js'
import ipc from 'node-ipc'

import heartbeat from './cron/heartbeat.js'

import modrinth from './cron/update_checkers/modrinth.js'

// Cronjobs
heartbeat.start()

// Update checkers
// modrinth.start()

logger.info('Backend is fully intialized and ready to work.')
