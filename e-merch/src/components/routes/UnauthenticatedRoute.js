import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from "../../firebase";


const UnauthenticatedRoute = ({ component: C, ...props }) => {
    const { user } = useAuthState()

    return (
        <Route
        {...props}
        render={routeProps =>
            !user ? <C {...routeProps} /> : <Redirect to="/tabp-clothing" /> 
        }
        />
    )
};

export default UnauthenticatedRoute
