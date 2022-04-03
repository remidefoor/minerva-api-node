const mySqlUserBooksRepository = require('../data/mySqlUserBooksRepository');
const validationService = require('./validationService');

async function retrieveUserBooks (userId) {
  await validationService.validateUserExistenceById(userId);
  return mySqlUserBooksRepository.readUserBooks(userId);
}

async function addUserBook (userId, body) {
  await validationService.validateUserExistenceById(userId);
  await mySqlUserBooksRepository.createUserBook(userId, body.isbn);
}

async function removeUserBook (userId, isbn) {
  await validationService.validateUserExistenceById(userId);
  await validationService.validateUserBookExistence(userId, isbn);
  await mySqlUserBooksRepository.deleteUserBook(userId, isbn);
}

module.exports = {
  retrieveUserBooks,
  addUserBook,
  removeUserBook
};
