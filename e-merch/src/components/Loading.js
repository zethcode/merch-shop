import { Typography, CircularProgress, Grid } from '@material-ui/core';

const Loading = ({ component }) => {
    
    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '25vh' }}>
          <CircularProgress />
          <br />
          <Typography variant="h5" gutterBottom>Loading {component}...</Typography>
        </Grid>
    )
}

export default Loading
