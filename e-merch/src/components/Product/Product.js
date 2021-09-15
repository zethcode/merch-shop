import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import SnackbarAlert from '../SnackbarAlert';
import LoadingBackdrop from '../LoadingBackdrop';
import { useEffect, useState } from 'react';

const Product = ({ userId, product, addToCart, alertProps, handleClose }) => {
    userId = 'user-arckie'
    const classes = useStyles()
    const [initialLoad, setInitialLoad] = useState(true)
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        if (!initialLoad) {
            alertProps.open = false
        }
        setInitialLoad(false)
        handleBackdropClose()
    }, [alertProps, initialLoad])
    
    // Backdrop handlers
    const handleBackdropClose = () => {
        setOpenBackdrop(false)
    };
    
    const handleBackdropOpen = () => {
        setOpenBackdrop(true)
    }

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" >
                        &#8369;&nbsp;{product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add To Cart" onClick={() => { handleBackdropOpen(); addToCart(userId, product); }} >
                    <AddShoppingCart />
                </IconButton>
                {alertProps.addStatus ?
                    <SnackbarAlert alertProps={alertProps} handleClose={handleClose} severity="success" variant="filled" message="Added to cart successfully!" />
                    :
                    <SnackbarAlert alertProps={alertProps} handleClose={handleClose} severity="error" variant="filled" message="The item is already in your cart!" />
                }
                <LoadingBackdrop blackdropCLass={classes.backdrop} openBackdrop={openBackdrop} />
            </CardActions>
        </Card>
    )
}

export default Product
