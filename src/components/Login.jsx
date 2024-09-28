import React, { useRef, useState, useEffect } from 'react';
import styles from './componentsStyles.module.css';
import { Register } from './Register';
import { useForm } from '../hooks/useForm';
import { Global } from '../helpers/Global';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { form, changed, resetForm } = useForm({ email: "", password: "" });
    const [logged, setLogged] = useState("not logged");
    const { setAuth, setIsAuthenticated } = useAuth();
    const containerRef = useRef(null);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

/*       // Usar useEffect para redirigir si ya hay un token en localStorage
      useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
    
        if (token && user) {
          const userData = JSON.parse(user);
          setAuth(userData);
          navigate(userData.role === 'admin' ? '/private/pclasses' : '/private/uclasses');
        }
      }, [navigate, setAuth]); */


    const loginUser = async (e) => {
        e.preventDefault();

        let userToLogin = form;
        const request = await fetch(Global.url + "auth/login", {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await request.json();

        if (data.message === "Inicio de sesión exitoso" && data.token && data.user) {
            // Guardar token y usuario en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            // Actualizar el estado de autenticación
            setAuth(data.user);
            setIsAuthenticated(true);

            setLogged("logged");
            resetForm();

            navigate(data.user.role === 'admin' ? '/private/pclasses' : '/private/uclasses');


        } else {
            setLogged("error");
        }
    };

    const handleRegisterClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.add(styles.active);
        }
        setIsRegister(true);
    };

    const handleLoginClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.remove(styles.active);
        }
        setIsRegister(false);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {/* Formulario de Inicio de Sesión */}
            {!isRegister && (
                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    {logged == "logged" ? (
                        <strong className='alert alert-success'>!Usuario autenticado correctamente¡</strong>
                    ) : ''}
                    {logged == "error" ? (
                        <strong className='alert alert-danger'>¡Verifica tus credenciales!</strong>
                    ) : ''}
                    <form onSubmit={loginUser}>
                        <h1>Sign In</h1>
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
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={changed}
                                autoComplete="email"
                                placeholder='Email'
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={changed}
                                autoComplete="current-password"
                                placeholder='Contraseña'
                            />
                        </div>
                        <button type="submit">Ingresa</button>
                    </form>
                </div>
            )}

            {/* Componente de Registro */}
            {isRegister && <Register />}

            {/* Panel de Transición */}
            <div className={styles.toggleContainer}>
                <div className={styles.toggle}>
                    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>Ingresa tus datos personales para utilizar todas las funciones del sitio</p>
                        <button className={styles.hidden} onClick={handleLoginClick}>Ingresa</button>
                    </div>
                    <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                        <h1>¡Hola, Amigo!</h1>
                        <p>Regístrate con tus datos personales para utilizar todas las funciones del sitio</p>
                        <button className={styles.hidden} onClick={handleRegisterClick}>Regístrate</button>
                    </div>
                </div>
            </div>
        </div>
    );
};