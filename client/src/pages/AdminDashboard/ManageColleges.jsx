import { useState, useEffect } from "react";
import axios from "axios";

function ManageColleges() {
  const [colleges, setColleges] = useState([]);
  const emptyCollege = {
    name: "", type: "", location: "", city: "", state: "", country: "India",
    established_year: "", affiliation: "", accreditation: "", ranking: "",
    website: "", contact_email: "", contact_phone: "", description: ""
  };
  const [newCollege, setNewCollege] = useState(emptyCollege);
  const [editingId, setEditingId] = useState(null);
  const [editCollege, setEditCollege] = useState(emptyCollege);

  useEffect(() => {
    axios.get("http://localhost:5000/api/colleges").then((res) => setColleges(res.data));
  }, []);

  const handleChange = (e, setter, obj) => {
    setter({ ...obj, [e.target.name]: e.target.value });
  };

  const addCollege = async () => {
    if (!newCollege.name) return;
    const res = await axios.post("http://localhost:5000/api/colleges", newCollege);
    setColleges([...colleges, res.data]);
    setNewCollege(emptyCollege);
  };

  const updateCollege = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/colleges/${id}`, editCollege);
    setColleges(colleges.map((c) => (c.id === id ? res.data : c)));
    setEditingId(null);
    setEditCollege(emptyCollege);
  };

  const deleteCollege = async (id) => {
    await axios.delete(`http://localhost:5000/api/colleges/${id}`);
    setColleges(colleges.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Colleges</h1>

      {/* Add College */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        {Object.keys(newCollege).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={newCollege[key]}
            onChange={(e) => handleChange(e, setNewCollege, newCollege)}
            className="border p-2 rounded"
          />
        ))}
        <button onClick={addCollege} className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
          Add College
        </button>
      </div>

      {/* College List */}
      <ul>
        {colleges.map((college) => (
          <li key={college.id} className="bg-white p-4 mb-2 rounded shadow">
            {editingId === college.id ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(editCollege).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={editCollege[key] || ""}
                    onChange={(e) => handleChange(e, setEditCollege, editCollege)}
                    className="border p-2 rounded"
                  />
                ))}
                <div className="col-span-2 flex gap-2">
                  <button onClick={() => updateCollege(college.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{college.name} ({college.city})</span>
                <div className="space-x-2">
                  <button onClick={() => { setEditingId(college.id); setEditCollege(college); }} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteCollege(college.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default ManageColleges;