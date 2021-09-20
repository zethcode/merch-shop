import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SnackbarAlert = ({ alertProps, handleClose, severity, message, variant }) => {
    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    }
    
    return (
        <Snackbar 
            open={alertProps.open} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            autoHideDuration={3000} 
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
            disableWindowBlurListener={true}>
            <Alert onClose={handleClose} severity={severity} variant={variant} sx={{ width: '100%' }}>
                {message}
            </Alert> 
        </Snackbar>
    )
}

export default SnackbarAlert
