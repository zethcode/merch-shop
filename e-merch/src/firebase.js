import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
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
  const [loading, setLoading] = useState(true)
  const auth = getAuth();

  const signIn = (values) => {
    return signInWithEmailAndPassword(auth, values.email, values.password)
  }

  const signUp = (values) => {
    return createUserWithEmailAndPassword(auth, values.email, values.password)
      .then( async credentials => {
          await updateProfile(auth.currentUser, {
              displayName: values.firstName + " " + values.lastName, 
              photoURL: values.photoURL
            }).then(async () => {
              await setDoc(doc(db, "users", credentials.user.uid), {
                  name: {
                      first: values.firstName,
                      last: values.lastName
                  },
                  photoURL: null
              });
            }).catch((error) => {
              return error
            });
      }).catch(error => {
        return error
      })
  }

  const signOutUser = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{user, signIn, signUp, signOutUser, loading}} {...props}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  return useContext(AuthContext)
  // const auth = useContext(AuthContext)
  // return { ...auth, isAuthenticated: auth.user != null}
}