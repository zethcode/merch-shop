import React from 'react';
import { Container, Grid, Typography, Button, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import SnackbarAlert from '../../SnackbarAlert';
import LoadingBackdrop from '../../LoadingBackdrop';
import { useAuthState } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingStatus } from '../../../app/loadingSlice';
import { selectLoadingComponentStatus, selectComponent } from '../../../app/loadingComponentSlice';
import { setAlert, selectIsOpen } from '../../../app/snackbarSlice';
import { selectCart } from '../../../app/cartSlice';
import { DeleteCart } from '../../../services/cart';
import Footer from '../../Footer';
import { scroller } from 'react-scroll';

const Cart = () => {
    const classes = useStyles()
    const [subTotal, setSubTotal] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(0)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useAuthState()
    const cart = useSelector(selectCart)
    const snackbarOpen = useSelector(selectIsOpen)
    const isLoading = useSelector(selectLoadingStatus)
    const isCartLoading = useSelector(selectLoadingComponentStatus)
    const loadingComponent = useSelector(selectComponent)

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

    // Empty cart handler
    const handleEmptyCart = () => {
        setOpen(false)
        DeleteCart(dispatch, user.uid)
    }

    // Order checkout handler
    const handleCheckout = () => {
        console.log("Checking out...")
    }

    useEffect(() => {
        if (cart.length) {
            const sum = cart.reduce((subTotal, cartItem) => subTotal + (cartItem.product.price * cartItem.quantity), 0)
            const totalItems = cart.reduce((itemQuantity, cartItem) => itemQuantity + cartItem.quantity, 0)
            setSubTotal(sum)
            setItemQuantity(totalItems)
        }
        
        scroller.scrollTo("cartHeader", {
            duration: 1000,
            delay: 10,
            smooth: true
        })

        dispatch(setAlert({
            isOpen: false,
            success: false,
            severity: null,
            message: null
        }))
    }, [dispatch, cart])

    const EmptyCart = () => (
        <Typography variant="subtitle1" align="center" gutterBottom>
            <br/>
            There are no items in your cart.
            <br/>
            <Button component={Link} to="/tabp-clothing/#products-section" size="small" type="button" variant="contained" color="primary" onClick={() => handleCheckout()}>
                Shop now
            </Button>
        </Typography>
    )

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            <Grid className={classes.itemContainer} item xs={8}>
                {cart.map((item) => {
                    return (
                        <CartItem item={item} key={item.id}/>
                    )
                })}
            </Grid>
            <Grid className={classes.summaryContainer} item xs={4}>
                <Paper className={classes.summary}>
                    <Box>
                        Order Summary
                    </Box>
                    <br/>
                    <Box className={classes.summaryText}>
                        <Typography variant="subtitle2">
                            Subtotal ({itemQuantity} items): 
                        </Typography>
                        <Typography variant="subtitle2">
                            &#8369;{subTotal}
                        </Typography>
                    </Box>
                    <Box className={classes.summaryText}>
                        <Typography variant="subtitle2">
                            Shipping Fee:
                        </Typography>
                        <Typography variant="subtitle2">
                            &#8369;{itemQuantity*100}
                        </Typography>
                    </Box>
                    <br/>
                    <Box className={classes.summaryText}>
                        <Typography>
                            <b>Total:</b>
                        </Typography>
                        <Typography color="secondary">
                            <b>&#8369;{subTotal + (itemQuantity*100)}</b>
                        </Typography>
                    </Box>
                    <br/>
                    <Box align="center">
                        <Button className={classes.emptyButton} size="small" type="button" variant="contained" color="secondary" onClick={() => handleClickOpen()}>
                            Empty Cart
                        </Button>
                    </Box>
                    <br/>
                    <Box align="center">
                        <Button className={classes.checkoutButton} size="small" type="button" variant="contained" color="primary" onClick={() => handleCheckout()}>
                            Checkout
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
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
        </>
    )

    return (
        <div style={{backgroundColor: "rgb(0, 0, 0, 0.1)"}} name="cartHeader">
            <Container style={{minHeight: "72.8vh"}}>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant="h4" gutterBottom>Cart Items</Typography><br/>
                {isCartLoading && loadingComponent === "cart" ? <Loading /> : (!cart.length ? <EmptyCart /> : <FilledCart />)}
                {snackbarOpen && <SnackbarAlert />}
                {isLoading && <LoadingBackdrop />}
            </Container>
            <Footer />
        </div>
    )
}

export default Cart
