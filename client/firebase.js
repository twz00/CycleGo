// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-9Vn1zoZQ1HoFQcCSOkhwHq0dqBo-7Ew",
  authDomain: "cyclego-14802.firebaseapp.com",
  projectId: "cyclego-14802",
  storageBucket: "cyclego-14802.appspot.com",
  messagingSenderId: "289376471369",
  appId: "1:289376471369:web:f62b8934506c1b7f567298",
  measurementId: "G-7KLLQZ4LDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);