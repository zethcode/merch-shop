import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectLoadingStatus } from '../app/loadingSlice';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const LoadingBackdrop = () => {
    const classes = useStyles()
    const isLoading = useSelector(selectLoadingStatus)

    // console.log("loading status", isLoading)

    return (
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingBackdrop
