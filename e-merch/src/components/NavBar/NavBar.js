import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, IconButton, Badge, Toolbar, useScrollTrigger, Slide } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { useEffect, useCallback, } from 'react';
import logo from './../../assets/logo/logo-white-on-transparent.png';
import LoadingBackdrop from '../LoadingBackdrop';
import { useAuthState } from './../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/loadingSlice';
import { selectCartCount } from '../../app/cartSlice';
import { selectLoadingStatus } from '../../app/loadingSlice';
import { GetCart } from '../../services/cart';
import { Link as Scroll } from 'react-scroll';

const NavBar = () => {
  const { signOutUser, user } = useAuthState()
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const trigger = useScrollTrigger()
  const isLoading = useSelector(selectLoadingStatus)
  const cartCount = useSelector(selectCartCount)
  let bgColor = location.pathname === "/tabp-clothing/cart" ? 'rgba(23, 23, 23, 1)' : 'rgba(0, 0, 0, 0.5)'

  useEffect(() => {
    if (user) {
      GetCart(dispatch, user)
    }
  }, [dispatch, user])

  const handleSignOut = useCallback(async () => {
    dispatch(setLoading({isLoading: true}))
    try {
      signOutUser()
      dispatch(setLoading({isLoading: false}))
      history.push("/tabp-clothing")
    } catch (e) {
      alert("Error encountered!", e.message)
      dispatch(setLoading({isLoading: false}))
    }
  }, [dispatch, history, signOutUser])
  

  return (
    location.pathname !== "/tabp-clothing/signin" && location.pathname !== "/tabp-clothing/signup" &&
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar} position="fixed" elevation={0} style={{backgroundColor: `${bgColor}`}}>
        <Toolbar variant="dense" disableGutters>
          {location.pathname === "/tabp-clothing" ? 
            <Scroll to="home-root" smooth={true}>
                <Button className={classes.appBarButton} color="inherit">
                  <img className={classes.logo} alt="tabp-logo" src={logo} />
                </Button>
            </Scroll>
            :
            <Button className={classes.appBarButtonCart} component={Link} to="/tabp-clothing">
              <img className={classes.logo} alt="tabp-logo" src={logo} />
            </Button>
          }
          {location.pathname !== '/tabp-clothing/cart' ?
          <>
          &nbsp;
          <Scroll to="about-section" smooth={true}>
              <Button className={classes.appBarButton} style={{marginLeft: '10px'}} color="inherit">
              About
            </Button>
          </Scroll>
          <Scroll to="products-section" smooth={true}>
            <Button className={classes.appBarButton} color="inherit">
              Shop
            </Button>
          </Scroll>
          <Scroll to="reviews-section" smooth={true}>
            <Button className={classes.appBarButton} color="inherit">
              Reviews
            </Button>
          </Scroll>
          </>
          : user !== null &&
          <Button className={classes.appBarButton} style={{width: '90px'}} color="inherit" component={Link} to="/tabp-clothing">
            Home
          </Button>
          }
          <div className={classes.grow} />
          {user !== null ?
          <>
          <div className={classes.button}>
              <IconButton aria-label="Show cart items" color="inherit" component={Link} to='/tabp-clothing/cart'>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
          </div>
          <div>
            <Button className={classes.appBarButton} style={{marginRight: '20px'}} color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          </div>
          </>
          :
          <> <Button className={classes.appBarButton} style={{width: '90px'}} color="inherit" component={Link} to='/tabp-clothing/signin'>
            Sign In
          </Button>
          <Button className={classes.appBarButton} style={{width: '90px'}} color="inherit" component={Link} to='/tabp-clothing/signup'>
            Register
          </Button> </>}
          {isLoading && <LoadingBackdrop />}
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default NavBar
