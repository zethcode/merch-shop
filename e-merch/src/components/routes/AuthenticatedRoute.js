import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../../firebase";

  // Authentication
const AuthenticatedRoute = ({ component: Component, ...props }) => {
    const { user } = useAuthState()

    return (
        <Route 
            {...props}
            render={routeProps =>
                user ? <Component {...routeProps} /> : <Redirect to="/tabp-clothing/signin" />}
        />
    )
};

export default AuthenticatedRoute