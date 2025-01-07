// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHmizgRcPYLNOZSON1QYy6uWQNb_58nh4",
  authDomain: "eventproject-75f05.firebaseapp.com",
  projectId: "eventproject-75f05",
  storageBucket: "eventproject-75f05.firebasestorage.app",
  messagingSenderId: "1054765455336",
  appId: "1:1054765455336:web:6f8edbefa5a165ee74b65d",
  measurementId: "G-RVN5XQ3M8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);