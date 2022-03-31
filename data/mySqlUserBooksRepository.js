'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function readUserBooks(userId) {
  if (!(await userExists(userId))) throw 'not found';
  return prisma.UserBook.findMany({
    where: {
      userId: BigInt(userId)
    },
    select: {
      isbn: true
    }
  });
}

async function userExists(userId) {
  return await getUserById(userId) !== null;
}

function getUserById(userId) {
  return prisma.User.findUnique({
    where: {
      id: BigInt(userId)
    }
  });
}

module.exports = {
  readUserBooks
}
