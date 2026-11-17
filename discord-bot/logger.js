const pino = require('pino');
const { setLogger } = require('node-cron');

// Options for logging throughout the app
const logger = pino({
  level: process.env.LOGGING_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: process.env.DOPPLER_ENVIRONMENT === 'dev' ? 'pid,hostname' : 'pid,hostname',
      translateTime: 'SYS:yyyy-mm-dd hh:MM:s:l TT',
    },
  },
});

// Passing cron's normal logging through pino
setLogger({
  info: (message) => logger.info(message),
  warn: (message) => logger.warn(message),
  error: (message, error) => logger.error(error ?? message),
  debug: (message) => logger.debug(message),
});

module.exports = logger;
