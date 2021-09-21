import { FormControl, Grid, TextField, Button, InputLabel, Input, InputAdornment, IconButton, Typography, Link, FormHelperText, Container, Paper } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import useStyles from './styles';
import authLogo from './../../../assets/logo/tabp-black-on-transparent.png';
import LoadingBackdrop from '../../LoadingBackdrop';
import authBG from './../../../assets/images/clothes-rack.jpg';
import { Parallax } from 'react-parallax';

const Signin = ({ prevPath }) => {
    const classes = useStyles()
    const history = useHistory()
    const [signinFailed, setSigninFailed] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({}) 
    const [showPassword, setShowPassword] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)

    console.log("ang path", prevPath)

    // Show password handlers
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Backdrop handlers
    const handleBackdropClose = () => {
        setOpenBackdrop(false)
    }
    
    const handleBackdropOpen = () => {
        setOpenBackdrop(true)
    }

    // Submit handler
    const handleLoginSubmit = useCallback(async values => {
        handleBackdropOpen()
        const auth = getAuth()
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredentials) => {
                    // const location = useLocation();
                    // const { redirectTo } = queryString.parse(location.search);
                    // history.push(redirectTo == null ? "/apps" : redirectTo);
                })
                .catch((error) => {
                    console.log("Error encountered signing in!")
                })
        } catch (e) {
            // Add better message handling here for UX
            setSigninFailed(true)
            handleBackdropClose()
        }
    }, [])

    return (
        <Parallax bgImage={authBG} bgImageAlt="Clothes Rack" blur={2}>
        <Container className={classes.content}>
            <div className={classes.toolbar} />
            <Paper 
                className={classes.paper}
                component={Container} 
                maxWidth="xs" 
                elevation={5}>

                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <Grid className={classes.container} container direction="column" justifyContent="space-around" spacing={2}>
                        
                        <Grid item align="center">
                            <img className={classes.authLogo} alt="tabp-logo" src={authLogo} />
                            <Typography variant="h4" align="center">Shop Now</Typography>
                            <Typography variant="caption" align="center">Sign in with your account to start shopping!</Typography>
                        </Grid>
                        
                        {signinFailed && 
                            <FormHelperText error>
                                Sign in failed. Your email/password is incorrect.
                            </FormHelperText>
                        }
                        
                        <TextField 
                            className={classes.formControl}
                            required
                            id="login-email" 
                            type="email"
                            name="email"
                            label="Email Address"
                            placeholder="example@email.com"
                            InputLabelProps={{ required: false }}
                            {...register("email", {
                                pattern: {
                                    value: /.+@.+\.[A-Za-z]{2,4}$/,
                                    message: "This is an invalid email address"
                                }
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="login-password">Password</InputLabel>
                            <Input
                                id="login-password"
                                required
                                type={showPassword ? 'text' : 'password'}
                                {...register("password")}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br />
                        <Link component="button" align="right" variant="subtitle2" onClick={() => console.log("Insert forgot passwod functionality here.")}>Forgot password?</Link>

                        <Grid item align="center">
                            <Button className={classes.submitButton} variant="contained" color="primary" type="submit" disableElevation>Sign In</Button>
                        </Grid>

                        <Typography variant="subtitle2" align="center">
                            Don't have an account?
                        <Link component="button" variant="subtitle2" onClick={() => history.push("/tabp-clothing/signup")}>&nbsp;Sign Up</Link>
                        </Typography>
                        <br />
                        <Link component="button" variant="subtitle2" onClick={() => history.push("/tabp-clothing")}>Back to Home</Link>
                    </Grid>
                </form>
                <LoadingBackdrop className={classes.backdrop} open={openBackdrop} />
            </Paper>
        </Container>
        </Parallax>
    )
}

export default Signin
