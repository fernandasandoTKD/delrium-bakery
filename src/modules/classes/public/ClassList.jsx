
import { ClassCard } from './ClassCard';

export const ClassList = ({ classes, onSelect }) => {
  return (
    <div className="class-list">
      {classes.map((classItem) => (
        <ClassCard key={classItem.id} classItem={classItem} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ClassList;