'use strict';

const express = require('express');
const router = express.Router();
const { body,
  validationResult
} = require('express-validator');

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

router.post(
  '/log-in',
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
  userApiController.logIn
);

/* router.post('/', validateRequestBody, userApiController.addUser);

function validateRequestBody(req, res, next) {
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('The email field is required.')
    .isEmail()
    .withMessage('The email must be a valid email address.');
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('The password field is required.')
    .isString()
    .withMessage('The password must be a string.');

  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400)
      .send({
        message: 'The request contains an invalid body.',
        errors: err.array().map(err => err.msg)
      });
  }

  next();
} */

module.exports = router;
