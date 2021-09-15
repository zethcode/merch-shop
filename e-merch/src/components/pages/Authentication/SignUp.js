import { useState } from 'react';
import { FormControl, Grid, TextField, FormGroup, Button, InputLabel, Input, InputAdornment, IconButton, Typography, Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const SignUp = ({ classes, handleLoginView, handleSignupSubmit }) => {
    const [values, setValues] = useState({
      password: '',
      confirmPassword: '',
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
        <FormGroup onSubmit={handleSignupSubmit}>
            <Grid className={classes.container} container direction="column" justifyContent="space-around" spacing={2}>
                <Typography variant="h4">Create an account</Typography>

                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <FormControl className={classes.formControl}>
                            <TextField 
                                required
                                id="register-first-name" 
                                label="First Name"
                                type="text"
                                color="primary"
                                InputLabelProps={{ required: false }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl className={classes.formControl}>
                            <TextField 
                                required
                                id="register-last-name" 
                                label="Last Name"
                                type="text"
                                color="primary"
                                InputLabelProps={{ required: false }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <FormControl className={classes.formControl}>
                    <TextField 
                        required
                        id="register-email" 
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
                        id="register-password"
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

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="input-confirm-password">Confirm Password</InputLabel>
                    <Input
                        id="register-confirm-password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                </FormControl>

                <Grid item align="center">
                    <Button className={classes.submitButton} variant="contained" color="primary" disableElevation>
                        Register
                    </Button>
                </Grid>
                <Typography variant="subtitle2" align="center">
                    Already have an account? 
                    <Link component="button" variant="subtitle2" onClick={() => handleLoginView(true)}>&nbsp;Sign In</Link>
                </Typography>
            </Grid>
        </FormGroup>
    )
}

export default SignUp
