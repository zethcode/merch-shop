import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { NavBar, Main, Footer, NotFound, Cart } from './components';
import { useState, useEffect } from 'react'

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
  
  // Products
  const getProducts = async () => {
    console.log(process.env.REACT_APP_SHOP_API_URL)
    const response = await fetch(process.env.REACT_APP_SHOP_API_URL + "/products")
    
    setProducts(await response.json())
  };

  // Cart
  const getCart = async () => {
    const response = await fetch(process.env.REACT_APP_SHOP_API_URL + "/cart")
    const data = await response.json()

    setCart(data)
  }
  
  const addToCart = async (product, quantity) => {
    // Add a validation to check if item is already in cart
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "product": product, "quantity": quantity })
    }

    const response = await fetch(process.env.REACT_APP_SHOP_API_URL + "/cart", requestOptions)
    const data = await response.json()

    setCart([...cart, data])
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
            <Route exact path="/" component={() => <Main products={products} addToCart={addToCart} />} />
            <Route exact path="/cart" component={() => <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />} />
            <Route component={NotFound}/>
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
