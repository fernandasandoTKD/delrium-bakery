import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPage } from "../modules/products/ProductsPage";
import { ErrorPage } from "../modules/error/ErrorPage";
import { BlogPage } from "../modules/blog/BlogPage";
import { PostDetail } from "../modules/blog/sub_pages/PostDetail.jsx"
import { Authors } from "../modules/blog/sub_pages/Authors.jsx"
import { CreatePost } from "../modules/blog/sub_pages/CreatePost.jsx"
import { CategoryPosts } from "../modules/blog/sub_pages/CategoryPosts.jsx"
import { AuthorPosts } from "../modules/blog/sub_pages/AuthorPosts.jsx"
import { Dashboard } from "../modules/blog/sub_pages/Dashboard.jsx"
import { UserProfile } from "../modules/blog/sub_pages/UserProfile.jsx"
import { EditPost } from "../modules/blog/sub_pages/EditPost.jsx"
import { DeletePost } from "../modules/blog/sub_pages/DeletePost.jsx"
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { AuthProvider } from "../context/AuthProvider";
import PrivatePage from "../private/components/PrivatePage";
import PrivateRoute from "../private/components/PrivateRoute";
import { NavbarPublic } from "../components/NavbarPublic";
import { NavbarPrivate } from "../components/NavbarPrivate";
import useAuth from "../hooks/useAuth"; // Asegúrate de que este import esté correcto
import { Sidenavbar } from "../components/Sidenavbar.jsx";
import { Navigate } from 'react-router-dom';


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
  const { isAuthenticated, auth, logout } = useAuth();

  // Componente para rutas que requieren autenticación
  const PrivateRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(auth?.role)) {
      return <Navigate to="/" />;
    }
    return element;
  };

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
        {/* Rutas públicas */}
        <Route path='/' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/products' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/login' element={<div className="content"><Login /></div>} />
        <Route path='/blog' element={<div className="content"><BlogPage /></div>} />
        <Route path='/posts/:id' element={<div className="content"><PostDetail /></div>} />
        <Route path='/authors' element={<div className="content"><Authors /></div>} />
        <Route path='/post/categories/:category' element={<div className="content"><CategoryPosts /></div>} />

        {/* Rutas privadas (requieren autenticación) */}
        <Route path='/shopping' element={<PrivateRoute element={<div className="content"><ShoppingPage /></div>} />} />
        <Route path='/private' element={<PrivateRoute element={<div className="content"><PrivatePage /></div>} />} />
        <Route path='/create' element={<PrivateRoute element={<div className="content"><CreatePost /></div>} allowedRoles={['admin', 'user']} />} />
        <Route path='/posts/user/:id' element={<PrivateRoute element={<div className="content"><AuthorPosts /></div>} />} />
        <Route path='/myposts/:id' element={<PrivateRoute element={<div className="content"><Dashboard /></div>} />} />
        <Route path='/profile/:id' element={<PrivateRoute element={<div className="content"><UserProfile /></div>} />} />
        <Route path='/posts/:id/edit' element={<PrivateRoute element={<div className="content"><EditPost /></div>} allowedRoles={['admin', 'user']} />} />
        <Route path='/posts/:id/delete' element={<PrivateRoute element={<div className="content"><DeletePost /></div>} allowedRoles={['admin']} />} />

        {/* Ruta de error */}
        <Route path='*' element={<div className="content"><ErrorPage /></div>} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainContent;
