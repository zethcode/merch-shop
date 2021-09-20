import { Backdrop, CircularProgress } from '@material-ui/core';
import { forwardRef, createRef, innerRef } from 'react';

const LoadingBackdrop = (props) => {
    return (
        <Backdrop {...props}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

// const loadingRef = createRef(null)

// const BackdropRef = forwardRef((props, ref) => {
//     return <Backdrop forwardRef={ref} {...props} />;
// });

// const LoadingBackdrop = forwardRef((props, ref) => 
//     // console.log("ang loading ref", loadingRef)
//     (
//         <Backdrop {...props} innerRef={ref}>
//             <CircularProgress color="inherit" />
//         </Backdrop>
//     )
// )

export default LoadingBackdrop
