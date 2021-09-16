import { useState, useRef } from 'react';
import { FormControl, Grid, TextField, Button, InputLabel, Input, InputAdornment, IconButton, Typography, Link, FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

const Login = ({ classes, handleLoginView, handleLoginSubmit, authLogo, history, loginFailed }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({});
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <Grid className={classes.container} container direction="column" justifyContent="space-around" spacing={2}>
                
                <Grid item align="center">
                    <img className={classes.authLogo} alt="tabp-logo" src={authLogo} />
                    <Typography variant="h4" align="center">Shop Now</Typography>
                    <Typography variant="caption" align="center">Sign in with your account to start shopping!</Typography>
                </Grid>
                
                {loginFailed && 
                    <FormHelperText error>
                        Login failed. Your email/password is incorrect.
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
                    Dont't have an account?
                <Link component="button" variant="subtitle2" onClick={() => handleLoginView(false)}>&nbsp;Sign Up</Link>
                </Typography>
                <br />
                <Link component="button" variant="subtitle2" to="/" onClick={() => history.push("/")}>Back to Home</Link>
            </Grid>
        </form>
        </>
    )
}

export default Login
