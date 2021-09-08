import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { NavBar, Main, Footer, NotFound } from './components';

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
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route component={NotFound}/>
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
