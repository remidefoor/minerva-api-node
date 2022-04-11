const express = require('express');
const cors = require('cors');
const { body } = require('express-validator');

const router = express.Router({ mergeParams: true });
const notificationController = require('../controllers/notificationController');

router.use(cors({ origin: '*' }));

/**
 * Optimal solution:
 * GET request of subscription
 * if (404) POST subscription
 * else PUT subscription
 * NOT implemented because not application functionality, but assignment requirement
 */
router.post(
  '/subscription',
  body('endpoint')
    .exists({ checkFalsy: true })
    .withMessage('The endpoint field is required.')
    .isString()
    .withMessage('The endpoint must be a string.'),
  body('keys.p256dh')
    .exists({ checkFalsy: true })
    .withMessage('The object keys with field p256dh is required.')
    .isString()
    .withMessage('The p256dh must be a string.'),
  body('keys.auth')
    .exists({ checkFalsy: true })
    .withMessage('The object keys with field auth is required.')
    .isString()
    .withMessage('The auth must be a string.'),
  notificationController.postSubscription
)

module.exports = router;
