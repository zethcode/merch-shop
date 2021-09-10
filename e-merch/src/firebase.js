import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXYRCWPfym0rOJVrhh9l5hTV0NJu__wao",
  authDomain: "merch-shop-a28ac.firebaseapp.com",
  projectId: "merch-shop-a28ac",
  storageBucket: "merch-shop-a28ac.appspot.com",
  messagingSenderId: "68282669607",
  appId: "1:68282669607:web:2d6ba926d44a9fa87fcc02",
  measurementId: "G-0VB1S418J8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;