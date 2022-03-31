'use strict';

const mySqlUserBooksRepository = require('../data/mySqlUserBooksRepository');

function getUserBooks(userId) {
  return mySqlUserBooksRepository.readUserBooks(userId);
}

module.exports = {
  getUserBooks
}
