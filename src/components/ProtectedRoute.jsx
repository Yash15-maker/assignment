import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
