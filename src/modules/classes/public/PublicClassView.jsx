import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClassesPublicStyles.module.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg';

export const PublicClassView = () => {
  const [classes] = useState([
    { id: 1, name: 'Panadería Básica', description: 'Aprende los fundamentos de la panadería', date: '2024-09-22', time: '10:00 AM', duration: 3, instructor: 'Juan Pérez' },
    { id: 2, name: 'Pastelería Avanzada', description: 'Clases avanzadas de pastelería', date: '2024-09-23', time: '2:00 PM', duration: 4, instructor: 'María Gómez' },
  ]);

  const navigate = useNavigate();


    const handleSelectClass = () => {
      navigate('/login');  // Redirige al login
    };


  const classImages = [img1, img2];  // Asigna las imágenes

  return (
    <div className="container mt-4">
      <h1>Clases Disponibles</h1>
      <div className={`container row ${styles.Container}`}>
        {classes.length > 0 ? (
          classes.map((classItem, index) => (
            <div className={`col-md-4 ${styles.cardContainer}`} key={classItem.id}>
              <div className={`${styles.card} ${index === 0 ? styles.cardLeft : styles.cardRight}`}>
                <div className={styles.card_landing} style={{ '--i': `url(${classImages[index]})` }}>
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
                    <button className="btn btn-primary" onClick={handleSelectClass}>
                      Seleccionar Clase
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
    </div>
  );
};