import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import SnackbarAlert from '../SnackbarAlert';

const Product = ({ product, addToCart, alertProps, handleClose }) => {
    const classes = useStyles()
    const userId = 'user-arckie'
    
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
                <IconButton aria-label="Add To Cart" onClick={() => {addToCart(userId, product.id)}} >
                    <AddShoppingCart />
                </IconButton>
                {alertProps.addStatus ?
                    <SnackbarAlert alertProps={alertProps} handleClose={handleClose} severity="success" variant="filled" message="Added to cart successfully!" />
                    :
                    <SnackbarAlert alertProps={alertProps} handleClose={handleClose} severity="error" variant="filled" message="The item is already in your cart!" />
                }
            </CardActions>
        </Card>
    )
}

export default Product
