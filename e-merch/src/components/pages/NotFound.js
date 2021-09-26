import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const NotFound = () => {
    return (
        <Grid 
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
          <Grid item >
            <h3>Error 404: Page not found!</h3>
            <Link to="/tabp-clothing">Go back to home page</Link>
          </Grid>
        </Grid>
    )
}

export default NotFound
