import { Grid } from '@material-ui/core';
import Loading from '../../Loading';
import Product from '../../Product/Product';
import useStyles from './styles';

const Main = ({ state, products, addToCart, loading, alertProps, handleClose }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      { loading ? <Loading message="Loading Products..." /> :
        <Grid 
        container
        spacing={3}
        justifyContent="center"
        style={{minHeight: '40vh'}}>
          {products.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <Product state={state} product={product} addToCart={addToCart} alertProps={alertProps} handleClose={handleClose} />
            </Grid>
          ))}
      </Grid>
      }
    </main>
  )
}

export default Main
