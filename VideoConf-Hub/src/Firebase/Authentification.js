import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "CLE_RETIREE",
  authDomain: "videoconfnoahmuzalia.firebaseapp.com",
  projectId: "videoconfnoahmuzalia",
  storageBucket: "videoconfnoahmuzalia.firebasestorage.app",
  messagingSenderId: "465681562417",
  appId: "1:465681562417:web:c46f7348ec8c295e080e10",
  measurementId: "G-PGDZX1SZ1Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur inscrit :", userCredential.user.email);
  } catch (error) {
    console.error("Erreur d'inscription :", error.code);
  }
};

const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur connecté !", userCredential.user.uid);
  } catch (error) {
    console.error("Erreur de connexion :", error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Session active pour :", user.email);
  } else {
    console.log("Personne n'est connecté.");
  }
});