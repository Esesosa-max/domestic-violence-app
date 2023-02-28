import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeUBeH7fFlp0-Ar79P6PZyE2pOsuxaTnM",
  authDomain: "dov-2-c6605.firebaseapp.com",
  projectId: "dov-2-c6605",
  storageBucket: "dov-2-c6605.appspot.com",
  messagingSenderId: "514926053235",
  appId: "1:514926053235:web:ed08799821316226e82706",
  measurementId: "G-FQ0JCF49SL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


