import { FormControl, Grid, TextField, Button, InputAdornment, IconButton, Typography, Link, FormHelperText, Container, Paper } from '@material-ui/core';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { collection, doc } from 'firebase/firestore/lite';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoadingBackdrop from '../../LoadingBackdrop';
import useStyles from './styles';
import db from '../../../firebase';
import authLogo from './../../../assets/tabp-black-on-transparent.png';

const Signup = () => {
    const classes = useStyles()
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({})
    const [showPassword, setShowPassword] = useState(false)
    const [signupFailed, setSignupFailed] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const password = useRef({})
    password.current = watch("password", "")

    // Show password handlers
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    // Backdrop handlers
    const handleBackdropClose = () => {
        setOpenBackdrop(false)
    }
    
    const handleBackdropOpen = () => {
        setOpenBackdrop(true)
    }
    
    // Submit handler
    const handleSignupSubmit = useCallback(async (values) => {
        handleBackdropOpen()
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(cred => {
                const usersRef = doc(collection(db, 'users'), cred.id)
                console.log('User data added', usersRef)
                handleBackdropClose()
            }).catch(error => {
                console.log("Error", error, error.code, error.message)
                setSignupFailed(true)
                handleBackdropClose()
            })
        handleBackdropClose()
    }, [])

    // useEffect(() => {
    //     handleBackdropClose()
    // }, [])

    return (
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

                        {signupFailed && 
                            <FormHelperText error>
                                Error encountered on sign up.
                            </FormHelperText>
                        }
                        
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={6} sm={6}>
                                    <TextField 
                                        required
                                        id="register-first-name" 
                                        label="First Name"
                                        type="text"
                                        color="primary"
                                        InputLabelProps={{ required: false }}
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

                        <Grid item align="center">
                            <Button className={classes.submitButton} variant="contained" color="primary" type="submit" disableElevation>
                                Register
                            </Button>
                        </Grid>
                        <Typography variant="subtitle2" align="center">
                            Already have an account? 
                            <Link component="button" variant="subtitle2" onClick={() => history.push("/signin")}>&nbsp;Sign In</Link>
                        </Typography>
                        <br />
                        <Link component="button" variant="subtitle2" to="/" onClick={() => history.push("/")}>Back to Home</Link>
                    </Grid>
                </form>
                <LoadingBackdrop blackdropCLass={classes.backdrop} openBackdrop={openBackdrop} />
            </Paper>
        </Container>
    )
}

export default Signup
