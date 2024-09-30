import React from 'react'
import { Outlet } from 'react-router-dom';

export const PrivatePage = () => {
  return (
    <div className='container' style={{ marginTop: '100px' }}>
             {/* Aquí se renderizarán las rutas anidadas */}
      <Outlet />
    </div>
  )
};

export default PrivatePage;
