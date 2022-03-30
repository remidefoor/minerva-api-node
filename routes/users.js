// pruned
const express = require('express');
const router = express.Router();

const userApiController = require('../controllers/userApiController');

router.post('/', userApiController.addUser);

module.exports = router;
