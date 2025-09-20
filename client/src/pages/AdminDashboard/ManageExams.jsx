import { useState } from "react";

function ManageExams() {
  const [exams, setExams] = useState([
    { id: 1, name: "CLAT" },
    { id: 2, name: "AILET" },
    { id: 3, name: "LSAT India" },
  ]);

  const [newExam, setNewExam] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addExam = () => {
    if (!newExam.trim()) return;
    setExams([...exams, { id: Date.now(), name: newExam }]);
    setNewExam("");
  };

  const deleteExam = (id) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const startEdit = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const saveEdit = (id) => {
    setExams(
      exams.map((e) =>
        e.id === id ? { ...e, name: editValue } : e
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Exams</h2>

      <ul className="space-y-2">
        {exams.map((e) => (
          <li key={e.id} className="p-3 bg-white rounded shadow flex justify-between">
            {editingId === e.id ? (
              <input
                value={editValue}
                onChange={(ev) => setEditValue(ev.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{e.name}</span>
            )}
            <div className="space-x-2">
              {editingId === e.id ? (
                <button onClick={() => saveEdit(e.id)} className="px-2 py-1 bg-green-500 text-white text-sm rounded">Save</button>
              ) : (
                <button onClick={() => startEdit(e.id, e.name)} className="px-2 py-1 bg-yellow-400 text-sm rounded">Edit</button>
              )}
              <button onClick={() => deleteExam(e.id)} className="px-2 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex space-x-2">
        <input
          value={newExam}
          onChange={(e) => setNewExam(e.target.value)}
          placeholder="New exam name"
          className="border p-2 rounded w-full"
        />
        <button onClick={addExam} className="px-4 py-2 bg-green-600 text-white rounded">
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageExams;
