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

  // Products
  const getProducts = async () => {
    // Get a list of products from your database
    const productsCol = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCol)
    
    if (!productsSnapshot.empty) {
      const productsList = productsSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })

      setProducts(productsList)
      setProductsLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("Product documents does not exist!")
    }
  };

  // Cart
  const getCart = async (userId) => {
    // Get the list of cart items from your database
    userId = "user-arckie"
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userId))
    const docSnap = await getDocs(cartQuery)
    const items = []
    
    if (!docSnap.empty) {
      for (const document of docSnap.docs) {
        // Query the products collection here by product id then push product to item
        const productRef = doc(db, "products", document.data().productID);
        const productSnap = await getDoc(productRef);

        items.push({ product: productSnap.data(), ...document.data(), id: document.id })
      }

      setCart(items)
      setCartLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("Cart document does not exist!");
    }
  }
  
  const addToCart = async (userId, productId) => {
    // Check if productId is in cart, if it is then abort procedure and return "already in cart" message

    // If product is not in cart, then proceed here
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", userId), where("productID", "==", productId))
    const cartSnap = await getDocs(cartQuery);
        
    if (cartSnap.empty) {
      const addCartRef = doc(cartRef)
      const data = {productID: productId, userID: userId, quantity: 1}
      
      await setDoc(addCartRef, data)
      setCart([...cart, data])

      // Show bootstrap equivalent of toaster with message added to cart! Or any animation
    } else {
      // Show bootstrap equivalent of toaster with message already in cart! Or any animation
      alert("This item is already in your cart!")
    }

    // for (const document of cartSnap.docs) {
    //   // Query the products collection here by product id then push product to item
    //   const newCartRef = doc(cartRef);
    //   const docSet = await setDoc(newCartRef, data);
      
    //   console.log(document.id, " => ", document.data());

    //   // setCart(data)
    // }
    
    // cartSnap.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots

    //   // later...
    // });
  }

  const updateCart = async (cartItem, quantity) => {
    // Add validation here

    cartItem.quantity = quantity
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem)
    }

    await fetch(process.env.REACT_APP_SHOP_API_URL + "/cart/" + cartItem.id, requestOptions)

    setCart([...cart])
  }
  
  const removeFromCart = async (cartId) => {
    // Add validation here
    const requestOptions = {
      method: 'DELETE',
    }

    await fetch(process.env.REACT_APP_SHOP_API_URL + "/cart/" + cartId, requestOptions)
    
    setCart(cart.filter((item) => item.id !== cartId))
  }

  /*
  // Enable authentication here, maybe it's time to jump to firebase from here. Before implementing this empty cart function
  const emptyCart = async (cartId) => {
    // Add validation here

    const requestOptions = {
      method: 'DELETE',
    }

    const response = await fetch(process.env.REACT_APP_SHOP_API_URL + "/cart/" + cartId, requestOptions)
    const data = response.json()

    setCart([...cart, data])
  }
  */

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
            <Route exact path="/" component={() => <Main products={products} addToCart={addToCart} loading={productsLoading} />} />
            <Route exact path="/cart" component={() => <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} loading={cartLoading} />} />
            <Route component={NotFound}/>
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
