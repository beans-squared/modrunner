const logger = require('../logger');

module.exports = {
  name: 'error',
  async execute(error) {
    logger.error(error);
  },
};
