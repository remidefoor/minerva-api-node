'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');

const userBookApiController = require('../controllers/userBookApiController');

router.route('/')
  .get(userBookApiController.getUserBooks)
  .post(
    body('isbn')
      .exists({ checkFalsy: true })
      .withMessage('The isbn field is required.')
      .isString()
      .withMessage('The isbn must be a string.'),
    userBookApiController.postUserBook
  );

router.route('/:isbn')
  .delete((res, req) => {

  });

module.exports = router;
