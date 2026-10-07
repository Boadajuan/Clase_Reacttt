import { useState } from "react";
 
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");
  const [error, setError] = useState("");
 
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setError("El título no puede estar vacío.");
      return;
    }

    const addError = onAdd(trimmedTitle, priority);
    if (addError) {
      setError(addError);
      return;
    }

    setTitle("");
    setError("");
  }
 
  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Nueva tarea..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}
    </>
  );
}
