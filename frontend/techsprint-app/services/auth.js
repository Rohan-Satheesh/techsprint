// Minimal Firebase auth helper. Replace config with your Firebase project.
// Install firebase: `npm install firebase`
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

let auth;

export function initFirebase(config) {
  try {
    const app = initializeApp(config);
    auth = getAuth(app);
  } catch (e) {
    // ignore — app may be already initialized in some environments
  }
}

export async function ensureAnonymous() {
  if (!auth) return null;
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (e) {
    return null;
  }
}

export async function getIdToken() {
  if (!auth || !auth.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken();
  } catch (e) {
    return null;
  }
}

export default { initFirebase, ensureAnonymous, getIdToken };
