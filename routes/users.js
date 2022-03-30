'use strict';

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userApiController = require('../controllers/userApiController');

router.post(
  '/',
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('The email field is required.')
    .isEmail()
    .withMessage('The email must be a valid email address.'),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('The password field is required.')
    .isString()
    .withMessage('The password must be a string.'),
  userApiController.addUser
);

module.exports = router;
