'use strict';

const { validationResult } = require('express-validator');

const userBookService = require('../services/userBookService');

async function getUserBooks(req, res) {
  const userId = req.params.userId;
  try {
    res.status(200)
      .send(await userBookService.retrieveUserBooks(userId));
  } catch (ex) {
    res.status(404)
      .send({
        message: `The user with ID ${userId} has not been found.`,
        error: []
      });
  }
}

async function postUserBook(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400)
      .send({
        message: 'The request contains an invalid body.',
        errors: error.array().map(err => err.msg)
      });
  } else {
    try {
      await userBookService.addUserBook(req.params.userId, req.body);
      res.status(200)
        .send();
    } catch (ex) {
      console.log(ex);
    }
  }
}

module.exports = {
  getUserBooks,
  postUserBook
}
