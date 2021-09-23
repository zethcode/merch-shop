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
import { GetCart } from '../../services/cart';

const NavBar = () => {
  const { signOutUser, user } = useAuthState()
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const trigger = useScrollTrigger()
  const cartCount = useSelector(selectCartCount)
  let bgColor = location.pathname === "/tabp-clothing/cart" ? 'rgba(23, 23, 23, 1)' : 'rgba(0, 0, 0, 0.5)'

  // console.log("user info sa navbar", user)

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
  
  useEffect(() => {
    if (user) {
      GetCart(dispatch, user)
    }
  }, [dispatch, user])

  return (
    location.pathname !== "/tabp-clothing/signin" && location.pathname !== "/tabp-clothing/signup" &&
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar} position="fixed" elevation={0} style={{backgroundColor: `${bgColor}`}}>
        <Toolbar disableGutters>
          <Button component={Link} to="/tabp-clothing">
            <img className={classes.logo} alt="tabp-logo" src={logo} />
          </Button>

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
          <Button className={classes.authButton} color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
          </>
          :
          <> <Button color="inherit" component={Link} to='/tabp-clothing/signin'>
            SIGN IN
          </Button>
          <Button className={classes.authButton} color="inherit" component={Link} to='/tabp-clothing/signup'>
            REGISTER
          </Button> </>}
          <LoadingBackdrop />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default NavBar
