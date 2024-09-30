import React from 'react'
import styles from './componentsStyles.module.css'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            {/*    <!-- footer --> */}
            <footer className={`bg-success text-light ${styles.footer} `}>
                <p> © Delirium Bakery - Derechos reservados - 2024</p>
                <div>
                    <a href="https://github.com/fernandasandoTKD" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/lufe-diaz-s/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/luchis_taekwondo/" target="_blank"><i className="fa-brands fa-instagram-square"></i></a>
                </div>
            </footer>
        </div>
    )
}
