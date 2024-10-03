import React from 'react'
import styles from './productsStyles.module.css'
import logo from '../../assets/logo.png'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import torta from '../../assets/Products/torta.jpg'
import tortaGalletas from '../../assets/Products/tortaGalletas.jpg'
import panChocolate from '../../assets/Products/panChocolate.jpg'
import artesanal from '../../assets/Products/artesanal.jpg'
import cookies from '../../assets/Products/cookies.jpg'
import { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { useNavigate } from 'react-router-dom';
import pan from '../../assets/Products/pan.jpg'
import tortaRender from '../../assets/Products/tortaRender.jpg'
import Swal from 'sweetalert2';




export const ProductsPage = () => {

  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/classes');
  };

  const handleRedirectBuyHere = () => {
    navigate('/shopping');
  };

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

  const handlePersonalizarClick = () => {
    Swal.fire({
      title: 'Lo sentimos',
      text: 'Tenemos muchos pedidos en este momento. Gestiona el tuyo por WhatsApp.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '<a href="https://api.whatsapp.com/send?phone=%2B573214059115&app=facebook&entry_point=page_cta&fbclid=IwY2xjawFq67JleHRuA2FlbQIxMAABHdlbR4R1Na2ekucdkEHknrZaD__u0YuBLL1Pr8Gx3JKpkjcUlO6dBJzDvw_aem_Y1phSEw5nSNymZMeziOZ_w" target="_blank" style="color:white; text-decoration:none;"><i class="fab fa-whatsapp"></i> Ir a WhatsApp</a>',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#25D366', // Color del botón de WhatsApp
    });
  };



  return (
    <div>
      <header className={styles.masthead}>
      <div className="container px-4 px-lg-5">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 text-center">
              <h1 className="text-uppercase text-light">DELIRIUM BAKERY</h1>
              <h2 className="text-white-50 mt-2 mb-5">Tradición artesanal en productos de panadería y pastelería.</h2>
              <a className="btn btn-primary" onClick={handleRedirectBuyHere} >Compra acá</a>
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
            <button className={`btn btn-primary ${styles.overlayButton}`} onClick={handleRedirect} >Talleres</button>
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
              .filter(producto => producto?.category?.name === 'reposteria') // Filtra los productos por categoría
              .map((producto, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <div className={styles.card}>
                  <Image src={tortaRender} fluid rounded /> {/* Asegúrate de que tu API retorne la URL de la imagen */}
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
              .filter(producto => producto?.category?.name === 'panes artesanales') // Filtra los productos por categoría
              .map((producto, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <div className={styles.card}>
                  <Image src={pan} fluid rounded />
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
              .filter(producto => producto?.category?.name === 'galletas') // Filtra los productos por categoría
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
                  <span>Hallowen</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="categoria" />
                  <span>Amor y amistad</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="categoria" />
                  <span>Empresariales</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="categoria" />
                  <span>Baby shower</span>
                </label>

                <br />
                <label>
                  <input type="radio" name="categoria" />
                  <span>Cumpleaños</span>
                </label>
              </div>

              {/* Columna 2: Glaseados */}
              <div className="col-md-4 p-3 border rounded">
                <h4>Glaseados</h4>
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Real</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Azucarado</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Manquequilla</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Chococlate</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="glaseado" />
                  <span>Espejo</span>
                </label>
              </div>

              {/* Columna 3: Tipo de Galleta */}
              <div className="col-md-4 p-3 border rounded">
                <h4>Tipo de Galleta</h4>
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Mantequilla</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Macarons</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Avena y pasas</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Almendra</span>
                </label>
                <br />
                <label>
                  <input type="radio" name="tipoGalleta" />
                  <span>Jengibre</span>
                </label>
              </div>
              
            </div>
            {/* Botón Personalizar */}
            <div className="d-flex justify-content-center mt-4">
              <button type="button" className="btn btn-success btn-lg" onClick={handlePersonalizarClick}>
                Personalizar
              </button>
            </div>
          </form>
        </Container>


      </div>
    </div>
  );
};
