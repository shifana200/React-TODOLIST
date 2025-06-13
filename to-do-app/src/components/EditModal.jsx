import React, { useState } from "react";

export default function EditModal({ todo, onSave, onCancel }) {
  const [value, setValue] = useState(todo.text);

  return (
    <div
      className="modal"
    >
      <h3>Edit Task</h3>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <br />
      <button onClick={() => onSave(value)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
