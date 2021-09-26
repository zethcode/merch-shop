import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Grow, Grid, Box, Paper } from '@material-ui/core';
import { GetProducts } from '../../services/products';
import { AddItem } from '../../services/cart';
import { AddShoppingCart } from '@material-ui/icons';
import { useEffect } from 'react';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import useWindowPosition from '../hook/useWindowPosition';
import { useMediaQuery } from 'react-responsive';
import { useAuthState } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { selectProducts } from '../../app/productsSlice'
import { selectLoadingComponentStatus, selectComponent } from '../../app/loadingComponentSlice';

const Product = () => {
    // const [products, setProducts] = useState({list: [], loading: true})
    const isMobile = useMediaQuery({ query: `(max-width: 959px)` })
    const productsChecked = useWindowPosition('products-section')
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const { user } = useAuthState()
    const products = useSelector(selectProducts)
    const isLoading = useSelector(selectLoadingComponentStatus)
    const loadingComponent = useSelector(selectComponent)

    // console.log("product added status", itemIsAdded)

    useEffect(() => {
        // GetProducts().then((returnValue) => setProducts({list: [...returnValue], loading: false}))
        GetProducts(dispatch)
    }, [dispatch])

    // Add to cart handler
    const handleAddToCart = (product) => {
        AddItem(dispatch, user, product)
    }
    
    // TODO: ADD A CIRCULAR LOADING ON CART NUMBER AND ADD TO CART BUTTONS IF THE CART HASN'T LOADED YET

    return (
        isLoading && loadingComponent === "products" ? <Loading /> : 
        (!products.length > 0 ? 
            <Paper style={{backgroundColor: "#29B3B9", padding: "15px", borderRadius: "50px"}}>
                <h2>No items in stock :(</h2> 
            </Paper>:
            products.map((product) => (
                <Grow key={product.id} in={productsChecked || isMobile} style={{ transformOrigin: '0 0 0' }} {...((productsChecked || isMobile) && { timeout: 1700 })}>
                    <Grid item key={product.id} lg={3} md={4} sm={4} xs={6}>
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
                                <IconButton aria-label="Add To Cart" color="inherit" onClick={() => user ? handleAddToCart(product) : history.push("/tabp-clothing/signin")} >
                                    <AddShoppingCart />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grow>
            ))
        )
    )
}

export default Product
