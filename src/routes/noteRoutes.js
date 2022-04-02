'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');

const noteApiController = require('../controllers/noteApiController');

router.route('/')
  .get(noteApiController.getNotes)
  .post(
    body('note')
      .exists({ checkFalsy: true })
      .withMessage('The note field is required.')
      .isString()
      .withMessage('The note must be a string.'),
    noteApiController.postNote
  );

router.route('/:noteId')
  .delete(noteApiController.deleteNote);

module.exports = router;
