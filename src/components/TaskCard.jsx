import { useState } from "react";
import { COLUMNS } from "../columns";
 
export default function TaskCard({ task, onMove, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setError("El título no puede estar vacío.");
      return;
    }

    const editError = onEdit(task.id, trimmedTitle);
    if (editError) {
      setError(editError);
      return;
    }

    setError("");
    setIsEditing(false);
  }

  function cancelEdit() {
    setTitle(task.title);
    setError("");
    setIsEditing(false);
  }

  return (
    <article className={`card prio-${task.priority}`}>
      {isEditing ? (
        <form className="edit-title-form" onSubmit={handleSubmit}>
          <input
            aria-label="Editar título de tarea"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancelEdit();
            }}
          />
          <div className="card-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={cancelEdit}>Cancelar</button>
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
        </form>
      ) : (
        <strong
          onDoubleClick={() => {
            setTitle(task.title);
            setIsEditing(true);
          }}
          title="Doble clic para editar"
        >
          {task.title}
        </strong>
      )}
      <small>Prioridad: {task.priority}</small>
      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button onClick={() => onRemove(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}
