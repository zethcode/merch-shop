import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        background: 'rgba(28, 28, 28, 0.85)',
        color: '#fff',
        height: '100%',
        borderRadius: '15px'
    },
    media: {
      height: 0,
      paddingTop: '90%', // 16:9
      margin: '5px',
      backgroundColor: 'rgba(28, 28, 28, 1)',
      borderTopRightRadius: '15px',
      borderTopLeftRadius: '15px',
    },
    cardActions: {
      justifyContent: 'space-between',
      padding: '10px',
      backgroundColor: 'rgba(28, 28, 28, 1)',
      color: '#fff'
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    productName: {
      fontSize: '15px',
      [theme.breakpoints.down("lg")]: {
        fontSize: '15px',
      },
      [theme.breakpoints.down("md")]: {
        fontSize: '15px',
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '13px'
      }
    },
    productDescription: {
      fontSize: '13px',
      [theme.breakpoints.down("lg")]: {
        fontSize: '13px',
      },
      [theme.breakpoints.down("md")]: {
        fontSize: '13px',
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '10px'
      }
    },
    productPrice: {
      fontSize: '17px',
      [theme.breakpoints.down("lg")]: {
        fontSize: '17px',
      },
      [theme.breakpoints.down("md")]: {
        fontSize: '17px',
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '15px'
      }
    }
}));