const express = require('express');
const router = express.Router();

const logController = require('../controllers/logController');

router.get('/access', logController.getAccessLogs);

module.exports = router;
