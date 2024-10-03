import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Global } from '../../../helpers/Global';

const UserModal = ({ show, handleClose, user, handleSave }) => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Inicialmente vacío
  const [password, setPassword] = useState(''); // Estado para la contraseña

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setRole(user.role || ''); // Mantiene el rol del usuario a editar
      setPassword(''); // Reiniciar la contraseña en cada edición
    } else {
      // Limpia los campos si no hay usuario
      setUsername('');
      setEmail('');
      setRole(''); // Reinicia el rol al crear un nuevo usuario
      setPassword(''); // Reiniciar la contraseña al crear un nuevo usuario
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      let response;
      const updatedUser = { username, email, role }; // Incluye el rol

      if (user && user._id) {
        // Edición del usuario
        // Solo enviar la contraseña si fue cambiada
        if (password) {
          updatedUser.password = password;
        }
        response = await fetch(`${Global.url}/users/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedUser),
        });
      } else {
        // Crear nuevo usuario
        response = await fetch(`${Global.url}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ ...updatedUser, password }), // Incluye la contraseña al crear
        });
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al guardar el usuario');
      }

      const data = await response.json();
      handleSave(data);
      handleClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      // Aquí podrías agregar una notificación de error si lo deseas
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user && user._id ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo de contacto</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control 
              as="select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Seleccionar rol</option> {/* Opción inicial */}
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              {/* Agrega más roles según sea necesario */}
            </Form.Control>
          </Form.Group>

          {!user && (
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </Form.Group>
          )}
          
          <Button variant="info" type="submit" className='mt-3'>
            {user && user._id ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
          <Button variant="danger" className='mt-3' onClick={handleClose}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
