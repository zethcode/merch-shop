import { FormControl, Grid, TextField, Button, InputAdornment, IconButton, Typography, FormHelperText, Container, Paper } from '@material-ui/core';
import authLogo from './../../../assets/logo/tabp-black-on-transparent.png';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState, useRef, useCallback } from 'react';
import LoadingBackdrop from '../../LoadingBackdrop';
import { useAuthState } from './../../../firebase';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { setLoading, selectLoadingStatus } from '../../../app/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({})
    const [showPassword, setShowPassword] = useState(false)
    const isLoading = useSelector(selectLoadingStatus)
    const { signUp } = useAuthState()
    const dispatch = useDispatch()
    const classes = useStyles()
    const errorCode = useRef({})
    const password = useRef({})
    password.current = watch("password", "")

    /* TODO:
        DONE - 1. Add "Successfully registered! Signing you in..." message after registering. Or email verification message sent if you will now implement email verification.
        2. Add Email Verification
    */

    // Show password handlers
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    
    // Submit handler
    const handleSignupSubmit = useCallback(async (values) => {
        dispatch(setLoading({isLoading: true}))
        try {
            const returnValue = await signUp(values)
            // handleBackdropClose()
            dispatch(setLoading({isLoading: false}))
            errorCode.current = (returnValue.type === "success" ? returnValue.type : returnValue.errorCode)
        } catch (error) {
            errorCode.current = error.code
            // handleBackdropClose()
            dispatch(setLoading({isLoading: false}))
        }
    }, [dispatch, signUp])

    return (
        <div className={classes.root}>
            {isLoading && <LoadingBackdrop />}
            <Container className={classes.content}>
                <div className={classes.toolbar} />
                <Paper 
                    className={classes.paper}
                    component={Container} 
                    maxWidth="xs" 
                    elevation={5}>
                    <form onSubmit={handleSubmit(handleSignupSubmit)}>
                        <Grid className={classes.container} container direction="column" justifyContent="space-around" spacing={2}>
                            <Grid item align="center">
                                <img className={classes.authLogo} alt="tabp-logo" src={authLogo} />
                                <Typography variant="h4">Create an account</Typography>
                            </Grid>
                            
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={6} sm={6}>
                                        <TextField 
                                            required
                                            id="register-first-name" 
                                            label="First Name"
                                            type="text"
                                            color="primary"
                                            InputLabelProps={{ required: false }}
                                            {...register("firstName")}
                                        />
                                </Grid>

                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <TextField 
                                        required
                                        id="register-last-name" 
                                        label="Last Name"
                                        type="text"
                                        color="primary"
                                        InputLabelProps={{ required: false }}
                                        {...register("lastName")}
                                    />
                                </Grid>
                            </Grid>

                            <TextField 
                                className={classes.formControl}
                                required
                                id="register-email" 
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
                                <TextField
                                    required
                                    id="register-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="input-reg-password"
                                    label="Password"
                                    InputLabelProps={{ required: false }}
                                    autoComplete="off"
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    {...register("password", {
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {handleClickShowPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    required
                                    id="register-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="input-reg-confirm-password"
                                    label="Confirm Password"
                                    InputLabelProps={{ required: false }}
                                    autoComplete="off"
                                    error={Boolean(errors.password_confirm)}
                                    helperText={errors.password_confirm?.message}
                                    {...register("password_confirm", {
                                        validate: value => value === password.current || "The passwords does not match" })}
                                />
                            </FormControl>

                            <br />
                            {errorCode.current === "auth/email-already-in-use" ?
                                <FormHelperText error>
                                    This email address has already been taken.
                                </FormHelperText>
                                :
                                (Object.keys(errorCode.current).length !== 0 && errorCode.current !== "success") && 
                                <FormHelperText error>
                                    An error was encountered on sign up.
                                </FormHelperText>
                            }

                            <Grid item align="center">
                                {(Object.keys(errorCode.current).length !== 0 && errorCode.current === "success") && 
                                    <FormHelperText success>
                                        Account successfully created. 
                                        <Link className={classes.link} variant="subtitle2" to="/tabp-clothing/signin">&nbsp;Sign In now.</Link>
                                    </FormHelperText>
                                }
                                <Button className={classes.submitButton} variant="contained" color="primary" type="submit" disableElevation>
                                    Register
                                </Button>
                            </Grid>
                            <Typography variant="subtitle2" align="center">
                                Already have an account? 
                                <Link className={classes.link} variant="subtitle2" to="/tabp-clothing/signin">&nbsp;Sign In</Link>
                                <br/><br/>
                                <Link className={classes.link} variant="subtitle2" to="/tabp-clothing">Back to Home</Link>
                            </Typography>
                            <br />
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Signup
