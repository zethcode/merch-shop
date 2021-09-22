import { FormControl, Grid, TextField, Button, InputLabel, Input, InputAdornment, IconButton, Typography, FormHelperText, Container, Paper } from '@material-ui/core';
import authLogo from './../../../assets/logo/tabp-black-on-transparent.png';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStyles from './styles';
import LoadingBackdrop from '../../LoadingBackdrop';
import { useAuthState } from './../../../firebase';

const Signin = ({ prevPath }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({}) 
    const [signinFailed, setSigninFailed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const { signIn } = useAuthState()
    const classes = useStyles()
    const history = useHistory()

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
    const handleLogin = useCallback(async values => {
        handleBackdropOpen()
        try {
            const userCredentials = await signIn(values)
            handleBackdropClose()
            console.log("ang user cred sa signin", userCredentials)
            // dispatch(setUserDetails({
            //     email: userCredentials.user.email,
            //     userId: userCredentials.user.uid
            // }))
            history.push("/tabp-clothing")
        } catch (error) {
            console.log("error 2", error)
            setSigninFailed(true)
            handleBackdropClose()
        }
    }, [history, signIn])

    return (
        <Container className={classes.content}>
            <div className={classes.toolbar} />
            <Paper 
                className={classes.paper}
                component={Container} 
                maxWidth="xs" 
                elevation={5}>

                <form onSubmit={handleSubmit(handleLogin)}>
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
                        <Typography variant="subtitle2" align="right">
                            <Link className={classes.link} to="/" variant="subtitle2" onClick={() => console.log("Insert forgot passwod functionality here.")}>Forgot password?</Link>
                        </Typography>
                        <Grid item align="center">
                            <Button className={classes.submitButton} variant="contained" color="primary" type="submit" disableElevation>Sign In</Button>
                        </Grid>

                        <Typography variant="subtitle2" align="center">
                            Don't have an account?
                            <Link className={classes.link} variant="subtitle2" to="/tabp-clothing/signup">&nbsp;Sign Up</Link>
                            <br /><br/>
                            <Link className={classes.link} variant="subtitle2" to="/tabp-clothing">Back to Home</Link>
                        </Typography>
                    </Grid>
                </form>
                <LoadingBackdrop className={classes.backdrop} open={openBackdrop} />
            </Paper>
        </Container>
    )
}

export default Signin
