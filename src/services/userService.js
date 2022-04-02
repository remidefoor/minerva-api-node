'use strict';

const mySqlUserRepo = require('../data/mySqlUserRepository');

async function addUser(data) {
  const user = await mySqlUserRepo.createUser(data.email, data.password);
  return user.id.toString();
}

function logIn(data) {
  return mySqlUserRepo.getUserId(data.email, data.password);
}

module.exports = {
  addUser,
  logIn
}
