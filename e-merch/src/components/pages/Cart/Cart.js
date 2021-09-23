import React from 'react';
import { Container, Grid, Typography, Button, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import SnackbarAlert from '../../SnackbarAlert';
import LoadingBackdrop from '../../LoadingBackdrop';
import { useAuthState } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../../app/cartSlice';

const Cart = () => {
    const classes = useStyles()
    const [subTotal, setSubTotal] = useState(0)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useAuthState()
    const cart = useSelector(selectCart)

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    // Empty cart pop up handlers
    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleEmptyCart = () => {
        EmptyCart(dispatch, user)
    }

    useEffect(() => {
        if (cart.length) {
            const sum = cart.reduce((subTotal, cartItem) => subTotal + (cartItem.product.price * cartItem.quantity),0)
            setSubTotal(sum);
        }
        
        // handleBackdropClose()
    }, [cart])

    const EmptyCart = () => (
        <Typography variant="subtitle1" gutterBottom>
            There are no items in your cart.
            <br/>
            <Link to="/tabp-clothing">Shop now!</Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.map((item) => {
                return (
                    <Grid item xs={6} sm={4} md={4} lg={3} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                )
            })}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h5">Subtotal: &#8369;&nbsp;{subTotal}</Typography>
            <div>
                <Button className={classes.emptyButton} size="small" type="button" variant="contained" color="secondary"  onClick={handleClickOpen}>
                    Empty Cart
                </Button>
                <Button className={classes.checkoutButton} size="small" type="button" variant="contained" color="primary">
                    Checkout
                </Button>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Remove Items</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to remove all the items from your cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={() => handleEmptyCart()} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        </div>
        </>
    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom>Cart Items</Typography><br/>
            {!cart.length ? <EmptyCart /> : <FilledCart />}
            {/* { loading ? <Loading message="Loading Cart..." /> : (!cart.length ? <EmptyCart /> : <FilledCart />) } */}
            
            {/* {alertProps.delete ? 
                <SnackbarAlert alertProps={alertProps} handleClose={handleSnackbarClose} severity="success" variant="filled" message="Emptied the cart successfully!" />
                :
                <SnackbarAlert alertProps={alertProps} handleClose={handleSnackbarClose} severity="error" variant="filled" message="An error has occcured!" />
            } */}
            <SnackbarAlert />
            <LoadingBackdrop />
        </Container>
    )
}

export default Cart
