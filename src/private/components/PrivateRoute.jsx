// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const PrivateRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, auth } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(auth?.role)) {
        return <Navigate to="/private" />;
    }

    return element;
};

export default PrivateRoute;
