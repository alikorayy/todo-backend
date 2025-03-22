import admin from 'firebase-admin';
import path from "path";

// Load credentials
const serviceAccount = require(path.join(__dirname, "../../firebase-config.json"));

// Initliaze Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();