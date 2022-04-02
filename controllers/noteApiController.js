'use strict';

const noteService = require('../services/noteService');

async function getNotes(req, res) {
  try {
    res.status(200)
      .send(await noteService.retrieveNotes(req.params.userId, req.params.isbn));
  } catch (ex) {
    if (ex.status === 404) {
      res.status(ex.status)
        .send(ex);
    }
    console.log(ex);
  }
}

module.exports = {
  getNotes
};
