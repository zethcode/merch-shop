import { useState } from 'react';
import { FormControl, Grid, TextField, FormGroup, Button, InputLabel, Input, InputAdornment, IconButton, Typography, Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Login = ({ classes, handleLoginView, handleLoginSubmit, authLogo }) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
      
      // Password visibility handlers
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormGroup onSubmit={handleLoginSubmit}>
            <Grid className={classes.container} container direction="column" justifyContent="space-around" spacing={2}>
                
                <Grid item align="center">
                    <img className={classes.authLogo} alt="tabp-logo" src={authLogo} />
                    <Typography variant="h4" align="center">Shop Now</Typography>
                    <Typography variant="caption" align="center">Sign in with your account to start shopping!</Typography>
                </Grid>
                

                <FormControl className={classes.formControl}>
                    <TextField 
                        required
                        id="login-email" 
                        label="Email Address"
                        placeholder="example@email.com"
                        type="email"
                        color="primary"
                        InputLabelProps={{ required: false }}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="input-password">Password</InputLabel>
                    <Input
                        id="login-password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <br />
                <Link component="button" align="right" variant="subtitle2" onClick={() => console.log("Insert forgot passwod functionality here.")}>Forgot password?</Link>

                <Grid item align="center">
                    <Button className={classes.submitButton} variant="contained" color="primary" disableElevation>Sign In</Button>
                </Grid>

                <Typography variant="subtitle2" align="center">
                    Dont't have an account?
                <Link component="button" variant="subtitle2" onClick={() => handleLoginView(false)}>&nbsp;Sign Up</Link>
                </Typography>
            </Grid>
        </FormGroup>
    )
}

export default Login
