import { useCallback, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore/lite';
import db from '../../../firebase';
import useStyles from './styles';
import { Container, Paper } from '@material-ui/core';
import SignUp from './SignUp';
import Login from './Login';
import authLogo from './../../../assets/tabp-black-on-transparent.png';

const Authenticate = () => {
    const classes = useStyles()
    const [loginView, setLoginView] = useState(false)

    // Login/Sign up view handler
    const handleLoginView = (isLogin) => {
        setLoginView(isLogin)
    }

    // Submit handlers
    const handleSignupSubmit = useCallback(async e => {
        e.preventDafault()

        const { email, password } = e.target.elements
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(cred => {
                const usersCol = doc(collection(db, 'users'), cred.id)
                const usersRef = getDoc(usersCol)
                console.log('ang user', usersRef.data())
            }).then((data) => {
                // This will execute after the first promise is resolved. Get sign up instance and reset the sign up form
                console.log('ang data', data)
            }).catch(e => {
                alert(e.message)
            })
    }, [])

    const handleLoginSubmit = useCallback(async e => {
        e.preventDafault()

        const { email, password } = e.target.elements
        const auth = getAuth()
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
        } catch (e) {
            // Add better message handling here for UX
            alert(e.message)
        }
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
                <Login classes={classes} handleLoginView={handleLoginView} handleLoginSubmit={handleLoginSubmit} authLogo={authLogo} /> 
                : <SignUp classes={classes} handleLoginView={handleLoginView} handleSignupSubmit={handleSignupSubmit} authLogo={authLogo} />}
            </Paper>
        </Container>
    )
}

export default Authenticate
