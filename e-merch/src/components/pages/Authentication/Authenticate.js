import { useCallback, useEffect, useState, memo } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore/lite';
import db from '../../../firebase';
import useStyles from './styles';
import { Container, Link, Paper } from '@material-ui/core';
import authLogo from './../../../assets/tabp-black-on-transparent.png';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import LoadingBackdrop from '../../LoadingBackdrop';
import Signup from './Signup';
import Signin from './Signin';

const Authenticate = memo(({ userInfo }) => {
    const classes = useStyles()
    const history = useHistory()
    const [loginView, setLoginView] = useState(true)
    const [signupFailed, setSignupFailed] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)

    // console.log("check for re rendering: Authenticate.js", loginView)

    /*
    TODO:

        Steps
        1. Go to auth page
        2. Reload the page, or any first time render
        3. Quickly click Sign Up
    
        The component will then go back to the login page setting the loginView to true, 
        after a few seconds it stops setting it to true

        Research these, related to re-rendering
        1. shouldComponentUpdate()
        2. React.PureComponent
        3. React.memo (memoization)

    */

    // Backdrop handlers
    const handleBackdropClose = () => {
        setOpenBackdrop(false)
    }
    
    const handleBackdropOpen = () => {
        setOpenBackdrop(true)
    }

    // Login/Sign up view handler
    const handleLoginView = (isLogin) => {
        setLoginView(isLogin)
    }

    // Submit handlers
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

    const handleLoginSubmit = useCallback(async values => {
        handleBackdropOpen()
        const auth = getAuth()
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
        } catch (e) {
            // Add better message handling here for UX
            setLoginFailed(true)
            handleBackdropClose()
        }
    }, [])

    useEffect(() => {
        setLoginFailed(false)
        handleBackdropClose()
    }, [])

    return (
        <Container className={classes.content}>
            <div className={classes.toolbar} />
            <Paper 
                className={classes.paper}
                component={Container} 
                maxWidth="xs" 
                elevation={5}
            >
                {loginView ? 
                <Signin classes={classes} handleLoginView={handleLoginView} handleLoginSubmit={handleLoginSubmit} authLogo={authLogo} history={history} loginFailed={loginFailed} /> 
                : <Signup signupFailed={signupFailed} classes={classes} handleLoginView={handleLoginView} handleSignupSubmit={handleSignupSubmit} authLogo={authLogo} history={history} />}
                <LoadingBackdrop blackdropCLass={classes.backdrop} openBackdrop={openBackdrop} />
            </Paper>
        </Container>
    )
})

export default Authenticate
