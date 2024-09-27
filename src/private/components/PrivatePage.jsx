import React from 'react'
import { Outlet } from 'react-router-dom';

export const PrivatePage = () => {
  return (
    <div className='container'>
            <h1>Esta es una página privada</h1>
            <p>Solo los usuarios autenticados pueden ver esto.</p>
             {/* Aquí se renderizarán las rutas anidadas */}
      <Outlet />
    </div>
  )
};

export default PrivatePage;
