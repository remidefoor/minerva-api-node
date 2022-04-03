const mySqlNotesRepository = require('../data/mySqlNotesRepository');
const validationService = require('./validationService');

async function retrieveNotes (userId, isbn) {
  await validationService.validateUserExistenceById(userId);
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
  await validationService.validateUserExistenceById(userId);
  await validationService.validateUserBookExistence(userId, isbn);
  return mySqlNotesRepository.createNote(userId, isbn, body.note);
}

async function removeNote (userId, isbn, noteId) {
  await validationService.validateUserExistenceById(userId);
  await validationService.validateUserBookExistence(userId, isbn);
  await validationService.validateNoteExistence(userId, isbn, noteId);
  await mySqlNotesRepository.deleteNote(noteId);
}

module.exports = {
  retrieveNotes,
  addNote,
  removeNote
};
