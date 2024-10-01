import logo from '../assets/logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const NavbarPublic = () => {
  return (
    <div>
      {/* Menú de Navegación */}
      <Navbar bg="success" variant="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/products">
            <img
              alt="logo"
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
              <Nav.Link href='/shopping' className="text-light fs-5">Compras</Nav.Link>
              <Nav.Link href="/classes" className="text-light fs-5">Clases/Talleres</Nav.Link>
              <Nav.Link href="/blog" className="text-light fs-5">Blog</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/login" className="text-light fs-5">
                <i className="fas fa-user" style={{ fontSize: '1.5rem' }}></i> Iniciar Sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
