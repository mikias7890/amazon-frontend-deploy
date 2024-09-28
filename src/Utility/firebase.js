// Import the functions you need from the SDKs you need
// Import Firebase modules using the v9 modular syntax
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6aB6_w03ALEBjmu85OEo3Sa0IJXgRnDI",
  authDomain: "clone-9e96c.firebaseapp.com",
  projectId: "clone-9e96c",
  storageBucket: "clone-9e96c.appspot.com",
  messagingSenderId: "460877736318",
  appId: "1:460877736318:web:49a7ce80ffa3103e3ceb2f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = app.firestore();
