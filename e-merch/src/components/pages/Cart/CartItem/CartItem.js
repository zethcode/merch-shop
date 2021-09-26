import { Typography, Button, Grid, Paper, Link } from '@material-ui/core';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { UpdateItemQuantity, DeleteItem } from '../../../../services/cart';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 599px)` })
    const dispatch = useDispatch()
    const classes = useStyles()
    
    useEffect(() => {
        // if (!initialLoad) {
        //     alertProps.open = false
        // }
        // setInitialLoad(false)
        // handleBackdropClose()
    }, [])

    const handleUpdateCart = (quantity) => {
        UpdateItemQuantity(dispatch, item.id, quantity)
    }

    const handleRemoveItem = () => {
        DeleteItem(dispatch, item.id)
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
                    <Typography className={classes.productQuantity}>
                        {!isMobile && 'Qty: '}<b>{item.quantity}</b>
                        <br/>
                    </Typography>
                    <Link className={classes.productSubtract} aria-label="Subtract Quantity" onClick={() => item.quantity !== 1 && handleUpdateCart(item.quantity-1)}>
                        <IndeterminateCheckBoxIcon fontSize='inherit' style={{cursor: item.quantity !== 1 ? "pointer" : "not-allowed"}} color={item.quantity !== 1 ? "primary" : "disabled"} />
                    </Link>
                    <Link className={classes.productAdd} aria-label="Add Quantity" onClick={() => handleUpdateCart(item.quantity+1)}>
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
        </>
    )
}

export default CartItem
