import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from '../assets/logo.png';
import { useContext } from "react";
import { ShoppingPage } from "../modules/shopping/ShoppingPage";
import { UsersPage } from "../modules/users/UsersPage";
import { NavLink } from "react-router-dom";
import { Navbar, Nav ,Container} from 'react-bootstrap';
import { ProductsPage } from "../modules/products/ProductsPage";
import { QuotesPages } from "../modules/quotes/QuotesPages";
import { ClassesPages } from "../modules/classes/ClassesPages";
import { ErrorPage } from "../modules/error/ErrorPage";
import {BlogPage} from "../modules/blog/BlogPage";
import {PostDetail} from "../modules/blog/sub_pages/PostDetail.jsx"
import {Authors} from "../modules/blog/sub_pages/Authors.jsx"
import {CreatePost} from  "../modules/blog/sub_pages/CreatePost.jsx"
import {CategoryPosts} from "../modules/blog/sub_pages/CategoryPosts.jsx"
import {AuthorPosts} from "../modules/blog/sub_pages/AuthorPosts.jsx"
import {Dashboard} from "../modules/blog/sub_pages/Dashboard.jsx"
import {EditPost} from "../modules/blog/sub_pages/EditPost.jsx"
import {DeletePost} from "../modules/blog/sub_pages/DeletePost.jsx"

export const AppRouter = () => {

  /* const {user, setUser} =useContext(Context); */
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
                <Nav.Link href='/users' className="text-light fs-5">Usuarios</Nav.Link>
                <Nav.Link href='/shopping' className="text-light fs-5">Compras</Nav.Link>
                <Nav.Link href='/quotes' className="text-light fs-5">Cotizaciones</Nav.Link>
                <Nav.Link href='/classes' className="text-light fs-5">Clases</Nav.Link>
                <Nav.Link href="/about" className="text-light fs-5">Sobre nosotros</Nav.Link>
                <Nav.Link href="/blog" className="text-light fs-5">Blog</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Configurar rutas */}
      <Routes>
          <Route path='/' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/shopping' element={<div className="content"><ShoppingPage /></div>}></Route>
          <Route path='/users' element={<div className="content">< UsersPage/></div>}></Route>
          <Route path='/products' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/classes' element={<div className="content">< ClassesPages/></div>}></Route>
          <Route path='/quotes' element={<div className="content">< QuotesPages/></div>}></Route>
          <Route path='/blog' element={<div className="content">< BlogPage/></div>}></Route>
          <Route path='/posts/:id' element={<div className="content">< PostDetail/></div>}></Route>
          <Route path='/authors' element={<div className="content">< Authors/></div>}></Route>
          <Route path='/create' element={<div className="content">< CreatePost/></div>}></Route>
          <Route path='/post/categories/:category' element={<div className="content">< CategoryPosts/></div>}></Route>
          <Route path='/posts/user/:id' element={<div className="content"><AuthorPosts/></div>}></Route>
          <Route path='/myposts/:id' element={<div className="content"><Dashboard/></div>}></Route>
          <Route path='/posts/:id/edit' element={<div className="content">< EditPost/></div>}></Route>
          <Route path='/posts/:id/delete' element={<div className="content">< DeletePost/></div>}></Route>

          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
    </Router>
  )
}