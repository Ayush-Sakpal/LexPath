import { useState, useEffect } from "react";
import axios from "axios";

function ManageCareers() {
  const [careers, setCareers] = useState([]);
  const emptyCareer = {
    title: "", field: "", specialization: "", summary: "", description: "",
    avg_salary_range: "", work_environment: "", image_url: ""
  };
  const [newCareer, setNewCareer] = useState(emptyCareer);
  const [editingId, setEditingId] = useState(null);
  const [editCareer, setEditCareer] = useState(emptyCareer);

  useEffect(() => {
    axios.get("http://localhost:5000/api/careers").then((res) => setCareers(res.data));
  }, []);

  const handleChange = (e, setter, obj) => {
    setter({ ...obj, [e.target.name]: e.target.value });
  };

  const addCareer = async () => {
    if (!newCareer.title) return;
    const res = await axios.post("http://localhost:5000/api/careers", newCareer);
    setCareers([...careers, res.data]);
    setNewCareer(emptyCareer);
  };

  const updateCareer = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/careers/${id}`, editCareer);
    setCareers(careers.map((c) => (c.id === id ? res.data : c)));
    setEditingId(null);
    setEditCareer(emptyCareer);
  };

  const deleteCareer = async (id) => {
    await axios.delete(`http://localhost:5000/api/careers/${id}`);
    setCareers(careers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Careers</h1>

      {/* Add Career */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        {Object.keys(newCareer).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={newCareer[key]}
            onChange={(e) => handleChange(e, setNewCareer, newCareer)}
            className="border p-2 rounded"
          />
        ))}
        <button onClick={addCareer} className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
          Add Career
        </button>
      </div>

      {/* Career List */}
      <ul>
        {careers.map((career) => (
          <li key={career.id} className="bg-white p-4 mb-2 rounded shadow">
            {editingId === career.id ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(editCareer).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={editCareer[key] || ""}
                    onChange={(e) => handleChange(e, setEditCareer, editCareer)}
                    className="border p-2 rounded"
                  />
                ))}
                <div className="col-span-2 flex gap-2">
                  <button onClick={() => updateCareer(career.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{career.title} ({career.field})</span>
                <div className="space-x-2">
                  <button onClick={() => { setEditingId(career.id); setEditCareer(career); }} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteCareer(career.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCareers;