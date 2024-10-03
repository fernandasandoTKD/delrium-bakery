import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Asegúrate de importar Swal
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import UserModal from './components/UserModal';
import { Global } from '../../helpers/Global';
import { Card, Row, Col } from 'react-bootstrap';
import defaultImage from '../../assets/usuario.png';

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


  const handleCreateClick = () => {
    setCurrentUser(null);
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

    try {
      const response = await fetch(`${Global.url}users/${userData._id}`, {
        method: 'PUT', // O 'PATCH' dependiendo de tu API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token si es necesario
        },
        body: JSON.stringify(userData), // Datos que estás enviando
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      const updatedUser = await response.json();

      // Actualiza la lista de usuarios en el estado
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );

      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'Los datos del usuario se han actualizado correctamente.',
      });

      // Cerrar el modal
      handleClose();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la operación',
        text: 'No se pudo actualizar el usuario. Intenta nuevamente.',
      });
    }
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return; // Salir si el usuario cancela

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

    try {
      const response = await fetch(`${Global.url}users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token si es necesario
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Actualiza la lista de usuarios en el estado
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
      });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la operación',
        text: 'No se pudo eliminar el usuario. Intenta nuevamente.',
      });
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
        <Button variant="info" className="me-2" onClick={() => handleCreateClick()}>
          Crear usuario
        </Button>
      </div>
      <Row>
        {users.map((user) => (
          <Col key={user?._id} sm={12} md={4} className="mb-4"> {/* 3 cartas por fila en pantallas medianas y grandes */}
            <Card className="d-flex flex-column align-items-center">
              <Card.Img variant="top" src={defaultImage} style={{ width: '60%' }} />
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  {user.email}<br />
                  {roleTranslations[user.role] || user.role}
                </Card.Text>
                <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>
                  <CiEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  <MdOutlineDelete />
                </Button>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>

      <UserModal
        show={showModal}
        handleClose={handleClose}
        user={currentUser}
        handleSave={handleSave}
      />
    </div>
  );
}

export default UsersPage;
