const express = require('express');
const cors = require('cors');
const { body } = require('express-validator');

const router = express.Router({ mergeParams: true });
const userBookApiController = require('../controllers/userBookApiController');

router.use(cors({ origin: '*' }));

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
  .delete(userBookApiController.deleteUserBook);

module.exports = router;
