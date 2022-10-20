import * as admin from "firebase-admin";
import { join } from "path";
var serviceAccount = require(join(process.cwd(), "creds.json"));

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export const db = admin.firestore()
