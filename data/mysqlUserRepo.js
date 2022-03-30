// pruned
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;

const prisma = new PrismaClient();

async function createUser(user) {
  await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hash(user.password, BCRYPT_ROUNDS)
    }
  });
}

module.exports = {

};
