const mySqlUserRepository = require('../data/mySqlUserRepository');

async function addUser (body) {
  const user = await mySqlUserRepository.createUser(body.email, body.password);
  return parseInt(user.id);
}

function logIn (body) {
  return mySqlUserRepository.getUserId(body.email, body.password);
}

module.exports = {
  addUser,
  logIn
};
