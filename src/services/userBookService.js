const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

const mySqlUserBooksRepository = require('../data/mySqlUserBooksRepository');
const prisma = new PrismaClient();

async function retrieveUserBooks (userId) {
  await validateUserExists(userId);
  return mySqlUserBooksRepository.readUserBooks(userId);
}

async function addUserBook (userId, body) {
  await validateUserExists(userId);
  await mySqlUserBooksRepository.createUserBook(userId, body.isbn);
}

async function removeUserBook (userId, isbn) {
  await validateUserExists(userId);
  await validateUserBookExists(userId, isbn);
  await mySqlUserBooksRepository.deleteUserBook(userId, isbn);
}

async function validateUserExists (userId) {
  const user = await prisma.User.findUnique({
    where: {
      id: BigInt(userId)
    }
  });
  if (user === null) {
    throw createError(404, `The user with ID ${userId} has not been found.`, { errors: [] });
  }
}

async function validateUserBookExists (userId, isbn) {
  const userBook = await prisma.UserBook.findUnique({
    where: {
      isbn_userId: {
        userId: BigInt(userId),
        isbn: isbn
      }
    }
  });
  if (userBook === null) {
    throw createError(404, `The book with ISBN ${isbn} has not been found for the current user.`, { errors: [] });
  }
}

module.exports = {
  retrieveUserBooks,
  addUserBook,
  removeUserBook
};
