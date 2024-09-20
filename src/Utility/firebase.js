// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compact/firestore";
import "firebase/compact/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
