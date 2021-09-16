import { useCallback, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore/lite';
import db from '../../../firebase';
import useStyles from './styles';
import { Container, Link, Paper } from '@material-ui/core';
import SignUp from './SignUp';
import Login from './Login';
import authLogo from './../../../assets/tabp-black-on-transparent.png';
import { useHistory } from 'react-router-dom';

const Authenticate = ({ userInfo }) => {
    const classes = useStyles()
    const [loginView, setLoginView] = useState(true)
    const [loginFailed, setLoginFailed] = useState(false)
    const history = useHistory()

    // Login/Sign up view handler
    const handleLoginView = (isLogin) => {
        setLoginView(isLogin)
    }

    // Submit handlers
    const handleSignupSubmit = useCallback(async (values) => {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(cred => {
                const usersRef = doc(collection(db, 'users'), cred.id)
                const data = {  }

                // addDoc(usersRef, data)
                console.log('ang user', usersRef.data())
            }).then((data) => {
                // This will execute after the first promise is resolved. Get sign up instance and reset the sign up form
                console.log('ang data', data)
            }).catch(e => {
                alert("Error", e.message)
            })
    }, [])

    const handleLoginSubmit = useCallback(async values => {
        const auth = getAuth()
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
            history.push("/")
        } catch (e) {
            // Add better message handling here for UX
            setLoginFailed(true)
        }
    }, [history])

    useEffect(() => {
        setLoginFailed(false)
    }, [])

    return (
        <Container className={classes.content}>
            <div className={classes.toolbar} />
            <Paper 
                className={classes.paper}
                component={Container} 
                maxWidth="xs" 
                elevation={5}>
                {loginView ? 
                <Login classes={classes} handleLoginView={handleLoginView} handleLoginSubmit={handleLoginSubmit} authLogo={authLogo} history={history} loginFailed={loginFailed} /> 
                : <SignUp classes={classes} handleLoginView={handleLoginView} handleSignupSubmit={handleSignupSubmit} authLogo={authLogo} history={history} />}
            </Paper>
        </Container>
    )
}

export default Authenticate
