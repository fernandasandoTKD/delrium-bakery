

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Asegúrate de que la ruta sea correcta
import { NavbarPublic } from "../components/NavbarPublic";
import { NavbarPrivate } from "../components/NavbarPrivate";
import { Sidenavbar } from "../components/Sidenavbar.jsx";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { ProductsPage } from "../modules/products/ProductsPage";
import { CustomerView } from '../private/classes/privateUser/CustomerView';// Componente para usuarios
import {AdminView} from '../private/classes/privateAdmin/AdminView';
import { AuthProvider } from '../context/AuthProvider';
import PrivateRoute from '../private/components/PrivateRoute.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivatePage from '../private/components/PrivatePage.jsx';


const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

const MainContent = () => {
  const { isAuthenticated, auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && auth?.role) {
      // Asegurarse de que el estado de autenticación esté listo antes de redirigir
      if (auth.role === 'admin') {
        navigate('/private/pclasses');
      } else if (auth.role === 'user') {
        navigate('/private/uclasses');
      }
    }
  }, [isAuthenticated, auth, navigate]);  // Se asegura de que isAuthenticated y auth estén listos antes de la redirección

  return (

      <>
      
          {isAuthenticated ? (
              <>
                  {auth?.role === 'admin' ? <Sidenavbar /> : <NavbarPrivate />}
                  <button onClick={logout}>Logout</button>
              </>
          ) : (
              <NavbarPublic />
          )}

          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<Login />} />

            {/* Ruta para la página privada */}
            <Route path="/private" element={<PrivateRoute allowedRoles={['user', 'admin']} element={<PrivatePage />} />}>
                <Route path="pclasses" element={<PrivateRoute allowedRoles={['admin']} element={<AdminView />} />} />
                <Route path="uclasses" element={<PrivateRoute allowedRoles={['user']} element={<CustomerView />} />} />
            </Route>

            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>

          <Footer />
      </>
  );
};


export default AppRouter;

