import React, { useRef } from 'react';
import styles from './usersStyles.module.css';
import useAuth from '../../hooks/useAuth';
import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Global } from '../../helpers/Global';
import { Button } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import UserEditModal from './components/UserEditModal';


export const UsersPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = (updatedUser) => {
    // Aquí puedes realizar la lógica para guardar los cambios (por ejemplo, llamar a una API)
    console.log('Usuario actualizado:', updatedUser);
  };


  // Variable para almacenar el token para las peticiones a realizar en este componente
  const token = localStorage.getItem("token");

  // Se recibe la información desde el Contexto a través del hook useAuth
  const { auth } = useAuth();

  // Estado para guardar el array de usuarios que sigues recibido desde el backend
  const [users, setUsers] = useState([]);


  // Usar desde el react-router-dom el Hook useParams para tener acceso a los parámetros que vienen en la url
/*   const params = useParams(); */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(Global.url + "users"); // Cambia la URL por la de tu API
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  /* Función para traducir rol */
  const roleTranslations = {
    admin: "Administrador",
    user: "Usuario",
  };


  return (
    <>
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
            <tr key={user?.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{roleTranslations[user.role] || user.role}</td>
              <td>
                <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>
                  <CiEdit/>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  <MdOutlineDelete/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentUser && (
        <UserEditModal 
          show={showModal} 
          handleClose={handleClose} 
          user={currentUser} 
          handleSave={handleSave} 
        />
      )}
    </>
  );
};

export default UsersPage;
