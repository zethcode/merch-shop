import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/ToolBar';
import { makeStyles, Container, Grid, ThemeProvider, createTheme } from '@material-ui/core';
import Footer from './components/Footer';

function App() {
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

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Zeth Garments
            </Typography>
            <Button color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Container fixed maxWidth="lg" style={{backgroundColor: "#82b9d1"}}>
          <Grid item>
            Test
          </Grid>
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
