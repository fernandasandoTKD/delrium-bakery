import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { PiHandDuotone } from "react-icons/pi";
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';

export const NavbarPrivate = () => {
  const [show, setShow] = useState(true);
  const { auth, logout } = useAuth(); // Estado para controlar la visibilidad

  const offcanvasRef = useRef(null);

  const closeOffcanvas = () => {
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
    if (offcanvas) {
      offcanvas.hide();
    }
  };
  const handleLogout = () => {
    logout(); // Llama a la función de cierre de sesión
    closeOffcanvas(); // Cierra el offcanvas después de cerrar sesión
  };
  return (
    <div className= "container-fluid">
      <nav className="navbar bg-success fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img alt="" src={logo} width="60" height="60" className="d-inline-block align-top" />
          </a>
          <h4 className="text-white mt-2 d-none d-md-block">Tradición artesanal en productos de panadería y respostería.</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            ref={offcanvasRef} // Reference for the offcanvas
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hola, {auth.username}</h5>
              <PiHandDuotone className="fs-3" />
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/private/uclasses"
                    activeClassName="active"
                    onClick={closeOffcanvas} // Close on click
                  >
                    Clases y Talleres
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/private/shopping"
                    activeClassName="active"
                    onClick={closeOffcanvas} // Close on click
                  >
                    Compras
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                  </a>
                  <ul className="dropdown-menu">
                  <li>
                    <NavLink
                    className="dropdown-item"
                    to={`/private/profile/${auth.id}`}
                    activeClassName="active"
                    onClick={closeOffcanvas} // Close on click
                  >
                    Detalle
                  </NavLink></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
