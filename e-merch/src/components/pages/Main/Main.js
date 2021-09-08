import { Grid } from '@material-ui/core';
import Product from '../../Product/Product';
import useStyles from './styles';

const Main = ({ products, addToCart }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid 
        container
        spacing={4}
        justifyContent="center"
        style={{minHeight: '50vh'}}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2}>
              <Product product={product} addToCart={addToCart} />
            </Grid>
          ))}
      </Grid>
    </main>
  )
}

export default Main
