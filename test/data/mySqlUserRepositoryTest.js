const assert = require('assert');
const path = require('path');
const createError = require('http-errors');

const mySqlUserRepository = require('../../src/data/mySqlUserRepository');

describe(path.basename(__dirname), () => {
  describe(path.basename(__filename, path.extname(__filename)), () => {
    describe('logIn', () => {
      it('should return the user ID after successful log in', async () => {
        const userId = await mySqlUserRepository.getUserId('harry.potter@hogwarts.wiz', 'Nimbus2000');
        assert.strictEqual(userId, 1);
      });
      // TODO fix
      /* it('should throw a forbidden HTTP error when the provided password is not correct', () => {
        assert.throws(
          () => mySqlUserRepository.getUserId('harry.potter@hogwarts.wiz', 'Firebolt'),
          createError(403, 'The username or password is invalid.', { errors: [] })
        );
      }); */
    });
  });
});
