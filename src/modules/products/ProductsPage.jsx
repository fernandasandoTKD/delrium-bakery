import React from 'react'
import styles from './productsStyles.module.css'
import logo from '../../assets/logo.png'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import torta from '../../assets/Products/torta.jpg'
import tortaGalletas from '../../assets/Products/tortaGalletas.jpg'
import panChocolate from '../../assets/Products/panChocolate.jpg'
import artesanal from '../../assets/Products/artesanal.jpg'
import cookies from '../../assets/Products/cookies.png'
import { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';



export const ProductsPage = () => {

  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    // Realiza la petición GET a tu API para obtener los productos
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${Global.url}products/products`); // Reemplaza con la URL de tu API
        const data = await response.json();
        if (data.status === "success") {
          setProductos(data.data); // Asignar los productos desde la respuesta
        } else {
          console.error('Error en la respuesta:', data);
        }      
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleClick = (id) => {
    const seccion = document.getElementById(id);
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
    setCategoriaSeleccionada(id); // Establece la categoría seleccionada
  };



  return (
    <div>
      <header className={styles.masthead}>
      <div className="container px-4 px-lg-5">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 text-center">
              <h1 className="text-uppercase text-light">DERILIUM</h1>
              <h2 className="text-white-50 mt-2 mb-5">Tradición artesanal en productos de panadería y respostería.</h2>
              <a className="btn btn-primary" href="#about">Compra acá</a>
            </div>
            <div className="col-lg-4 d-flex justify-content-end">
              <img
                src={logo}
                width="200"
                height="auto"
                alt="Logo"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container text-center pt-5">
        {/* Botones para seleccionar categorías */}
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center"><Image src={torta} fluid className={styles.moveRay} rounded />
            <button className={`btn btn-success ${styles.overlayButton}`} onClick={() => handleClick('seccionTortas')} >Tortas</button>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center"><Image src={artesanal} fluid className={styles.moveRay} rounded />
            <button className={`btn btn-primary ${styles.overlayButton}`} onClick={() => handleClick('seccionPan')}>Pan artesanal</button>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center"><Image src={tortaGalletas} fluid className={styles.moveRay} rounded />
            <button className={`btn btn-success ${styles.overlayButton}`} onClick={() => handleClick('seccionGalletas')}>Galletas</button>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center"><Image src={panChocolate} fluid className={styles.moveRay} rounded />
            <button className={`btn btn-primary ${styles.overlayButton}`} >Talleres</button>
          </Col>
        </Row>
      </div>

      {/* Sección de Tortas */}
      <div id="seccionTortas" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Tortas</h1>
        <hr className="hr" />
        <Container className="pt-5">
          <Row className="justify-content-center">
            {productos
              .filter(producto => producto.category.name === 'reposteria') // Filtra los productos por categoría
              .map((producto, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <div className={styles.card}>
                  <Image src={torta} fluid rounded /> {/* Asegúrate de que tu API retorne la URL de la imagen */}
                    <div className={styles.card__content}>
                      <h2 className={styles.card__title}>{producto.name}</h2>
                      <p className={styles.card__description}>{producto.description}</p>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>

      {/* Sección de Panes Artesanales */}
      <div id="seccionPan" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Panes artesanales</h1>
        <hr className="hr" />
        <Container className="pt-5">
          <Row className="justify-content-center">
            {productos
              .filter(producto => producto.category.name === 'panes artesanales') // Filtra los productos por categoría
              .map((producto, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <div className={styles.card}>
                  <Image src={panChocolate} fluid rounded />
                    <div className={styles.card__content}>
                    <h2 className={styles.card__title}>{producto.name}</h2>
                    <p className={styles.card__description}>{producto.description}</p>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>

      {/* Sección de Galletas */}
      <div id="seccionGalletas" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Galletas</h1>
        <hr className="hr" />
        <Container className={styles.container}>
          <Row className="justify-content-center">
            {productos
              .filter(producto => producto.category.name === 'galletas') // Filtra los productos por categoría
              .map((producto, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <div className={styles.card}>
                  <Image src={cookies} fluid rounded />
                    <div className={styles.card__content}>
                    <h2 className={styles.card__title}>{producto.name}</h2>
                    <p className={styles.card__description}>{producto.description}</p>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>

        <h1>Personaliza tus galletas</h1>
        <hr className="hr" />

        <Container className={styles.container}>
          <form className="w-100">
            <div className="row justify-content-center">
              {/* Columna 1: Categorías */}
              <div className="col-md-4 p-3 border rounded">
                <h4>Categorías</h4>
                <label>
                  <input type="radio" name="categoria" />
                  <span>Opción 1</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="categoria" />
                  <span>Opción 2</span>
                </label>
              </div>

              {/* Columna 2: Glaseados */}
              <div className="col-md-4 p-3 border rounded">
                <h4>Glaseados</h4>
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Glaseado 1</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Glaseado 2</span>
                </label>
              </div>

              {/* Columna 3: Tipo de Galleta */}
              <div className="col-md-4 p-3 border rounded">
                <h4>Tipo de Galleta</h4>
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Galleta 1</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Galleta 2</span>
                </label>
              </div>
            </div>
            {/* Botón Personalizar */}
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-success btn-lg">
                Personalizar
              </button>
            </div>
          </form>
        </Container>


      </div>
    </div>
  );
};
