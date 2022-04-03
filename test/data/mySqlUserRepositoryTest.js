const assert = require('assert');
const path = require('path');

const mySqlUserRepository = require('../../src/data/mySqlUserRepository');

describe(path.basename(__dirname), () => {
  describe(path.basename(__filename, path.extname(__filename)), () => {
    describe('logIn', () => {
      it('should return the user ID after successful log in', async () => {
        const userId = await mySqlUserRepository.getUserId('harry.potter@hogwarts.wiz', 'Nimbus2000');
        assert.strictEqual(userId, 1);
      });
      it('')
    });
  });
});
