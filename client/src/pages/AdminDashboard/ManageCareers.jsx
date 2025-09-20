import { useState } from "react";
import { useCareers } from "../../context/CareersContext";

function ManageCareers() {
  const { careers, setCareers } = useCareers();
  const [newCareer, setNewCareer] = useState({
    title: "",
    summary: "",
    specialization: "",
  });

  const addCareer = () => {
    if (!newCareer.title) return;
    setCareers([...careers, { ...newCareer, id: Date.now() }]);
    setNewCareer({ title: "", summary: "", specialization: "" });
  };

  const deleteCareer = (id) => setCareers(careers.filter((c) => c.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Careers</h1>

      {/* Add Career */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Career Title"
          value={newCareer.title}
          onChange={(e) => setNewCareer({ ...newCareer, title: e.target.value })}
        />
        <button onClick={addCareer} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Career
        </button>
      </div>

      {/* Career List */}
      <ul>
        {careers.map((career) => (
          <li key={career.id} className="flex justify-between bg-white p-4 mb-2 rounded shadow">
            <span>{career.title} - {career.specialization}</span>
            <button onClick={() => deleteCareer(career.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCareers;
