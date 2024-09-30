import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styles from './ClassesPublicStyles.module.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg';

export const PublicClassView = () => {
  const [classes, setClasses] = useState([]); // Para almacenar las clases disponibles
  const [myClasses, setMyClasses] = useState(() => {
    const storedClasses = localStorage.getItem('myClasses');
    return storedClasses ? JSON.parse(storedClasses) : [];
  });

  const navigate = useNavigate(); // Inicializar el hook de redirección

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3900/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error al obtener clases:', error);
      }
    };

    fetchClasses(); // Llamar a la función para obtener las clases al montar el componente
  }, []);

  // Adición de clases
  const handleAddClass = (classItem) => {
    const isLoggedIn = false; 

    if (!isLoggedIn) {
      navigate('/login'); // Redirige a la página de inicio de sesión
    } else {
      // Si está logueado, agregar la clase
      if (!myClasses.find((cls) => cls.id === classItem.id)) {
        const updatedClasses = [...myClasses, classItem];
        setMyClasses(updatedClasses);
        localStorage.setItem('myClasses', JSON.stringify(updatedClasses)); // Almacena en localStorage
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1>Clases Disponibles</h1>
      <div className={`container row ${styles.Container}`}>
        {classes.length > 0 ? (
          classes.map((classItem, index) => (
            <div className={`col-md-4 ${styles.cardContainer}`} key={classItem._id}>
              <div className={`${styles.card} ${index === 0 ? styles.cardLeft : styles.cardRight}`}>
                <div className={styles.card_landing} style={{ '--i': `url(${index === 0 ? img1 : img2})` }}>
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
    </div>
  );
};
