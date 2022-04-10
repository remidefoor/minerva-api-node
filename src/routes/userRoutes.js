const express = require('express');
const cors = require('cors');
const { body } = require('express-validator');

const router = express.Router();
const userApiController = require('../controllers/userApiController');

router.use(cors({ origin: '*' }));

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
  userApiController.postUser
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

module.exports = router;
