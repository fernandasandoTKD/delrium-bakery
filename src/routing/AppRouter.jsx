

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
import {PrivatePage} from '../private/components/PrivatePage.jsx';
import UsersPage from '../private/users/UsersPage.jsx';
import {BlogPage} from "../modules/blog/BlogPage";
import {PostDetail} from "../modules/blog/sub_pages/PostDetail.jsx"
import { PublicClassView } from "../modules/classes/public/PublicClassView"
import ShoppingPage from "../modules/shopping/ShoppingPage";


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
  const { isAuthenticated, auth, setAuth,setIsAuthenticated  } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      const userData = JSON.parse(user);
      setAuth(userData);

      // Si el usuario ya está autenticado, redirigir según su rol
      if (!isAuthenticated) {
        navigate(userData.role === 'admin' ? '/private/pclasses' : '/private/uclasses');
      }
      /* else {
        // Si no hay token, no está autenticado
        setIsAuthenticated(false);
      } */
    }
  }, []);  // Se asegura de que isAuthenticated y auth estén listos antes de la redirección

  return (

      <>
      
          {isAuthenticated ? (
              <>
                  {auth?.role === 'admin' ? <Sidenavbar/> : <NavbarPrivate />}
              </>
          ) : (
              <NavbarPublic />
          )}

          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<div className="content"><BlogPage/></div>}></Route>
            <Route path='/posts/:id' element={<div className="content">< PostDetail/></div>}></Route>
            <Route path='/classes' element={<div className="content">< PublicClassView/></div>}></Route>
            <Route path='/shopping' element={<div className="content">< ShoppingPage/></div>}></Route>

            {/* Ruta para la página privada */}
            <Route path="/private" element={<div className="content"><PrivateRoute allowedRoles={['user', 'admin']} element={<PrivatePage />} /></div>}>
                <Route path="pclasses" element={<PrivateRoute allowedRoles={['admin']} element={<AdminView />} />} />
                <Route path="users" element={<PrivateRoute allowedRoles={['admin']} element={< UsersPage/>} />} />
                <Route path="uclasses" element={<PrivateRoute allowedRoles={['user']} element={<CustomerView />} />} />
            </Route>

            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>

          <Footer />
      </>
  );
};


export default AppRouter;

