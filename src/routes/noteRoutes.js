const express = require('express');
const cors = require('cors');
const { body } = require('express-validator');

const router = express.Router({ mergeParams: true });
const noteApiController = require('../controllers/noteApiController');

router.use(cors({ origin: '*' }));

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
