import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, IconButton, Badge, Toolbar, useScrollTrigger, Slide } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { getAuth, signOut } from '@firebase/auth';
import { useEffect, useState } from 'react';
import logo from './../../assets/logo/logo-white-on-transparent.png';
import LoadingBackdrop from '../LoadingBackdrop';

const NavBar = ({ cartTotal, userInfo }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const trigger = useScrollTrigger()

  // Backdrop handlers
  const handleBackdropClose = () => {
    setOpenBackdrop(false)
  };
  
  const handleBackdropOpen = () => {
      setOpenBackdrop(true)
  };

  const handleSignOut = () => {
    handleBackdropOpen()
    try {
      signOut(getAuth())
      history.push("/")
    } catch (e) {
      alert(e.message)
    }
  }
  
  useEffect(() => {
    handleBackdropClose()
  }, [])

  return (
    location.pathname !== "/tabp-clothing/signin" && location.pathname !== "/tabp-clothing/signup" &&
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar} position="fixed" elevation={0}>
        <Toolbar disableGutters>
          <Button component={Link} to="/tabp-clothing">
            <img className={classes.logo} alt="tabp-logo" src={logo} />
          </Button>

          <div className={classes.grow} />
          {userInfo ?
          <>
          <div className={classes.button}>
              <IconButton aria-label="Show cart items" color="inherit" component={Link} to='/tabp-clothing/cart'>
                <Badge badgeContent={cartTotal} color="secondary">
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
          <LoadingBackdrop className={classes.backdrop} open={openBackdrop} />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default NavBar
