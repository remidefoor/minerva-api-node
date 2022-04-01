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

async function createUserBook(userId, isbn) {
  await prisma.UserBook.create({
    data: {
      userId: BigInt(userId),
      isbn: isbn
    }
  });
}

async function deleteUserBook(userId, isbn) {
  await prisma.UserBook.delete({
    where: {
      isbn_userId: {
        userId: BigInt(userId),
        isbn: isbn
      }
    }
  })
}

module.exports = {
  readUserBooks,
  createUserBook,
  deleteUserBook
}
