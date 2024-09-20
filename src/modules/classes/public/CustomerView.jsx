import React, { useState } from 'react';
import styles from './ClassesPublicStyles.module.css';





export const CustomerView = () => {
  const [classes] = useState([
    { id: 1, name: 'Panadería Básica', description: 'Aprende los fundamentos de la panadería', date: '2024-09-22', time: '10:00 AM', duration: 3, instructor: 'Juan Pérez' },
    { id: 2, name: 'Pastelería Avanzada', description: 'Clases avanzadas de pastelería', date: '2024-09-23', time: '2:00 PM', duration: 4, instructor: 'María Gómez' },
  ]);

  const [myClasses, setMyClasses] = useState([]);

  const handleAddClass = (classItem) => {
    setMyClasses([...myClasses, classItem]);
  };

  const handleRemoveClass = (id) => {
    setMyClasses(myClasses.filter((classItem) => classItem.id !== id));
  };

  
  return (
    <div className="container mt-4">
      <h1>Clases Disponibles</h1>
      <div className="row">
        {classes.length > 0 ? (
          classes.map((classItem, index) => (
            <div className="col-md-4 mb-4" key={classItem.id}>
              <div className={styles.card}>
                {/* Carga dinámica de la imagen con require */}
                <div className={styles.card_landing} style={{ '--i': `url(./src/modules/classes/public/${classItem.image})` }}>
                  <h6>{classItem.name}</h6>
                </div>
                <div className={styles.card_info}>
                  <div className={styles.head}>
                    <p className={styles.title}>{classItem.name}</p>
                    <div className={styles.description}>
                      <div className={styles.item}>
                        <i className="fa-regular fa-clock"></i>
                        <p>{classItem.duration} horas</p>
                      </div>
                      <div className={styles.item}>
                        <i className="fa-regular fa-user"></i>
                        <p>{classItem.instructor}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.content}>
                    <p className={styles.title}>Horario:</p>
                    <p>{classItem.date} - {classItem.time}</p>
                  </div>

                  <div className={styles.action}>
                    <button className="btn btn-primary" onClick={() => handleAddClass(classItem)}>
                      Agregar a mis cursos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay clases disponibles en este momento.</p>
        )}
      </div>

      {/* Lista de cursos agregados */}
      {myClasses.length > 0 && (
        <div className="mt-4">
          <h2>Mis Cursos</h2>
          <ul className="list-group">
            {myClasses.map((classItem) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={classItem.id}>
                {classItem.name}
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveClass(classItem.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};