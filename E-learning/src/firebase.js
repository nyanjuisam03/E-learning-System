// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnPEOCHCHoOJDDGc9lBpW9GGwjiTyvltg",
  authDomain: "e-learning-system-fa2a1.firebaseapp.com",
  projectId: "e-learning-system-fa2a1",
  storageBucket:"e-learning-system-fa2a1.appspot.com",
  messagingSenderId:"415593020917",
  appId:"1:415593020917:web:d0ccf7e20282843b82b4bc",
  measurementId: "G-4XQXLPSQBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db = getFirestore(app)