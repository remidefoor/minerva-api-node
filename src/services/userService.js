'use strict';

const mySqlUserRepository = require('../data/mySqlUserRepository');

async function addUser(body) {
  const user = await mySqlUserRepository.createUser(body.email, body.password);
  return parseInt(user.id);
}

function logIn(data) {
  return mySqlUserRepository.getUserId(data.email, data.password);
}

module.exports = {
  addUser,
  logIn
};
