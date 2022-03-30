'use strict';

const BCRYPT_ROUNDS = 10;

const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser(email, password) {
  return prisma.user.create({
    data: {
      email: email,
      password: await bcryptjs.hash(password, BCRYPT_ROUNDS)
    }
  });
}

module.exports = {
  createUser
};
