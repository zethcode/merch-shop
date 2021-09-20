import { Container, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    let location = useLocation()
    
    return (
        
        location.pathname !== "/authenticate" &&
        <Container>
            <Grid item className="footer">
                <p>All rights reserved.</p>
            </Grid>
        </Container>
    )
}

export default Footer
