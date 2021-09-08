import { Link } from 'react-router-dom';
import { AppBar, Typography, Button, IconButton, Badge, Toolbar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const NavBar = ({ cartTotal }) => {
  const classes = useStyles();

  console.log("cartTotal", cartTotal)

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
              Zeth Garments
          </Link>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.button}>
          <IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={cartTotal} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
        <Button color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
