import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  buttons: {
    display: 'flex',
    alignItems: 'right',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  productName: {
    fontSize: '15px',
    fontWeight: 'bold',
    [theme.breakpoints.down("sm")]: {
      fontSize: '14px'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '14px'
    }
  },
  productDesc: {
    fontSize: '14px',
    color: 'gray',
    [theme.breakpoints.down("sm")]: {
      fontSize: '13px'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '13px'
    }
  },
  productQuantity: {
    fontSize: '17px',
    [theme.breakpoints.down("xs")]: {
      fontSize: '17px'
    }
  },
  productAdd: {
    fontSize: '25px',
    padding: '-2px',
    [theme.breakpoints.down("sm")]: {
      fontSize: '22px',
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '17px',
    }
  },
  productSubtract: {
    fontSize: '25px',
    padding: '-2px',
    [theme.breakpoints.down("sm")]: {
      fontSize: '22px',
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '17px',
    }
  },
  productRemove: {
    cursor: 'pointer',
  },
  itemList: {
    flex: 1,
    height: '100px',
    padding: '10px',
  },
  itemPhoto: {
    height: '100px',
    width: '100px',
    marginRight: '10px',
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.2, 1.2, 1)" }
  },
  itemDetails: {
    flex: 1,
    height: '100px',
    width: '100px',
    marginRight: '10px',
  },
  itemActions: {
    height: '100px',
    width: '143px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '30px',
    }
  }
}));
