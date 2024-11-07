import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

//Configuration pour protéger les routes
const PrivateRoute = ({children}) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/auth/login"/>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
