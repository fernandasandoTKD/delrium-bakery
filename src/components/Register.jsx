import React, { useRef, useState } from 'react';
import styles from './componentsStyles.module.css';
import { Global } from '../helpers/Global';
import { useForm } from '../hooks/useForm';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Register = () => {
    const { form, changed } = useForm({});
    // Estado para mostrar resultado del registro del user
    const [saved, setSaved] = useState("not sended");
    // Hook para redirigir
    const navigate = useNavigate();

    // Referencia al contenedor
    const containerRef = useRef(null);

    // Guardar un usuario en la BD
    const saveUser = async (e) => {
        // Prevenir que se actualice la pantalla
        e.preventDefault();

        // Obtener los datos del formulario
        let newUser = form;

        // Petición a la API del Backend para guardar usuario en la BD
        const request = await fetch(Global.url + "auth/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Obtener la información retornada por la request
        const data = await request.json();

        // Verificar si el estado de la respuesta del backend es "created" 
        if (request.status === 201) {
            // Mostrar modal de éxito
            Swal.fire({
                title: data.message,
                icon: "success",
                confirmButtonText: "Continuar",
            }).then(() => {
                // Redirigir después de cerrar el modal
                navigate("/login");
            });
            setSaved("saved");

        } else {
            setSaved("error");

            // Mostrar modal de error
            Swal.fire({
                title: data.message || "¡Error en el registro!",
                icon: "error",
                confirmButtonText: "Intentar nuevamente",
            });
        }
    };

  

    return (
        <div className="container">
                {/* Formulario de Registro */}
                <div className={`${styles.formContainer} ${styles.signUp}`}>
                    <form onSubmit={saveUser}>
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
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                onChange={changed}
                                value={form.username || ""}
                                autoComplete="given-name"
                                placeholder='Username'
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                onChange={changed}
                                value={form.email || ''}
                                autoComplete="email"
                                placeholder='Email'
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                onChange={changed}
                                value={form.password || ''}
                                autoComplete="new-password"
                                placeholder='Contraseña'
                            />
                        </div>
                        <button type="submit">Regístrate</button>
                    </form>
                </div>
            </div>

    );
};