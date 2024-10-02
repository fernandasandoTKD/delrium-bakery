import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import { NavbarPublic } from "../components/NavbarPublic";
import { NavbarPrivate } from "../components/NavbarPrivate";
import { Sidenavbar } from "../components/Sidenavbar.jsx";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { ProductsPage } from "../modules/products/ProductsPage";
import { CustomerView } from '../private/classes/privateUser/CustomerView';
import { AdminView } from '../private/classes/privateAdmin/AdminView';
import { AuthProvider } from '../context/AuthProvider';
import PrivateRoute from '../private/components/PrivateRoute.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivatePage } from '../private/components/PrivatePage.jsx';
import UsersPage from '../private/users/UsersPage.jsx';
import { BlogPage } from "../modules/blog/BlogPage";
import { PostDetail } from "../modules/blog/sub_pages/PostDetail.jsx";
import { PublicClassView } from "../modules/classes/public/PublicClassView";
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPrivatePage } from '../private/products/ProductsPrivatePage.jsx';
import { UsersDetail } from '../private/users/UsersDetail.jsx';
import { Container } from 'react-bootstrap';
import ErrorPage from '../modules/error/ErrorPage.jsx';


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
  const { isAuthenticated, auth, setAuth, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        const userData = JSON.parse(user);
        setAuth(userData);
        setIsAuthenticated(true);
        // Redirigir según el rol del usuario
        navigate(userData.role === 'admin' ? '/private/pclasses' : '/private/uclasses');
    } else {
        setIsAuthenticated(false);
    }
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <Container fluid className="p-0">
      {isAuthenticated ? (
        <>
          {auth?.role === 'admin' ? <Sidenavbar /> : <NavbarPrivate />}
        </>
      ) : (
        <NavbarPublic />
      )}

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/blog" element={<div className="content"><BlogPage /></div>} />
        <Route path='/posts/:id' element={<div className="content"><PostDetail /></div>} />
        <Route path='/classes' element={<div className="content"><PublicClassView /></div>} />

       

        {/* Ruta para la página privada */}
        <Route path="/private" element={<PrivateRoute allowedRoles={['user', 'admin']} element={<PrivatePage />} />}>
          <Route path="pclasses" element={<PrivateRoute allowedRoles={['admin']} element={<AdminView />} />} />
          <Route path="users" element={<PrivateRoute allowedRoles={['admin']} element={<UsersPage />} />} />
          <Route path='products' element={<PrivateRoute allowedRoles={['admin']} element={<ProductsPrivatePage />} />} />
          <Route path="profile/:id" element={<PrivateRoute allowedRoles={['admin', 'user']} element={<UsersDetail />} />} />
          <Route path="uclasses" element={<PrivateRoute allowedRoles={['user']} element={<CustomerView />} />} />
          <Route path='shopping' element={<PrivateRoute allowedRoles={['user']} element={<ShoppingPage />} />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </Container>
  );
};

export default AppRouter;
