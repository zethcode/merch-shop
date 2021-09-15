import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext, createContext } from 'react';

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

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, error}} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null}
}