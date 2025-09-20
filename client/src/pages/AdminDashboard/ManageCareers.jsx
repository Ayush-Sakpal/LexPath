import { useState } from "react";

function ManageCareers() {
  const [careers, setCareers] = useState([
    { id: 1, title: "Corporate Lawyer" },
    { id: 2, title: "Litigation Lawyer" },
    { id: 3, title: "Legal Analyst" },
  ]);

  const [newCareer, setNewCareer] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addCareer = () => {
    if (!newCareer.trim()) return;
    setCareers([...careers, { id: Date.now(), title: newCareer }]);
    setNewCareer("");
  };

  const deleteCareer = (id) => {
    setCareers(careers.filter((c) => c.id !== id));
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const saveEdit = (id) => {
    setCareers(
      careers.map((c) =>
        c.id === id ? { ...c, title: editValue } : c
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Careers</h2>

      <ul className="space-y-2">
        {careers.map((c) => (
          <li key={c.id} className="p-3 bg-white rounded shadow flex justify-between">
            {editingId === c.id ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{c.title}</span>
            )}
            <div className="space-x-2">
              {editingId === c.id ? (
                <button onClick={() => saveEdit(c.id)} className="px-2 py-1 bg-green-500 text-white text-sm rounded">Save</button>
              ) : (
                <button onClick={() => startEdit(c.id, c.title)} className="px-2 py-1 bg-yellow-400 text-sm rounded">Edit</button>
              )}
              <button onClick={() => deleteCareer(c.id)} className="px-2 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex space-x-2">
        <input
          value={newCareer}
          onChange={(e) => setNewCareer(e.target.value)}
          placeholder="New career title"
          className="border p-2 rounded w-full"
        />
        <button onClick={addCareer} className="px-4 py-2 bg-green-600 text-white rounded">
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageCareers;
