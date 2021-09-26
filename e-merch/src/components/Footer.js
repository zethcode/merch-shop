import { Container, Grid, Box, Link, IconButton } from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import GoogleIcon from '../assets/icons/google-icon-primary-2.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';

const Footer = () => {
    const useStyles = makeStyles((theme) => ({
        mainBox: {
            backgroundColor: "#171717", 
            paddingBottom: '15px'
        },
        support: {
            fontSize: '13px',
            [theme.breakpoints.down("sm")]: {
                fontSize: '11px'
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: '13px'
            }
        }
    }));

    const classes = useStyles()
    let location = useLocation()

    const handleBackToTop = () => {
        animateScroll.scrollToTop({
            duration: 800,
            delay: 10,
            smooth: true
        })
    }
    
    return (    
        (location.pathname !== "/tabp-clothing/signin" || location.pathname !== "/tabp-clothing/signup") &&
        <Box className={classes.mainBox} px={{xs: 3, sm: 5}} py={{xs: 5, sm: 5}} bgcolor="text-secondary" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Support</Box>
                        <br/>
                        <Box>
                            General Inquiries<br/>
                            <Link className={classes.support} href="mailto:zeth.ecommerce@gmail.com">zeth.ecommerce@gmail.com</Link>
                        </Box>
                        <br/>
                        <Box className={classes.support}>
                            Report Bugs<br/>
                            <Link className={classes.support} href="mailto:tabp.clothing.dev@gmail.com">tabp.clothing.dev@gmail.com</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Contact</Box>
                        <br/>
                        <Box textAlign="center">
                            <Link href="mailto:arckie.jadulco@gmail.com">
                                <IconButton>
                                    <img style={{width: '100%', height: '43px'}} src={GoogleIcon} alt="google"/>
                                </IconButton>
                            </Link>
                            <IconButton href="https://github.com/zethcode">
                                <GitHubIcon color="primary" fontSize="large" />
                            </IconButton>
                            <IconButton href="https://www.linkedin.com/in/arckie-jadulco/">
                                <LinkedInIcon color="primary" fontSize="large" />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box textAlign="center">
                            <Link style={{cursor: 'pointer', textDecoration: 'none'}} onClick={handleBackToTop}>
                                Back to Top
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs: 4, sm: 7}} pb={{xs:1, sm: 0}}>
                    Tela At Iba Pa Clothing &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
