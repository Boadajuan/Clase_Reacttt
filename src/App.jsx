import { useState, useEffect, useMemo } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import { useLocalStorage } from "./hooks/useLocalStorage";

 
const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "doing", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "todo", priority: "alta" },
];
 
export default function App() {
const [tasks, setTasks] = useLocalStorage("kanban-tasks", initialTasks);



useEffect(() => {
  document.title = `Kanban (${tasks.length} tareas)`;
}, [tasks]);

 
  function addTask(title, priority) {
    const normalizedTitle = title.trim().toLowerCase();
    if (tasks.some((task) => task.title.trim().toLowerCase() === normalizedTitle)) {
      return "Ya existe una tarea con ese título.";
    }

    const newTask = { id: Date.now(), title, status: "todo", priority };
    setTasks((currentTasks) => [...currentTasks, newTask]);
    return null;
  }

  function editTask(id, title) {
    const normalizedTitle = title.trim().toLowerCase();
    if (
      tasks.some(
        (task) =>
          task.id !== id &&
          task.title.trim().toLowerCase() === normalizedTitle
      )
    ) {
      return "Ya existe una tarea con ese título.";
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, title: title.trim() } : task
      )
    );
    return null;
  }

  function moveTask(id, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const [query, setQuery] = useState("");
 
const filteredTasks = useMemo(
  () =>
    tasks.filter ((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    ),
  [tasks, query]
);

  function clearDoneTasks() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== "done")
    );
  }

  


  const doneTaskCount = tasks.filter ((task) => task.status === "done").length;
 
  return (
    <main>
      <h1>Kanban</h1>
      <input
        className="search"
        placeholder="Buscar tareas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ margin: "15px 0", padding: "8px", width: "100%", maxWidth: "300px", display: "block" }}
      />
      <TaskForm onAdd={addTask} />
      <div className="board-actions">
        <button onClick={clearDoneTasks} disabled={doneTaskCount === 0}>
          Vaciar columna Hecho
        </button>
      </div>
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={filteredTasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
            onEdit={editTask}
          />
        ))}
      </div>
    </main>
  );


}
