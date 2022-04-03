'use strict';

const createError = require('http-errors');
const { validationResult } = require('express-validator');

const userService = require('../services/userService');

async function postUser(req, res) {
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
      res.status(201)
        .send({ id: await userService.addUser(req.body) });
    } catch (ex) {
      if (ex.code === 'P2002') {
        res.status(409)
          .send(createError(409, 'The email is already taken.', { errors: [] }));
      }
    }
  }
}

async function logIn(req, res) {
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
      res.status(200)
        .send({ id: await userService.logIn(req.body) });
    } catch (ex) {
      if (ex.status) {
        res.status(ex.status)
          .send(ex);
      }
    }
  }
}

module.exports = {
  postUser,
  logIn
};
