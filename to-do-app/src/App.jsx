

import React, { useState } from "react";
import TodoItem from "./components/TodoItem";
import EditModal from "./components/EditModal";
import "./App.css";


export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // the task being edited

  const handleAdd = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditSave = (updatedText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: updatedText } : todo
      )
    );
    setEditingTodo(null);
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <div className="subcontainer">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Add</button>
      </div>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onEdit={() => setEditingTodo(todo)}
          onToggle={handleCheckbox}
        />
      ))}

      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={handleEditSave}
          onCancel={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
}























































































































