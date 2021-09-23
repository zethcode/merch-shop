import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Grow, Grid } from '@material-ui/core';
import { GetProducts } from '../../services/products';
import { AddItem } from '../../services/cart';
import { AddShoppingCart } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import useWindowPosition from '../hook/useWindowPosition';
import { useMediaQuery } from 'react-responsive';
import { useAuthState } from '../../firebase';
import { useDispatch } from 'react-redux';
import Loading from '../Loading';

const Product = () => {
    const [products, setProducts] = useState({list: [], loading: true})
    const isMobile = useMediaQuery({ query: `(max-width: 959px)` })
    const productsChecked = useWindowPosition('products-section')
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const { user } = useAuthState()

    // console.log("product added status", itemIsAdded)

    useEffect(() => {
        GetProducts().then((returnValue) => setProducts({list: [...returnValue], loading: false}))
    }, [])

    // Add to cart handler
    const handleAddToCart = (product) => {
        AddItem(dispatch, user, product)
    }
    
    // TODO: ADD A CIRCULAR LOADING ON CART NUMBER AND ADD TO CART BUTTONS IF THE CART HASN'T LOADED YET

    return (
        products.loading ? <Loading message="Loading Products..." /> : 
        (!products.list ? 
            <h2>No items in stock</h2> :
            products.list.map((product) => (
                <Grow key={product.id} className={classes.productItems} in={productsChecked || isMobile} style={{ transformOrigin: '0 0 0' }} {...((productsChecked || isMobile) && { timeout: 1700 })}>
                    <Grid item key={product.id} lg={3} md={4} sm={6} xs={6}>
                        <Card className={classes.root}>
                            <CardMedia className={classes.media} image={product.image} title={product.name} />
                            <CardContent>
                                <div className={classes.cardContent}>
                                    <Typography className={classes.productName} variant="h6" gutterBottom>
                                        <b>{product.name}</b>
                                    </Typography>
                                </div>
                                <Typography className={classes.productDescription} variant="body2">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing className={classes.cardActions}>
                                <Typography className={classes.productPrice} align="left" variant="subtitle1" >
                                    &#8369;&nbsp;{product.price}
                                </Typography>
                                <IconButton aria-label="Add To Cart" onClick={() => user ? handleAddToCart(product) : history.push("/tabp-clothing/signin")} >
                                    <AddShoppingCart color="primary" />
                                </IconButton>
                                {/* {itemIsAdded ?
                                    <SnackbarAlert severity="success" variant="filled" message="Added to cart successfully!" />
                                    :
                                    <SnackbarAlert severity="error" variant="filled" message="The item is already in your cart!" />
                                } */}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grow>
            ))
        )
    )
}

export default Product
