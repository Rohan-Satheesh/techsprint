const admin = require("firebase-admin");
admin.initializeApp();
const database = admin.firestore();
const auth = admin.auth();
module.exports = {database, auth};
