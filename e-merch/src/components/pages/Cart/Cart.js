import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateCart, removeFromCart }) => {
    const classes = useStyles()
    const [subTotal, setSubTotal] = useState(0)

    const EmptyCart = () => (
        <Typography variant="subtitle1" gutterBottom>
            There are no items in your cart.
            <br/>
            <Link to="/">Shop now!</Link>
        </Typography>
    )

    useEffect(() => {
        if (cart.length) {
            const sum = cart.reduce((subTotal, cartItem) => subTotal + (cartItem.product.price * cartItem.quantity),0)
            setSubTotal(sum);
        }
    }, [cart])

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.map((item) => {
                return (
                    <Grid item xs={12} sm={4} key={item.product.id}>
                        <CartItem item={item} updateCart={updateCart} removeFromCart={removeFromCart}/>
                    </Grid>
                )
            })}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h5">Subtotal: &#8369;&nbsp;{subTotal}</Typography>
            <div>
                <Button className={classes.emptyButton} size="small" type="button" variant="contained" color="secondary">
                    Empty Cart
                </Button>
                <Button className={classes.checkoutButton} size="small" type="button" variant="contained" color="primary">
                    Checkout
                </Button>
            </div>
        </div>
        </>
    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom>Shopping Cart</Typography>
            { !cart.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
