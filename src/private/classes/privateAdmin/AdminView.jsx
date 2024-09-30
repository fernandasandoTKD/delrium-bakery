import React, { useState, useEffect } from 'react';

export const AdminView = () => {
  const [classes, setClasses] = useState([]);

  // Cargar clases de todos los usuarios (en este caso, solo desde el localStorage)
  useEffect(() => {
    const storedClasses = localStorage.getItem('myClasses');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1>Clases a Dictar</h1>
      {classes.length > 0 ? (
        <ul className="list-group">
          {classes.map((classItem) => (
            <li className="list-group-item" key={classItem.id}>
              <h5>{classItem.name}</h5>
              <p><strong>Instructor:</strong> {classItem.instructor}</p>
              <p><strong>Fecha y Hora:</strong> {classItem.date} - {classItem.time}</p>
              <p><strong>Duración:</strong> {classItem.duration} horas</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay clases registradas para dictar.</p>
      )}
    </div>
  );
};

