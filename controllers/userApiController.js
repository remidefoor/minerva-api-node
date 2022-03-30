'use strict';

const { validationResult } = require('express-validator');

const userService = require('../services/userService');

async function addUser(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400)
      .send({
        message: 'The request contains an invalid body.',
        errors: err.array().map(err => err.msg)
      });
  } else {
    try {
      res.status(201)
        .send({ id: await userService.addUser(req.body) });
    } catch (ex) {
      res.status(409)
        .send({
          message: 'The email is already taken.',
          errors: []
        });
    }
  }
}

module.exports = {
  addUser
}
