const fs = require('fs').promises;

const ACCESS_LOGS_PATH = 'logs/access.log';

async function readAccessLogs() {
  const accessLogs = await fs.readFile(ACCESS_LOGS_PATH, 'utf-8');
  const accessLogsArray = accessLogs.split('\n');
  return accessLogsArray;
}

module.exports = {
  readAccessLogs
}
