// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw7NzuM06ZosahR0POsnhER67QOhVO5qs",
  authDomain: "intellihome-552e4.firebaseapp.com",
  projectId: "intellihome-552e4",
  storageBucket: "intellihome-552e4.appspot.com",
  messagingSenderId: "208939640768",
  appId: "1:208939640768:web:07cc9cf16c24e1f7310a25",
  measurementId: "G-E2PE82906S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
