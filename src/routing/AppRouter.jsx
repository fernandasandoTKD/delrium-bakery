import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from '../assets/logo.png';
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { UsersPage } from "../modules/users/UsersPage";
import { Navbar, Nav ,Container} from 'react-bootstrap';
import { ProductsPage } from "../modules/products/ProductsPage";
import { QuotesPages } from "../modules/quotes/QuotesPages";
import { ClassesPages } from "../modules/classes/ClassesPages";
import { ErrorPage } from "../modules/error/ErrorPage";
import { useSelector } from 'react-redux';

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
  )
}