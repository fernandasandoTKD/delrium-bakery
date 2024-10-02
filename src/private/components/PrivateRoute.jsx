import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, auth } = useAuth();

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/products" />;
    } 

    // Si está autenticado pero no tiene el rol permitido, redirige a products
    if (allowedRoles && !allowedRoles.includes(auth?.role)) {
        return <Navigate to="/products" />;
    }

    return element; // Si tiene el rol correcto, renderiza el elemento
};

export default PrivateRoute;
