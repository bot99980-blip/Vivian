// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMjEt3Nhu2N2XULA_VoQVv5BXyOSEC53E",
  authDomain: "vivian-f9048.firebaseapp.com",
  projectId: "vivian-f9048",
  storageBucket: "vivian-f9048.firebasestorage.app",
  messagingSenderId: "647574497516",
  appId: "1:647574497516:web:373874267591af4ebd1dc9",
  measurementId: "G-BJPL2XJCJ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
