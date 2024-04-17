// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3WSofgI3UviuaBtgQQ2C1RgwzgSlwQ2E",
  authDomain: "opt-verification-9f7d9.firebaseapp.com",
  projectId: "opt-verification-9f7d9",
  storageBucket: "opt-verification-9f7d9.appspot.com",
  messagingSenderId: "385304931836",
  appId: "1:385304931836:web:cbb0a25a996c7ff7371679",
  measurementId: "G-516NQ9WGBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
