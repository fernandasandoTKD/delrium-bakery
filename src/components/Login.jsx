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

    const { setAuth } = useAuth();
    const containerRef = useRef(null);
    const [isRegister, setIsRegister] = useState(false);

    // Hook para redirigir a la página de la red social
    const navigate = useNavigate();

		// Monitorear cambios en logged
    useEffect(() => {
        console.log("Logged state changed:", logged);
    }, [logged]);

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

        if (data.message === "Inicio de sesión exitoso") {
            if (data.token && data.user) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setAuth(data.user);  // Establece la autenticación
                setLogged("logged");  // Cambia el estado a "logged"
                resetForm();

                setTimeout(() => {
                    navigate("/private");
                }, 1000);
            } else {
                console.error("Token o usuario no recibido correctamente.");
            }
        } else {
            setLogged("error");
        }
    };

    const handleRegisterClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.add(styles.active);
        }
        setIsRegister(true)
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