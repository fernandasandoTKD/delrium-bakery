import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Global } from '../../helpers/Global';
import { useParams, useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/usuario.png';
import styles from './UsersPrivateStyles.module.css';


export const UsersDetail = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('token'));

        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
                const response = await fetch(`${Global.url}users/profile/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Incluir el token en las cabeceras
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) { // Manejar el caso de token no válido o expirado
                        // Aquí podrías redirigir al usuario a la página de productos o login
                        Swal.fire({
                            icon: 'warning',
                            title: 'Sesión expirada',
                            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                        }).then(() => {
                            localStorage.removeItem('token'); // Limpiar el token
                            localStorage.removeItem('user'); // Limpiar el usuario
                            navigate('/login'); // Redirigir a la página de login
                        });
                    } else {
                        throw new Error('Error al obtener los datos del usuario');
                    }
                }

                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'No se pudo cargar los datos del usuario.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id, navigate]);


    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <div>No se encontró el usuario.</div>;
    }

    return (
        <Container className="mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className='mb-5'>Tu perfil</h2>
            <div className={styles.card_client}>
                <div className={styles.user_picture}>
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                    </svg>
                </div>
                <p className={styles.anme_client}> {user.username}
                    <p>Fecha de creación de usuario:</p>
                    <span>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }) : date}
                    </span>
                </p>
            </div>
        </Container>
    );
};

