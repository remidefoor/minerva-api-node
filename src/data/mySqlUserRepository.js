const BCRYPT_ROUNDS = 10;

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const prisma = new PrismaClient();

async function createUser (email, password) {
  return prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS)
    }
  });
}

async function getUserId (email, password) {
  const user = await getUserByEmail(email);
  if (await bcrypt.compare(password, user.password)) return parseInt(user.id);
  throw createError(403, 'The username or password is invalid.', { errors: [] });
}

function getUserByEmail (email) {
  return prisma.User.findUnique({
    where: {
      email: email
    }
  });
}

module.exports = {
  createUser,
  getUserId
};
