import { Backdrop, CircularProgress } from '@material-ui/core';

const LoadingBackdrop = ({ blackdropCLass, openBackdrop}) => {
    return (
        <Backdrop className={blackdropCLass} open={openBackdrop} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingBackdrop
