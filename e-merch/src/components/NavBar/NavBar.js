import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, IconButton, Badge, Toolbar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { getAuth, signOut } from '@firebase/auth';
import { useEffect, useState } from 'react';
import logo from './../../assets/logo/logo-white-on-transparent.png';
import LoadingBackdrop from '../LoadingBackdrop';

const NavBar = ({ cartTotal, userInfo }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [openBackdrop, setOpenBackdrop] = useState(false)

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
    location.pathname !== "/signin" && location.pathname !== "/signup" &&
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar disableGutters>
        <Button component={Link} to="/">
          <img className={classes.logo} alt="tabp-logo" src={logo} />
        </Button>

        <div className={classes.grow} />
        {userInfo ?
        <>
        <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit" component={Link} to='/cart'>
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
        <> <Button color="inherit" component={Link} to='/signin'>
          SIGN IN
        </Button>
        <Button className={classes.authButton} color="inherit" component={Link} to='/signup'>
          REGISTER
        </Button> </>}
        <LoadingBackdrop className={classes.backdrop} open={openBackdrop} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
