import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const config = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: "sandesh-stumble.appspot.com",
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyClIs7RGPObZpD9f9xvOfhCmWSfJ75uIOQ",
  authDomain: "sandesh-stumble.firebaseapp.com",
  projectId: "sandesh-stumble",
  storageBucket: "sandesh-stumble.appspot.com",
  messagingSenderId: "511011643859",
  appId: "1:511011643859:web:af589827571f32c74dcf26",
};

// Initialize Firebase
const firebaseApp = initializeApp(config);
export const storage = getStorage(firebaseApp);
export const database = getFirestore(firebaseApp);
