import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        height: '100%',
    },
    media: {
      height: 0,
      paddingTop: '90%', // 16:9
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
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
      [theme.breakpoints.down("sm")]: {
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
      [theme.breakpoints.down("sm")]: {
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
      [theme.breakpoints.down("sm")]: {
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '15px'
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
}));