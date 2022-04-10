const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function readNotes (userId, isbn) {
  return prisma.Note.findMany({
    where: {
      userId: BigInt(userId),
      ISBN: isbn
    },
    select: {
      id: true,
      note: true
    }
  });
}

function createNote (userId, isbn, note) {
  return prisma.Note.create({
    data: {
      userId: BigInt(userId),
      ISBN: isbn,
      note: note
    }
  });
}

async function deleteNote (noteId) {
  await prisma.Note.delete({
    where: {
      id: BigInt(noteId)
    }
  });
}

module.exports = {
  readNotes,
  createNote,
  deleteNote
};
