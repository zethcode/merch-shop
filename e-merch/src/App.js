import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { NavBar, NotFound, Cart, Home } from './components';
import { useEffect } from 'react';
// import { useState, useEffect, useRef } from 'react';
// import { query, where, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { AuthContextProvider } from "./firebase";
import Signin from './components/pages/Authentication/Signin';
import Signup from './components/pages/Authentication/Signup';
import UnauthenticatedRoute from './components/routes/UnauthenticatedRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
}));

const theme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat", 
      "sans-serif"
    ].join(',')
  },
  palette: {
    primary: {
      light: '#50D2D8',
      main: '#29B3B9',
      dark: '#1F878C',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D85650',
      main: '#B93029',
      dark: '#8C241F',
      contrastText: '#fff',
    },
  }
})

function App() {
  const classes = useStyles();
  // const [cart, setCart] = useState([])
  // const [cartLoading, setCartLoading] = useState(true)
  // const [alertProps, setAlertProps] = useState({})
  // const [cartAlertProps, setCartAlertProps] = useState({})
  // const [state, setState] = useState("loading");
  // const loadingRef = useRef()
  // const userInfo = useRef({isLoggedIn: false})

  // onAuthStateChanged(auth, useCallback((user) => {
  //   state.current = (Boolean(user) ? "loggedin" : "redirect")
  //   console.log("Passed on auth state changed")
  // }, []), [auth]);

  // Products
  // const getProducts = useCallback(async () => {
  //   const productsCol = collection(db, "products")
  //   const productsSnapshot = await getDocs(productsCol)
    
  //   if (!productsSnapshot.empty) {
  //     const productsList = productsSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })

  //     setProducts(productsList)
  //     setProductsLoading(false)
  //   } else {
  //     console.log("Product documents does not exist!")
  //   }
  // }, []);

  // Cart handlers
  
  useEffect(() => {
    // setUserInfo(userInfo)
    // if (userInfo != null) {
    //   getCart()
    // }
  }, [])

  return (
    <div className={classes.root}>
      <AuthContextProvider>
        <Router>
          <>
          <ThemeProvider theme={theme}>
            <NavBar />
            {/* <NavBar loadingRef={loadingRef} cartTotal={Array.isArray(cart) ? cart.length : Object.keys(cart).length !== 0 ? 1 : 0} userInfo={userInfo.current} /> */}
            <Switch>
              <UnauthenticatedRoute exact path="/tabp-clothing/signup" component={Signup} />
              <UnauthenticatedRoute exact path="/tabp-clothing/signin" component={Signin} />
              <Route exact path="/tabp-clothing" component={() => <Home />} />
              <Route exact path="/" render={() => <Redirect to="/tabp-clothing" />} />
              {/* <Route exact path="/tabp-clothing" component={() => <Main loadingRef={loadingRef} state={state} products={products.current} addToCart={addToCart} loading={productsLoading.current} alertProps={alertProps} handleClose={handleClose} />} /> */}
              <AuthenticatedRoute exact path="/tabp-clothing/cart" component={() => <Cart />} />
              <Route component={NotFound}/>
            </Switch>
          </ThemeProvider>
          </>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
