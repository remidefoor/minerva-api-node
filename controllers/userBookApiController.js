'use strict';

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

module.exports = {
  getUserBooks
}
