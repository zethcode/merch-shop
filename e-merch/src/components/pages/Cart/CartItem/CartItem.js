import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, IconButton, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';


const CartItem = ({ item, updateCart, removeFromCart }) => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <Card>
            <CardMedia image={item.product.image} alt={item.product.title} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.product.title}</Typography>
                <Typography variant="h6">&#8369;&nbsp;{item.product.price}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    {/* <IconButton aria-label="Add To Cart" onClick={() => addToCart(product, 1)} > */}
                    <IconButton aria-label="Subtract Quantity" size="medium" disabled={item.quantity === 1} onClick={() => updateCart(item, item.quantity - 1)}>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton aria-label="Add Quantity" size="medium" onClick={() => updateCart(item, item.quantity + 1)}>
                        <AddBoxIcon />
                    </IconButton>
                </div>
                <Button variant="contained" type="button" color="secondary" size="small" onClick={handleClickOpen}>Remove</Button>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Remove Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to remove this item from your cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={() => removeFromCart(item.id)} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    )
}

export default CartItem
