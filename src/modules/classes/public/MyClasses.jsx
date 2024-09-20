
export const MyClasses = ({ myClasses, onRemove }) => {
  return (
    <div className="my-classes">
      <h2>Mis Cursos</h2>
      <ul>
        {myClasses.map((classItem) => (
          <li key={classItem.id}>
            {classItem.name} - {classItem.date}
            <button onClick={() => onRemove(classItem.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyClasses;