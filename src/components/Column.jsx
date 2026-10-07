import TaskCard from "./TaskCard";
 
export default function Column({ title, tasks, onMove, onRemove, onEdit }) {
  return (
    <section className="column">
      <h2>{title} ({tasks.length})</h2>
      {tasks.length === 0 && <p>Sin tareas</p>}
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onMove={onMove}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
