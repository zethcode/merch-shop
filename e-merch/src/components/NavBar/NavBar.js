import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Button, IconButton, Badge, Toolbar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { getAuth, signOut } from '@firebase/auth';
// import { useAuthState } from '../../firebase';
import logo from './../../assets/logo-white-on-transparent.png';

const NavBar = ({ cartTotal, userInfo }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  // console.log("user info daw", userInfo)

  const handleSignOut = () => {
    try {
      signOut(getAuth())
      history.push("/")
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    location.pathname !== "/authenticate" &&
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
        <Button className={classes.authButton} color="inherit" component={Link} to='/authenticate'>
          Login
        </Button>}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
