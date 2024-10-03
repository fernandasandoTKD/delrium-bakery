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
import {EditPost} from "../modules/blog/sub_pages/EditPost.jsx"
import {DeletePost} from "../modules/blog/sub_pages/DeletePost.jsx"
import {CreatePost} from '../modules/blog/sub_pages/CreatePost.jsx'
import {Authors} from '../modules/blog/sub_pages/Authors.jsx'
import { PublicClassView } from "../modules/classes/public/PublicClassView";
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPrivatePage } from '../private/products/ProductsPrivatePage.jsx';
import { UsersDetail } from '../private/users/UsersDetail.jsx';
import { Container } from 'react-bootstrap';
import ErrorPage from '../modules/error/ErrorPage.jsx';


export const AppRouter = () => {

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
    <Container fluid className="p-0 container-main">
      {isAuthenticated ? (
        <>
          {auth?.role === 'admin' ? <Sidenavbar /> : <NavbarPrivate />}
        </>
      ) : (
        <NavbarPublic />
      )}

      <Routes>
        <Route path="/products" element={<div className="content"><ProductsPage /></div>} />
        <Route path="/login" element={<div className="content"> <Login /></div>} />
        <Route path="/shopping" element={<div className="content"><ShoppingPage /></div>} />
        <Route path="/blog" element={<div className="content"><BlogPage /></div>} />
        <Route path='/posts/:id' element={<div className="content"><PostDetail /></div>} />
        <Route path='/authors' element={<div className="content"><Authors /></div>} />
        <Route path='/classes' element={<div className="content"><PublicClassView /></div>} />

       

        {/* Ruta para la página privada */}
        <Route path="/private" element={<div className='content'><PrivateRoute allowedRoles={['user', 'admin']} element={<PrivatePage />} /></div>}>
          <Route path="pclasses" element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<AdminView />} /></div> } />
          <Route path="users" element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<UsersPage />} /></div>} />
          <Route path='products' element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<ProductsPrivatePage />} /></div>} />
          <Route path="profile/:id" element={<div className='content'><PrivateRoute allowedRoles={['admin', 'user']} element={<UsersDetail />} /></div>} />
          <Route path="uclasses" element={<div className='content'><PrivateRoute allowedRoles={['user']} element={<CustomerView />} /></div>} />
          <Route path='shopping' element={<div className='content'><PrivateRoute allowedRoles={['user']} element={<ShoppingPage />} /></div>} />
          <Route path='blog' element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<BlogPage />} /></div>} />
          <Route path="posts/:id/edit" element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<EditPost />} /></div>} />
          <Route path='posts/:id/delete' element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<DeletePost />} /></div>} />
          <Route path='posts/create' element={<div className='content'><PrivateRoute allowedRoles={['admin']} element={<CreatePost />} /></div>} />
        </Route>

        <Route path="*" element={<div className='content'><ErrorPage /></div>} />
      </Routes>

      <Footer />
    </Container>
  );
};

export default AppRouter;
