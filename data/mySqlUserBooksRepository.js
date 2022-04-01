'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function readUserBooks(userId) {
  return prisma.UserBook.findMany({
    where: {
      userId: BigInt(userId)
    },
    select: {
      isbn: true
    }
  });
}

function createUserBook(userId, isbn) {
  return prisma.UserBook.create({
    data: {
      userId: BigInt(userId),
      isbn: isbn
    }
  });
}

module.exports = {
  readUserBooks,
  createUserBook
}
