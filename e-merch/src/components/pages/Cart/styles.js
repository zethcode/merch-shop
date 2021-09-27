import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '3%',
  },
  emptyButton: {
    minWidth: '100%'
  },
  checkoutButton: {
    minWidth: '100%'
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  itemContainer: {
    height: '48em',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        webkitBoxShadow: 'inset 0 0 6px rrgba(0, 0, 0, 0.3)',
        borderRadius: '30px'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '30px'
    },
    paddingBottom: 0
  },
  summaryContainer: {
    height: '100%',
  },
  summary: {
    height: '100%',
    padding: '15px',
    paddingBottom: '20px'
  },
  summaryTextBox: {
    justifyContent: 'space-between', 
    display: 'flex'
  },
  summaryText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    }
  }
}));
