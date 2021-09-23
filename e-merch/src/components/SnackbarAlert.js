import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsOpen, selectMessage, selectSeverity, setAlert } from '../app/snackbarSlice';

const SnackbarAlert = () => {
    const severity = useSelector(selectSeverity)
    const message = useSelector(selectMessage)
    const open = useSelector(selectIsOpen)
    const dispatch = useDispatch()
    
    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = () => {
        dispatch(setAlert({isOpen: false}))
    }
    
    return (
        <Snackbar 
            open={open} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            autoHideDuration={3000} 
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
            disableWindowBlurListener={true}>
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert> 
        </Snackbar>
    )
}

export default SnackbarAlert
