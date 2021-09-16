import { useState, useRef } from 'react';
import { FormControl, Grid, TextField, Button, InputLabel, Input, InputAdornment, IconButton, Typography, Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

const SignUp = ({ classes, handleLoginView, handleSignupSubmit, authLogo, history }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({});
    const [showPassword, setShowPassword] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
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
                            // value={values.password}
                            // onChange={handleChange('password')}
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
                            // type={values.showPassword ? 'text' : 'password'}
                            // value={values.confirmPassword}
                            // onChange={handleChange('confirmPassword')}
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
                        <Link component="button" variant="subtitle2" onClick={() => handleLoginView(true)}>&nbsp;Sign In</Link>
                    </Typography>
                    <br />
                    <Link component="button" variant="subtitle2" to="/" onClick={() => history.push("/")}>Back to Home</Link>
                </Grid>
            </form>
        </>
    )
}

export default SignUp
