
export const ClassCard = ({ classItem, onSelect }) => {
  return (
    <div className="class-card" onClick={() => onSelect(classItem)}>
      <h3>{classItem.name}</h3>
      <p>{classItem.description}</p>
    </div>
  );
};

export default ClassCard;