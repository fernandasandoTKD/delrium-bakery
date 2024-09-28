<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from '../assets/logo.png';
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { UsersPage } from "../modules/users/UsersPage";
import { Navbar, Nav ,Container} from 'react-bootstrap';
=======
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import ShoppingPage from "../modules/shopping/ShoppingPage";
>>>>>>> ba09ffd43a8fa5ef09f30a007117b86f07033eb2
import { ProductsPage } from "../modules/products/ProductsPage";
import { ErrorPage } from "../modules/error/ErrorPage";
import {BlogPage} from "../modules/blog/BlogPage";
import {PostDetail} from "../modules/blog/sub_pages/PostDetail.jsx"
import {Authors} from "../modules/blog/sub_pages/Authors.jsx"
import {CreatePost} from  "../modules/blog/sub_pages/CreatePost.jsx"
import {CategoryPosts} from "../modules/blog/sub_pages/CategoryPosts.jsx"
import {AuthorPosts} from "../modules/blog/sub_pages/AuthorPosts.jsx"
import {Dashboard} from "../modules/blog/sub_pages/Dashboard.jsx"
import {UserProfile} from "../modules/blog/sub_pages/UserProfile.jsx"
import {EditPost} from "../modules/blog/sub_pages/EditPost.jsx"
import {DeletePost} from "../modules/blog/sub_pages/DeletePost.jsx"
import { NavbarPublic } from "../components/NavbarPublic";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { AuthProvider, useAuth } from "../context/AuthContext";
/* import PrivateRoute from "../private/components/PrivateRoute"; */

import { PublicClassView } from "../modules/classes/public/PublicClassView"
import { CustomerView } from "../private/classes/privateUser/CustomerView";
import { AdminView } from "../private/classes/privateAdmin/AdminView";



<<<<<<< HEAD
export const AppRouter = () => {
  const state = useSelector((state) => state); // Log the entire state
  console.log(state); // Check the structure of the state

  const userPermissions = state.permissions.userPermissions; // Asegúrate de que esta ruta sea correcta

  return (
    <Router>
      {/* Menú de Navegación */}
      <Navbar bg="success" variant="ligth" expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/products">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href='/products' className="text-light fs-5">Productos</Nav.Link>
                {userPermissions.includes('view_users') && ( // Solo muestra si el usuario tiene permiso
                  <Nav.Link href='/users' className="text-light fs-5">Usuarios</Nav.Link>
                )}
                {userPermissions.includes('view_quotes') && ( // Solo muestra si el usuario tiene permiso
                  <Nav.Link href='/quotes' className="text-light fs-5">Cotizaciones</Nav.Link>
                )}
                <Nav.Link href='/shopping' className="text-light fs-5">Compras</Nav.Link>
                <Nav.Link href='/classes' className="text-light fs-5">Clases</Nav.Link>
                <Nav.Link href="/about" className="text-light fs-5">Sobre nosotros</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Configurar rutas */}
      <Routes>
          <Route path='/' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/shopping' element={<div className="content"><ShoppingPage /></div>}></Route>
          {userPermissions.includes('view_users') && (
            <Route path='/users' element={<div className="content">< UsersPage/></div>}></Route>
          )}
          <Route path='/products' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/classes' element={<div className="content">< ClassesPages/></div>}></Route>
          {userPermissions.includes('view_quotes') && (
            <Route path='/quotes' element={<div className="content">< QuotesPages/></div>}></Route>
          )}
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
    </Router>
=======
  return (

      <AuthProvider>
        <Router>
      {/* Componentes rutas publicas */}
      <NavbarPublic />
      <Routes>
          <Route path='/' element={<div className="content"><ProductsPage /></div>}></Route>
        {/*   <Route path='/shopping' element={<PrivateRoute element={<div className="content"><ShoppingPage /></div>} />} /> */}
          <Route path='/products' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/shopping' element={<div className="content">< ShoppingPage/></div>}></Route>
          <Route path='/classes' element={<div className="content">< PublicClassView/></div>}></Route>
          <Route path='/login' element={<div className="content">< Login/></div>}></Route>
          <Route path="/blog" element={<div className="content"><BlogPage/></div>}></Route>
          <Route path='/posts/:id' element={<div className="content">< PostDetail/></div>}></Route>
          <Route path='/authors' element={<div className="content">< Authors/></div>}></Route>
          <Route path='/create' element={<div className="content">< CreatePost/></div>}></Route>
          <Route path='/post/categories/:category' element={<div className="content">< CategoryPosts/></div>}></Route>
          <Route path='/posts/user/:id' element={<div className="content"><AuthorPosts/></div>}></Route>
          <Route path='/myposts/:id' element={<div className="content"><Dashboard/></div>}></Route>
          <Route path='/profile/:id' element={<div className="content"><UserProfile d/></div>}></Route>
          <Route path='/posts/:id/edit' element={<div className="content">< EditPost/></div>}></Route>
          <Route path='/posts/:id/delete' element={<div className="content">< DeletePost/></div>}></Route>
          <Route path='*' element={<div className="content"> <ErrorPage /></div>}></Route>
          <Route path='/uclasses' element={<div className="content">< CustomerView/></div>}></Route>
          <Route path='/pclasses' element={<div className="content">< AdminView/></div>}></Route>
      </Routes>
      <Footer/>
     </Router>
      </AuthProvider>
    
>>>>>>> ba09ffd43a8fa5ef09f30a007117b86f07033eb2
  )
}