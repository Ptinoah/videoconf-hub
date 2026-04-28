import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const parseFirebaseConfig = () => {
  const rawConfig = import.meta.env.VITE_FIREBASE_CONFIG;

  if (!rawConfig || !rawConfig.trim()) {
    console.error(
      "Firebase initialization skipped: VITE_FIREBASE_CONFIG is missing or empty."
    );
    return null;
  }

  try {
    return JSON.parse(rawConfig);
  } catch (error) {
    console.error(
      "Firebase initialization skipped: VITE_FIREBASE_CONFIG contains invalid JSON.",
      error
    );
    return null;
  }
};

const firebaseConfig = parseFirebaseConfig();
const app = firebaseConfig ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();