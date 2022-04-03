const mySqlUserRepository = require('../data/mySqlUserRepository');
const validationService = require('./validationService');

async function addUser (body) {
  const user = await mySqlUserRepository.createUser(body.email, body.password);
  return parseInt(user.id);
}

async function logIn (body) {
  await validationService.validateUserExistenceByEmail(body.email);
  return mySqlUserRepository.getUserId(body.email, body.password);
}

module.exports = {
  addUser,
  logIn
};
