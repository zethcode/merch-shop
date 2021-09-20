import { Collapse, Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { useState, useEffect, PureComponent, memo } from 'react';
import Loading from '../../Loading';
import Product from '../../Product/Product';
import headerImage from './../../../assets/images/woman-mountain-walking-2.jpg';
import headerLogo from './../../../assets/logo/logo-black-on-transparent.png';
import useStyles from './styles';


const Home = memo(() => {
    const classes = useStyles()
    const [headerChecked, setHeaderChecked] = useState(false)

    console.log("re-rendered home")

    const handleHeaderChange = () => {
        setHeaderChecked((prev) => !prev);
    };

    useEffect(() => {
        setHeaderChecked(true)
    }, [])
      
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.toolbar} />
                <Collapse in={headerChecked} {...(headerChecked && { timeout: 1700 })} collapsedSize={50}>
                    <Grid 
                        className={classes.headerContainer} 
                        container
                        // align="center"
                        // justifyContent="center"
                        direction="column" >
                        <Grid item>
                            <Typography className={classes.headerTitle} variant="h1">Tela At Iba Pa <br/>Clothing </Typography>
                            <Typography variant="subtitle1">Never be afraid to express yourself through style.</Typography>
                        </Grid>
                    </Grid>
                </Collapse>
            </div>
            <div className={classes.section1}>
                <img className={classes.headerImage} alt="woman-trekking" src={headerImage} />
            </div>
            <CssBaseline />
        </div>
    )
})

export default Home
