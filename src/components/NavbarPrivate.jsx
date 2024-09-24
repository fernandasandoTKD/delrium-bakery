import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

export const NavbarPrivate = () => {
  const { user } = useAuth();


  return (
    <Navbar bg="success" variant="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/products">
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
            <Nav.Link as={NavLink} to='/products' className="text-light fs-5">Productos</Nav.Link>
            <Nav.Link as={NavLink} to='/shopping' className="text-light fs-5">Compras</Nav.Link>
            {/* {user.role === 'admin' && (
              <Nav.Link as={NavLink} to='/admin' className="text-light fs-5">Admin</Nav.Link>
            )} */}
            <Nav.Link as={NavLink} to="/about" className="text-light fs-5">Sobre nosotros</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
