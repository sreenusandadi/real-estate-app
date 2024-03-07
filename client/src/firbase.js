// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-b93c2.firebaseapp.com",
  projectId: "real-estate-app-b93c2",
  storageBucket: "real-estate-app-b93c2.appspot.com",
  messagingSenderId: "967312741243",
  appId: "1:967312741243:web:bec5993f3c9128c785a3de",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
