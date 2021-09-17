import { Typography, CircularProgress, Grid } from '@material-ui/core';

const Loading = ({ message }) => {
    
    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '25vh' }}>
          <CircularProgress />
          <br />
          <Typography variant="h5" gutterBottom>{message}</Typography>
        </Grid>
    )
}

export default Loading
