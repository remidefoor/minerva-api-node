'use strict';

const { PrismaClient } = require('@prisma/client');

const mySqlUserBooksRepository = require('../data/mySqlUserBooksRepository');
const prisma = new PrismaClient();

async function retrieveUserBooks(userId) {
  await validateUserExists(userId);
  return mySqlUserBooksRepository.readUserBooks(userId);
}

function addBook(userId, body) {

}

async function validateUserExists(userId) {
  if (await getUserById(userId) === null) throw 'not found';
}

function getUserById(userId) {
  return prisma.User.findUnique({
    where: {
      id: BigInt(userId)
    }
  });
}

module.exports = {
  retrieveUserBooks
}
