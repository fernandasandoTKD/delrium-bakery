import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Global } from '../../../helpers/Global';


export const AdminView = () => {
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    instructor: '',
  });

  const [classes, setClasses] = useState([]);
  const [userClasses, setUserClasses] = useState([]);

  // Función para cargar las clases desde el backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${Global.url}classRoutes`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error al obtener clases:', error);
    }
  };

  
  useEffect(() => {
    fetchClasses();
    loadUserClasses(); // Cargar las clases de los usuarios desde localStorage
  }, []);

  // Agregar una nueva clase
  const handleAddNewClass = async () => {
    try {
      const response = await axios.post((`${Global.url}classRoutes`), newClass);
      console.log('Clase agregada:', response.data);
      setShowModal(false);
      setNewClass({
        name: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        instructor: '',
      });
      fetchClasses(); // Recargar las clases después de agregar una nueva
    } catch (error) {
      console.error('Error al agregar clase:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value,
    });
  };

  // Función para cargar clases de usuarios desde localStorage
  const loadUserClasses = () => {
    const storedClasses = localStorage.getItem('myClasses');
    if (storedClasses) {
      setUserClasses(JSON.parse(storedClasses));
    }
  };

  // Eliminar clase
  const handleDeleteClass = async (id) => {
    try {
      await axios.delete((`${Global.url}classRoutes/${id}`));
      fetchClasses(); // Recargar las clases después de eliminar
    } catch (error) {
      console.error('Error al eliminar clase:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Clases a Dictar</h1>
      
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Nueva Clase
      </Button>

      {/* Modal para agregar una nueva clase */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formClassName">
              <Form.Label>Nombre de la Clase</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del taller"
                name="name"
                value={newClass.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClassDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del taller"
                name="description"
                value={newClass.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClassDate">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newClass.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClassTime">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={newClass.time}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClassDuration">
              <Form.Label>Duración (horas)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Duración del taller"
                name="duration"
                value={newClass.duration}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClassInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del instructor"
                name="instructor"
                value={newClass.instructor}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddNewClass}>
            Guardar Clase
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mostrar las clases creadas */}
      <div className="mt-4">
        <h2>Clases Creadas</h2>
        <ul className="list-group">
          {classes.map(classItem => (
            <li key={classItem._id} className="list-group-item d-flex justify-content-between align-items-center">
              {classItem.name} - {classItem.instructor}
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClass(classItem._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mostrar las clases que han tomado los usuarios */}
      <div className="mt-4">
        <h2>Clases Tomadas por los Usuarios</h2>
        <ul className="list-group">
          {userClasses.length > 0 ? (
            userClasses.map((classItem, index) => (
              <li key={index} className="list-group-item">
                {classItem.name}
              </li>
            ))
          ) : (
            <li className="list-group-item">No hay clases tomadas por los usuarios.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

