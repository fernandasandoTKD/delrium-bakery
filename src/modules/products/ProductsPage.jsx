import React from 'react'
import styles from './productsStyles.module.css'
import logo from '../../assets/logo.png'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import torta from '../../assets/Products/torta.jpg'
import tortaGalletas from '../../assets/Products/tortaGalletas.jpg'
import panChocolate from '../../assets/Products/panChocolate.jpg'
import artesanal from '../../assets/Products/artesanal.jpg'
import cookies  from '../../assets/Products/cookies.png'
export const ProductsPage = () => {

  /* Anexo de lógica para enviar a la sección espeifica  */


  const handleClick = (id) => {
    const seccion = document.getElementById(id);
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div>
      <header className={styles.masthead}>
        <div className="container px-4 px-lg-5">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 text-center">
              <h1 className="text-uppercase text-light">DERILIUM</h1>
              <h2 className="text-white-50 mt-2 mb-5">Tradición artesanal en productos de panadería y respostería.</h2>
              <a className="btn btn-primary" href="#about">Get Started</a>
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
        <div className={`mb-5 ${styles.inputBox_container}`}>
          <svg className={styles.search_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
            <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
            </path>
          </svg>
          <input className={styles.inputBox} id="inputBox" type="text" placeholder="Search For Products" />
        </div>
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

      <div id="seccionTortas" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Tortas</h1>
        <hr className="hr" />
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={torta} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 1</h2>
                  <p className={styles.card__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex maxime quisquam eius laboriosam temporibus mollitia, expedita ullam et! Alias aspernatur eaque cupiditate reiciendis quam deleniti quis maiores consequatur ad at. </p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={torta} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 2</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={torta} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 3</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={torta} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 4</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="seccionPan" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Panes artesanales</h1>
        <hr className="hr" />
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={artesanal} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 1</h2>
                  <p className={styles.card__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex maxime quisquam eius laboriosam temporibus mollitia, expedita ullam et! Alias aspernatur eaque cupiditate reiciendis quam deleniti quis maiores consequatur ad at. </p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={artesanal} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 2</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={artesanal} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 2</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className={styles.card}>
                <Image src={artesanal} fluid rounded />
                <div className={styles.card__content}>
                  <h2 className={styles.card__title}>Title 2</h2>
                  <p className={styles.card__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, praesentium ipsam iusto repellendus rem numquam. Sunt ipsum tenetur quibusdam eos aspernatur at provident vero officia error nesciunt, aliquid vel placeat?</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="seccionGalletas" className="container d-flex flex-column align-items-center text-center py-5">
        <h1>Personaliza tus galletas</h1>
        <hr className="hr" />
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={12} md={4} lg={4} className="mb-4 d-flex justify-content-center">
            <Image src={cookies} fluid roundedCircle  />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} className="mb-4 d-flex justify-content-center">
              <div id={styles.checklist} className='bg-primary bg-gradient text-light'>
                <input  value="1" name="r" type="checkbox" id="01" />
                <label for="01">Bread</label>
                <input value="2" name="r" type="checkbox" id="02" />
                <label for="02">Cheese</label>
                <input value="3" name="r" type="checkbox" id="03" />
                <label for="03">Coffee</label>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} className="mb-4 d-flex justify-content-center">
              <div id={styles.checklist} className='bg-success bg-gradient text-light'>
                <input  value="4" name="r" type="checkbox" id="04" />
                <label for="04">Bread</label>
                <input value="5" name="r" type="checkbox" id="05" />
                <label for="05">Cheese</label>
                <input value="6" name="r" type="checkbox" id="06" />
                <label for="06">Coffee</label>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
