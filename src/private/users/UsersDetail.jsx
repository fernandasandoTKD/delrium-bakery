import React from 'react'
import { useParams } from 'react-router-dom';

export const UsersDetail = () => {
    const { id } = useParams();

    // Aquí puedes usar el ID para cargar datos de usuario, etc.
    return <div>Detalles del usuario con ID: {id}</div>;
}
