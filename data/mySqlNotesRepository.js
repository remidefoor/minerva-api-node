'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function readNotes(userId, isbn) {
  return prisma.Note.findMany({
    where: {
      userId: BigInt(userId),
      isbn: isbn
    },
    select: {
      id: true,
      note: true
    }
  });
}

module.exports = {
  readNotes
};
