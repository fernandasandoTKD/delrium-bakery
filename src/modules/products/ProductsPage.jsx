import styles from './productsStyles.module.css'
import logo from '../../assets/logo.png'
export const ProductsPage = () => {
  return (
    <div>        
    <header className={styles.masthead}>
    <div className="container px-4 px-lg-5">
      <div className="row h-100 align-items-center">
        <div className="col-lg-6 text-center">
          <h1 className="text-uppercase text-light">DRERILIUM</h1>
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
  </header></div>
  )
}
