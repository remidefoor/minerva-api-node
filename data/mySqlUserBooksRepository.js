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

function createUserBook(userBook) {
  prisma.UserBook.create({
    data: userBook
  });
}

module.exports = {
  readUserBooks
}
