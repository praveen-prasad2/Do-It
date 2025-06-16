// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbGGJaFQatN8wwTWpNgh1NHvPwY0_8f8M",
  authDomain: "doit-duoph.firebaseapp.com",
  projectId: "doit-duoph",
  storageBucket: "doit-duoph.firebasestorage.app",
  messagingSenderId: "356784956073",
  appId: "1:356784956073:web:0ec6e605f7643ce1d3ffb8"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
