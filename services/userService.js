'use strict';

const mySqlUserRepo = require('../data/mysqlUserRepo');

async function addUser(body) {
  const usr = await mySqlUserRepo.createUser(body.email, body.password);
  return usr.id.toString();
}

module.exports = {
  addUser
}
