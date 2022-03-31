'use strict';

const BCRYPT_ROUNDS = 10;  // TODO move to .env

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser(email, password) {
  return prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS)
    }
  });
}

async function getUserId(email, password) {
  const user = await getUserByEmail(email);
  if (await bcrypt.compare(password, user.password)) return user.id.toString();
  throw 'unauthorized';
}

function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  });
}

module.exports = {
  createUser,
  getUserId
};
