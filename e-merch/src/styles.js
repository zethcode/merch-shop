import { makeStyles, createTheme } from "@material-ui/core";

export const theme = createTheme({
    typography: {
        fontFamily: [
        "Montserrat", 
        "sans-serif"
        ].join(',')
    },
    palette: {
        primary: {
        light: '#50D2D8',
        main: '#29B3B9',
        dark: '#1F878C',
        contrastText: '#fff',
        },
        secondary: {
        light: '#D85650',
        main: '#B93029',
        dark: '#8C241F',
        contrastText: '#fff',
        },
    }
})

// Styles
export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
}));