const createError = require('http-errors');
const { validationResult } = require('express-validator');

const userBookService = require('../services/userBookService');

async function getUserBooks (req, res) {
  try {
    res.status(200)
      .send(await userBookService.retrieveUserBooks(req.params.userId));
  } catch (ex) {
    if (ex.status) {
      res.status(ex.status)
        .send(ex);
    }
  }
}

async function postUserBook (req, res) {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400)
      .send(createError(
        400,
        'The request contains an invalid body.',
        { errors: errors.array().map(error => error.msg) }
      ));
  } else {
    try {
      await userBookService.addUserBook(req.params.userId, req.body);
      res.status(201)
        .send();
    } catch (ex) {
      if (ex.status) {
        res.status(ex.status)
          .send(ex);
      } else if (ex.code === 'P2002') {
        res.status(409)
          .send(createError(409, 'The book is already present in the user\'s library.', { errors: [] }));
      }
    }
  }
}

async function deleteUserBook (req, res) {
  try {
    await userBookService.removeUserBook(req.params.userId, req.params.isbn);
    res.status(204)
      .send();
  } catch (ex) {
    if (ex.status) {
      res.status(ex.status)
        .send(ex);
    }
  }
}

module.exports = {
  getUserBooks,
  postUserBook,
  deleteUserBook
};
