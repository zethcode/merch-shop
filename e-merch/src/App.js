import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UnauthenticatedRoute from './components/routes/UnauthenticatedRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import Signin from './components/pages/Authentication/Signin';
import Signup from './components/pages/Authentication/Signup';
import { NavBar, NotFound, Cart, Home } from './components';
import { AuthContextProvider } from "./firebase";
import { ThemeProvider } from '@material-ui/core';
import { useStyles, theme } from './styles'
import './App.css';

function App() {
  const classes = useStyles();
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
