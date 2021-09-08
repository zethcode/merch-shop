import { Container, Grid } from '@material-ui/core';
import { useEffect, useState } from "react";
import Product from '../Product/Product';
import useStyles from './mainStyles';

const Main = () => {
  const [products, setProducts] = useState([])
  
  const getProducts = async () => {
    const response = await fetch("http://localhost:5000/products")
    
    setProducts(await response.json())
  };
  
  useEffect(() => {
    getProducts()
  }, [])

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
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        {/* <Grid 
          container
          item
          xs={6}
          style={{backgroundColor: "#82b9d1", minHeight: '50vh'}}>
            Test
        </Grid>
        <Grid 
          container
          item
          xs={6}
          style={{backgroundColor: "#82b9d1", minHeight: '50vh'}}>
            Test
        </Grid> */}
      </Grid>
    </main>
  )
}

export default Main
