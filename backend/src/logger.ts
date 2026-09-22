import { pino } from 'pino'

export const logger = pino({
	level: process.env.CONFIG_LOGGER_LEVEL ?? 'info',
	transport: {
		target: 'pino-pretty',
		options: {
			ignore: 'pid,hostname',
			translateTime: 'SYS:yyyy-mm-dd hh:MM:s:l TT',
		},
	},
})
