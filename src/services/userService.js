const mySqlUserRepository = require('../data/mySqlUserRepository');
const validationService = require('./validationService');
const notificationService = require('./notificationService');

async function addUser (body) {
  const user = await mySqlUserRepository.createUser(body.email, body.password);
  notificationService.sendNewUserNotification();
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
