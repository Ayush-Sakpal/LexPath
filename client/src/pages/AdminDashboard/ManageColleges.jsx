import { useState } from "react";

function ManageColleges() {
  const [colleges, setColleges] = useState([
    { id: 1, name: "NLSIU Bangalore" },
    { id: 2, name: "NALSAR Hyderabad" },
    { id: 3, name: "NLU Delhi" },
  ]);

  const [newCollege, setNewCollege] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addCollege = () => {
    if (!newCollege.trim()) return;
    setColleges([...colleges, { id: Date.now(), name: newCollege }]);
    setNewCollege("");
  };

  const deleteCollege = (id) => {
    setColleges(colleges.filter((c) => c.id !== id));
  };

  const startEdit = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const saveEdit = (id) => {
    setColleges(
      colleges.map((c) =>
        c.id === id ? { ...c, name: editValue } : c
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Colleges</h2>

      {/* List */}
      <ul className="space-y-2">
        {colleges.map((c) => (
          <li
            key={c.id}
            className="p-3 bg-white rounded shadow flex justify-between"
          >
            {editingId === c.id ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{c.name}</span>
            )}
            <div className="space-x-2">
              {editingId === c.id ? (
                <button
                  onClick={() => saveEdit(c.id)}
                  className="px-2 py-1 bg-green-500 text-white text-sm rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(c.id, c.name)}
                  className="px-2 py-1 bg-yellow-400 text-sm rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCollege(c.id)}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add new */}
      <div className="mt-4 flex space-x-2">
        <input
          value={newCollege}
          onChange={(e) => setNewCollege(e.target.value)}
          placeholder="New college name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addCollege}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageColleges;
