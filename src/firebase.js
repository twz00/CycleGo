// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFD9gXqBba0ZO75QrRxri6BFOLGJzoBZ8",
  authDomain: "cyclego-a504c.firebaseapp.com",
  projectId: "cyclego-a504c",
  storageBucket: "cyclego-a504c.appspot.com",
  messagingSenderId: "343351995560",
  appId: "1:343351995560:web:bdabf52a3669399abc269d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export {app, db};