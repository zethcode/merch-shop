import { Typography, Button, Card, CardActions, CardContent, CardMedia, IconButton, Grid, Box, Paper, Link } from '@material-ui/core';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingBackdrop from '../../../LoadingBackdrop';
import SnackbarAlert from '../../../SnackbarAlert';
import useStyles from './styles';

const CartItem = ({ item }) => {
    const classes = useStyles()
    const isMobile = useMediaQuery({ query: `(max-width: 599px)` })
    
    // To close the Snackbar on component load (fixes the problem where snackbars open status stay open if the page loads a different component and comes back to this component)
    useEffect(() => {
        // if (!initialLoad) {
        //     alertProps.open = false
        // }
        // setInitialLoad(false)
        // handleBackdropClose()
    }, [])

    const handleUpdateCart = () => {
        console.log('Updating...')
    }

    const handleRemoveItem = () => {
        console.log('Removing...')
    }

    return (
        <>
        <Paper className={classes.itemList}>
            <Grid container justifyContent="space-between">
                <Grid className={classes.itemPhoto} item>
                    <img src={item.product.image} alt="product.name" width="100px" height="100px" />
                </Grid>
                <Grid className={classes.itemDetails} item>
                    <Typography className={classes.productName} variant="subtitle1" noWrap>{item.product.name}</Typography>
                    <Typography className={classes.productDesc} variant="subtitle2" noWrap>{item.product.description}</Typography>
                    <br/>
                    <Typography variant="subtitle1" color="primary" noWrap>&#8369;{item.product.price}</Typography>
                </Grid>
                <Grid className={classes.itemActions} item align={isMobile ? "center" : "right"}>
                    {/* <IconButton aria-label="Subtract Quantity" size="medium" disabled={item.quantity === 1} onClick={() => handleUpdateCart(item, item.quantity-1)}> */}
                    {/* </IconButton> */}
                    {/* <IconButton aria-label="Add Quantity" size="medium" onClick={() => handleUpdateCart(item, item.quantity+1)}> */}
                    {/* </IconButton> */}
                    <Typography className={classes.productQuantity}>
                        {!isMobile && 'Qty: '}<b>{item.quantity}</b>
                        <br/>
                    </Typography>
                    <Link className={classes.productSubtract} aria-label="Subtract Quantity" disabled={item.quantity === 1} onClick={() => handleUpdateCart(item, item.quantity-1)}>
                        <IndeterminateCheckBoxIcon style={{cursor: item.quantity !== 1 && "pointer"}} fontSize='inherit' color={item.quantity === 1 && 'disabled'} />
                    </Link>
                    <Link className={classes.productAdd} aria-label="Add Quantity" onClick={() => handleUpdateCart(item, item.quantity+1)}>
                        <AddBoxIcon style={{cursor: "pointer"}} fontSize='inherit' />
                    </Link>
                    <Typography className={classes.productRemove}>
                        {isMobile ? 
                            <DeleteIcon color="secondary" aria-label="Delete Item" onClick={() => handleRemoveItem(item.id)}/>
                            :
                            <Button variant="contained" type="button" color="secondary" size="small" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
        <br/>
        {/* <Card>
            <CardMedia className={classes.cardMedia} image={item.product.image} alt={item.product.name} />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.productName} variant="h6">{item.product.name}</Typography>
                <Typography className={classes.productPrice} variant="h6">&#8369;{item.product.price}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <IconButton aria-label="Subtract Quantity" size="medium" disabled={item.quantity === 1} onClick={() => handleUpdateCart(item, item.quantity-1)}>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton aria-label="Add Quantity" size="medium" onClick={() => handleUpdateCart(item, item.quantity+1)}>
                        <AddBoxIcon />
                    </IconButton>
                    {!alertProps.addStatus &&
                    <SnackbarAlert alertProps={alertProps} handleClose={handleSnackbarClose} severity="error" variant="filled" message="An error has occcured!" />
                    }
                    <LoadingBackdrop className={classes.backdrop} open={openBackdrop} />
                </div>
                <Button variant="contained" type="button" color="secondary" size="small" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </CardActions>
        </Card> */}
        </>
    )
}

export default CartItem
