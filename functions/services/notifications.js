const admin = require("firebase-admin");

const sendNotification = async (token, title, body) => {
  await admin.messaging().send({
    token,
    notification: { title, body }
  });
};

module.exports = { sendNotification };
