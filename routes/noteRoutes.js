'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const noteApiController = require('../controllers/noteApiController');

router.route('/')
  .get(noteApiController.getNotes)
  .post((req, res) => {

  });

router.route('/:id')
  .delete((req, res) => {

  });

module.exports = router;
