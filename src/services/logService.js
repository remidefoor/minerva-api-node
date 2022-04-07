const fsLogsRepository = require('../data/fsLogsRepository');

function retrieveAccessLogs() {
  return fsLogsRepository.readAccessLogs();
}

module.exports = {
  retrieveAccessLogs
}
