import React, { useRef } from 'react';
import styles from './componentsStyles.module.css'

export const Login = () => {
    const containerRef = useRef(null);

  const handleRegisterClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add(styles.active);
    }
  };

  const handleLoginClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove(styles.active);
    }
  };

  return (
    <div className="container">
      <div className={styles.container} ref={containerRef}>
      {/* Formulario de Inicio de Sesión */}
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form>
          <h1>Sign I</h1>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" style={{ color: '#4267B2' }}></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x" style={{ color: '#E1306C' }}></i>
            </a>
          </div>
          <span>Usa tu email y contraseña</span>
          <div className="mb-3">
            <input type="email" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="button">ingresa</button>
        </form>
      </div>

      {/* Formulario de Registro */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form>
          <h1>Crear Cuenta</h1>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" style={{ color: '#4267B2' }}></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x" style={{ color: '#E1306C' }}></i>
            </a>
          </div>
          <span>Utiliza tu email para registrarte...</span>
          <div className="mb-3">
            <input type="text" placeholder="Nombre Completo" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="button">Registrate</button>
        </form>
      </div>

      {/* Panel de Transición */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Ingresa tus datos personales para utilizar todas las funciones del sitio</p>
            <button className={styles.hidden} onClick={handleLoginClick}>ingresa</button>
          </div>
          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>¡Hola, Amigo!</h1>
            <p>Regístrate con tus datos personales para utilizar todas las funciones del sitio</p>
            <button className={styles.hidden} onClick={handleRegisterClick}>registrate</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}
