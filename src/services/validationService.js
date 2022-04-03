const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

const prisma = new PrismaClient();

async function validateUserExistenceByEmail (email) {
  const user = await prisma.User.findUnique({
    where: {
      email: email
    }
  });
  if (user === null) throw createError(403, 'The username or password is invalid.', { errors: [] });
}

async function validateUserExistenceById (userId) {
  const user = await prisma.User.findUnique({
    where: {
      id: BigInt(userId)
    }
  });
  if (user === null) {
    throw createError(404, `The user with ID ${userId} has not been found.`, { errors: [] });
  }
}

async function validateUserBookExistence (userId, isbn) {
  const userBook = await prisma.UserBook.findUnique({
    where: {
      isbn_userId: {
        userId: BigInt(userId),
        isbn: isbn
      }
    }
  });
  if (userBook === null) {
    throw createError(404, `The book with ISBN ${isbn} has not been found for the current user.`, { errors: [] });
  }
}

async function validateNoteExistence (userId, isbn, noteId) {
  const note = await prisma.Note.findUnique({
    where: {
      id: BigInt(noteId)
    }
  });
  if (note === null || note.userId !== BigInt(userId) || note.isbn !== isbn) {
    throw createError(404, `A note with ID ${noteId} has not been found for the current user and book.`, { errors: [] });
  }
}

module.exports = {
  validateUserExistenceByEmail,
  validateUserExistenceById,
  validateUserBookExistence,
  validateNoteExistence
}
