import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    media: {
      height: 0,
      paddingTop: '90%', // 16:9
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
}));