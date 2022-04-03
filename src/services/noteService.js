const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

const mySqlNotesRepository = require('../data/mySqlNotesRepository');
const prisma = new PrismaClient();

async function retrieveNotes (userId, isbn) {
  await validateUserExists(userId);
  await validateUserBookExists(userId, isbn);
  const notes = await mySqlNotesRepository.readNotes(userId, isbn);
  const serializableNotes = convertNoteIdsToInts(notes);
  return serializableNotes;
}

function convertNoteIdsToInts (notes) {
  for (const note of notes) {
    note.id = parseInt(note.id);
  }
  return notes;
}

async function addNote (userId, isbn, body) {
  await validateUserExists(userId);
  await validateUserBookExists(userId, isbn);
  return mySqlNotesRepository.createNote(userId, isbn, body.note);
}

async function removeNote (userId, isbn, noteId) {
  await validateUserExists(userId);
  await validateUserBookExists(userId, isbn);
  await validateNoteExists(userId, isbn, noteId);
  await mySqlNotesRepository.deleteNote(noteId);
}

async function validateUserExists (userId) {
  const user = await prisma.User.findUnique({
    where: {
      id: BigInt(userId)
    }
  });
  if (user === null) throw createError(404, `The user with ID ${userId} has not been found.`, { errors: [] });
}

async function validateUserBookExists (userId, isbn) {
  const userBook = await prisma.userBook.findUnique({
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

async function validateNoteExists (userId, isbn, noteId) {
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
  retrieveNotes,
  addNote,
  removeNote
};
