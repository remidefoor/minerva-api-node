'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const userBookApiController = require('../controllers/userBookApiController');

router.route('/')
  .get(userBookApiController.getUserBooks)
  .post((res, req) => {

  });

router.route('/:isbn')
  .delete((res, req) => {

  });

module.exports = router;
