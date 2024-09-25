import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { Navbar, Nav ,Container} from 'react-bootstrap';

export const NavbarPublic = () => {
  return (
    <div>
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
              <Nav.Link href='/login' className="text-light fs-5"></Nav.Link>
                <Nav.Link href='/shopping' className="text-light fs-5">Compras</Nav.Link>
                <Nav.Link href="/classes" className="text-light fs-5">Clases/Talleres</Nav.Link>
                <Nav.Link href="/about" className="text-light fs-5">Sobre nosotros</Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link href="/login" className="text-light fs-5">
                  <i className="fas fa-user" style={{ fontSize: '1.5rem' }}></i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Configurar rutas */}
    </div>
  )
}
