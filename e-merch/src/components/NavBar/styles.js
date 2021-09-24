import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
  image: {
    marginRight: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "135px",
    height: "50px",
    [theme.breakpoints.down('sm')]: {
      width: "95px",
      height: "35px"
    },
  },
  appBarButton: {
    height: '60px',
    width: '100%',
    color: '#fff',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'rgb(255, 255, 255, 0.5)',
      color: '#171717',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    },
  }
}));
