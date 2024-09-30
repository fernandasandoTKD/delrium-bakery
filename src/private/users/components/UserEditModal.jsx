import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserEditModal = ({ show, handleClose, user, handleSave }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ ...user, username, email, role });
    handleClose(); // Cerrar el modal después de guardar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo de contacto</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control 
              as="select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              {/* Agrega más roles según sea necesario */}
            </Form.Control>
          </Form.Group>
          
          <Button variant="info" type="submit" className='mt-3'>
            Guardar cambios
          </Button>
          <Button variant="danger"  className='mt-3'>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditModal;