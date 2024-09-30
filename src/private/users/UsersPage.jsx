import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Asegúrate de importar Swal
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import UserModal from './components/UserModal';
import { Global } from '../../helpers/Global';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${Global.url}users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };


  const handleClose = () => {
    setShowModal(false);
    setCurrentUser(null); // Limpia el usuario actual al cerrar
  };

  const handleSave = async (userData) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error('No hay token suministrado');
      Swal.fire({
        icon: 'error',
        title: 'Error en la operación',
        text: 'No estás autenticado. Por favor inicia sesión nuevamente.',
      });
      return; // Salir de la función si no hay token
    }

  };
  
  

  const roleTranslations = {
    admin: 'Administrador',
    user: 'Usuario',
    // Agrega otras traducciones de roles según sea necesario
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Usuarios del sistema</h1>
      </div>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de usuario</th>
            <th>Correo de contacto</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user?._id}> {/* Cambiado de user.id a user._id */}
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{roleTranslations[user.role] || user.role}</td>
              <td>
                <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>
                  <CiEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}> {/* Cambiado de user.id a user._id */}
                  <MdOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UserModal 
        show={showModal} 
        handleClose={handleClose} 
        user={currentUser} 
        handleSave={handleSave} 
      />
    </div>
  );
};

export default UsersPage;
