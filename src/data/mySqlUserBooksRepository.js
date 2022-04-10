const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function readUserBooks (userId) {
  return prisma.UserBook.findMany({
    where: {
      userId: BigInt(userId)
    },
    select: {
      ISBN: true
    }
  });
}

async function createUserBook (userId, isbn) {
  await prisma.UserBook.create({
    data: {
      userId: BigInt(userId),
      ISBN: isbn
    }
  });
}

async function deleteUserBook (userId, isbn) {
  await prisma.UserBook.delete({
    where: {
      ISBN_userId: {
        userId: BigInt(userId),
        ISBN: isbn
      }
    }
  });
}

module.exports = {
  readUserBooks,
  createUserBook,
  deleteUserBook
};
