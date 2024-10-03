import React from 'react'
import styles from './componentsStyles.module.css'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            {/*    <!-- footer --> */}
            <footer className={`bg-success text-light ${styles.footer} `}>
                <p> © Delirium Bakery - Derechos reservados - 2024</p>
                <div>
                    <a href="https://www.facebook.com/share/MwoSsCNbxrbFc55w/?mibextid=qi2Omg" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://api.whatsapp.com/send?phone=%2B573214059115&app=facebook&entry_point=page_cta&fbclid=IwY2xjawFq67JleHRuA2FlbQIxMAABHdlbR4R1Na2ekucdkEHknrZaD__u0YuBLL1Pr8Gx3JKpkjcUlO6dBJzDvw_aem_Y1phSEw5nSNymZMeziOZ_w" target="_blank"><i className="fa-brands fa-whatsapp"></i></a>
                    <a href="https://www.instagram.com/deliriumbakery_?igsh=YXp6eWN3djY1MGg2" target="_blank"><i className="fa-brands fa-instagram-square"></i></a>
                </div>
            </footer>
        </div>
    )
}
