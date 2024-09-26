

export const ClassDetail = ({ selectedClass, onAdd }) => {
  if (!selectedClass) return <p>Seleccione una clase para ver los detalles.</p>;

  return (
    <div className="class-detail">
      <h2>{selectedClass.name}</h2>
      <p>{selectedClass.description}</p>
      <p><strong>Horario:</strong> {selectedClass.date} - {selectedClass.time}</p>
      <p><strong>Duración:</strong> {selectedClass.duration} horas</p>
      <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
      <button onClick={() => onAdd(selectedClass)}>Agregar a mis cursos</button>
    </div>
  );
};

export default ClassDetail;