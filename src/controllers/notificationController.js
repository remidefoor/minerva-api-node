const createError = require('http-errors');
const { validationResult } = require('express-validator');

const notificationService = require('../services/notificationService');

async function postSubscription (req, res) {
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
      await notificationService.setSubscription(req.params.userId, req.body);
      res.status(200)
        .send();
    } catch (ex) {
      if (ex.status) {
        res.status(ex.status)
          .send(ex);
      }
    }
  }
}

module.exports = {
  postSubscription
}
