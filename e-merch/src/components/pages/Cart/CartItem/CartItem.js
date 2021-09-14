import { Typography, Button, Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
import useStyles from './styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import SnackbarAlert from '../../../SnackbarAlert';
import { useEffect, useState } from 'react';

const CartItem = ({ item, updateCart, removeFromCart, alertProps, handleClose }) => {
    const classes = useStyles()
    const [initialLoad, setInitialLoad] = useState(true)
    
    // To close the Snackbar on component load
    // (fixes the problem where snackbars open status stay open if the page loads a different component and comes back to this component)
    useEffect(() => {
        if (!initialLoad) {
            alertProps.open = false
        }
        setInitialLoad(false)
    }, [alertProps, initialLoad])
    
    return (
        <Card>
            <CardMedia image={item.product.image} alt={item.product.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="h6">&#8369;&nbsp;{item.product.price}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <IconButton aria-label="Subtract Quantity" size="medium" disabled={item.quantity === 1} onClick={() => updateCart(item, item.quantity - 1)}>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton aria-label="Add Quantity" size="medium" onClick={() => updateCart(item, item.quantity + 1)}>
                        <AddBoxIcon />
                    </IconButton>
                    {!alertProps.addStatus &&
                    <SnackbarAlert alertProps={alertProps} handleClose={handleClose} severity="error" variant="filled" message="An error has occcured!" />
                }
                </div>
                <Button variant="contained" type="button" color="secondary" size="small" onClick={() => removeFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
