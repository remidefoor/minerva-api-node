'use strict';

const mySqlUserRepo = require('../data/mysqlUserRepo');

async function addUser(body) {
  const user = await mySqlUserRepo.createUser(body.email, body.password);
  return user.id.toString();
}

function logIn(body) {
  return mySqlUserRepo.getUserId(body.email, body.password);
}

module.exports = {
  addUser,
  logIn
}
