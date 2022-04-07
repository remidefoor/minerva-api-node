const logService = require('../services/logService');

async function getAccessLogs (req, res) {
  res.render('logs', {
    title: 'Access Logs',
    logs: await logService.retrieveAccessLogs()
  }
  );
}

module.exports = {
  getAccessLogs
};
