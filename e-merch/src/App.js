import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { NavBar, Main, Footer, NotFound, Cart } from './components';
import { useState, useEffect } from 'react';
import { query, where, collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import db from "./firebase";

function App() {
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
    }
  }));

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Montserrat", 
        "sans-serif"
      ].join(',')
    }
  })

  const classes = useStyles();
  
  // API Calls and Methods
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(true)

  // Snackbar constants
  const [alertProps, setAlertProps] = useState({})
  const [cartAlertProps, setCartAlertProps] = useState({})

  // Snackbar Alert handlers
  const handleClose = () => {
      setAlertProps({ open: false });
      setCartAlertProps({ open: false });
  };

  // Products
  const getProducts = async () => {
    const productsCol = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCol)
    
    if (!productsSnapshot.empty) {
      const productsList = productsSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })

      setProducts(productsList)
      setProductsLoading(false)
    } else {
      console.log("Product documents does not exist!")
    }
  };

  // Cart handlers
  // Fetch cart collection by user id
  const getCart = async (userId) => {
    userId = "user-arckie"
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userId))
    const docSnap = await getDocs(cartQuery)
    const items = []
    
    if (!docSnap.empty) {
      for (const document of docSnap.docs) {
        const productRef = doc(db, "products", document.data().productID);
        const productSnap = await getDoc(productRef);

        items.push({ product: productSnap.data(), ...document.data(), id: document.id })
      }

      setCart(items)
    } else {
      console.log("Cart documents does not exist!");
      setCart({})
    }

    setCartLoading(false)
  }
  
  // Add product to cart by user id
  const addToCart = async (userId, product) => {
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", userId), where("productID", "==", product.id))
    const cartSnap = await getDocs(cartQuery);
        
    if (cartSnap.empty) {
      const addCartRef = doc(cartRef)
      const data = { productID: product.id, userID: userId, quantity: 1 }
      
      await setDoc(addCartRef, data)
      const cartData = { ...data, product: product, id: addCartRef.id }
      setCart([...cart, cartData])
      setAlertProps({
        open: true,
        addStatus: true
      })
    } else {
      setAlertProps({
        open: true,
        addStatus: false
      })
    }
  }

  // Update product quantity from cart by cart id
  const updateCart = async (cartItem, quantity) => {
    const cartRef = doc(db, "cart", cartItem.id)
    const cartSnap = await getDoc(cartRef)
    cartItem.quantity = quantity

    if (cartSnap.exists()) {
      await updateDoc(cartRef, { quantity: quantity })
      setCart([...cart])
    } else {
      setCartAlertProps({
        open: true,
        addStatus: false
      })
    }
  }
  
  // Remove product from user cart by product id
  const removeFromCart = async (cartId) => {
    const cartRef = doc(db, "cart", cartId)
    const cartSnap = await getDoc(cartRef)

    if (cartSnap.exists()) {
      await deleteDoc(cartRef)
      setCart(cart.filter((item) => item.id !== cartId))
    } else {
      setCartAlertProps({
        open: true,
        addStatus: false
      })
    }
  }
  
  // Enable authentication here, maybe it's time to jump to firebase from here. Before implementing this empty cart function
  const emptyCart = async (userId) => {
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", userId))
    const cartSnap = await getDocs(cartQuery)

    if (!cartSnap.empty) {
      for (const document of cartSnap.docs) {
        const cartItemRef = doc(cartRef, document.id)
        const cartItemSnap = await getDoc(cartItemRef)

        if (cartItemSnap.exists()) {
          await deleteDoc(cartItemRef)
        }
      }

      setCart([])
      setCartAlertProps({
        open: true,
        addStatus: false,
        delete: true
      })
    } else {
      setCartAlertProps({
        open: true,
        addStatus: false,
        delete: false
      })
    }
  }

  useEffect(() => {
    getProducts()
    getCart()
  }, [])

  return (
    <div className={classes.root}>
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar cartTotal={cart.length} />
          <Switch>
            <Route exact path="/" component={() => <Main products={products} addToCart={addToCart} loading={productsLoading} alertProps={alertProps} handleClose={handleClose} />} />
            <Route exact path="/cart" component={() => <Cart /* userInfo={userInfo} */ cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} emptyCart={emptyCart} loading={cartLoading} alertProps={cartAlertProps} handleSnackbarClose={handleClose} />} />
            <Route component={NotFound}/>
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
