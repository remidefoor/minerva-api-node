const createError = require('http-errors');
const { validationResult } = require('express-validator');

const noteService = require('../services/noteService');

async function getNotes (req, res) {
  try {
    res.status(200)
      .send(await noteService.retrieveNotes(req.params.userId, req.params.isbn));
  } catch (ex) {
    if (ex.status) {
      res.status(ex.status)
        .send(ex);
    }
  }
}

async function postNote (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400)
      .send(createError(
        400,
        'The request contains an invalid body.',
        { errors: errors.array().map(error => error.msg) }
      ));
  } else {
    try {
      const note = await noteService.addNote(req.params.userId, req.params.isbn, req.body);
      res.status(201)
        .send({ id: parseInt(note.id) });
    } catch (ex) {
      if (ex.status) {
        res.status(ex.status)
          .send(ex);
      }
    }
  }
}

async function deleteNote (req, res) {
  try {
    await noteService.removeNote(req.params.userId, req.params.isbn, req.params.noteId);
    res.status(204)
      .send();
  } catch (ex) {
    if (ex.status) {
      res.status(ex.status)
        .send(ex);
    }
  }
}

module.exports = {
  getNotes,
  postNote,
  deleteNote
};
