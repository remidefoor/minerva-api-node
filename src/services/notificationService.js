const NOTIFICATION_KEYS = {
  publicKey: 'BG9GvypG3RyfZx4-PDKM5FduWhOuxtrCOZ9fgcRq-g8prPDchbw_FeiEPw0j64K7k9GjRI1WKb3x1zhWvgqcn9c',
  privateKey: '1mUhZujh2RehxXYzJrCmletSujj8FVlsAgjIAZZm27Q'
};

const NOTIFICATION_NEW_USER = { "title": "Expansion", "body": "A new reader has joined our ever growing community!" };

const webPush = require('web-push');

webPush.setVapidDetails(
  'mailto:remi.defoor@student.howest.be',
  NOTIFICATION_KEYS.publicKey,
  NOTIFICATION_KEYS.privateKey
);
const subscriptions = {};

function setSubscription(userId, subscription) {
  subscriptions[userId] = subscription;
}

function sendNewUserNotification() {
  for (const userId in subscriptions) {
    webPush.sendNotification(subscriptions.userId, JSON.stringify(NOTIFICATION_NEW_USER));
  }
}

module.exports = {
  setSubscription,
  sendNewUserNotification
}
