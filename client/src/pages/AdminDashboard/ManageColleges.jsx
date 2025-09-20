import { useState } from "react";
import { useColleges } from "../../context/CollegesContext";

function ManageColleges() {
  const { colleges, addCollege, deleteCollege, updateCollege } = useColleges();
  const [newCollege, setNewCollege] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Colleges</h2>
      <ul>
        {colleges.map((c) => (
          <li key={c.id} className="flex justify-between bg-white p-2 my-2 rounded">
            {editingId === c.id ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{c.name}</span>
            )}
            <div className="space-x-2">
              {editingId === c.id ? (
                <button
                  onClick={() => {
                    updateCollege(c.id, { name: editValue });
                    setEditingId(null);
                    setEditValue("");
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setEditValue(c.name);
                  }}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCollege(c.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add new college */}
      <div className="mt-4">
        <input
          value={newCollege}
          onChange={(e) => setNewCollege(e.target.value)}
          placeholder="New college"
          className="border p-2 rounded"
        />
        <button
          onClick={() => {
            addCollege({ name: newCollege });
            setNewCollege("");
          }}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageColleges;
