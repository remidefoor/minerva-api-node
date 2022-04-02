'use strict';

const { validationResult } = require('express-validator');

const userService = require('../services/userService');

async function addUser(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400)
      .send({
        message: 'The request contains an invalid body.',
        errors: error.array().map(err => err.msg)
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

async function logIn(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400)
      .send({
        message: 'The request contains an invalid body.',
        errors: error.array().map(err => err.msg)
      });
  } else {
    try {
      res.status(200)
        .send({ id: await userService.logIn(req.body) });
    } catch (ex) {
      res.status(403)
        .send({
          message: 'The username or password is invalid.',
          errors: []
        });
    }
  }
}

module.exports = {
  addUser,
  logIn
}
