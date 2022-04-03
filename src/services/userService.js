const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

const mySqlUserRepository = require('../data/mySqlUserRepository');

const prisma = new PrismaClient();

async function addUser (body) {
  const user = await mySqlUserRepository.createUser(body.email, body.password);
  return parseInt(user.id);
}

async function logIn (body) {
  await validateUserExists(body.email);
  return mySqlUserRepository.getUserId(body.email, body.password);
}

async function validateUserExists(email) {
  const user = await prisma.User.findUnique({
    where: {
      email: email
    }
  });
  if (user === null) throw createError(403, 'The username or password is invalid.', { errors: [] });
}

module.exports = {
  addUser,
  logIn
};
