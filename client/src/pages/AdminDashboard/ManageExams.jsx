import { useState, useEffect } from "react";
import axios from "axios";

function ManageExams() {
  const [exams, setExams] = useState([]);
  const emptyExam = {
    name: "", level: "", mode: "", conducting_body: "", eligibility: "",
    exam_date: "", application_start: "", application_end: "",
    syllabus: "", exam_pattern: "", duration: "", marking_scheme: "",
    fees: "", official_website: "", contact_email: "", description: ""
  };
  const [newExam, setNewExam] = useState(emptyExam);
  const [editingId, setEditingId] = useState(null);
  const [editExam, setEditExam] = useState(emptyExam);

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams").then((res) => setExams(res.data));
  }, []);

  const handleChange = (e, setter, obj) => {
    setter({ ...obj, [e.target.name]: e.target.value });
  };

  const addExam = async () => {
    if (!newExam.name) return;
    const res = await axios.post("http://localhost:5000/api/exams", newExam);
    setExams([...exams, res.data]);
    setNewExam(emptyExam);
  };

  const updateExam = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/exams/${id}`, editExam);
    setExams(exams.map((e) => (e.id === id ? res.data : e)));
    setEditingId(null);
    setEditExam(emptyExam);
  };

  const deleteExam = async (id) => {
    await axios.delete(`http://localhost:5000/api/exams/${id}`);
    setExams(exams.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>

      {/* Add Exam */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        {Object.keys(newExam).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={newExam[key]}
            onChange={(e) => handleChange(e, setNewExam, newExam)}
            className="border p-2 rounded"
          />
        ))}
        <button onClick={addExam} className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
          Add Exam
        </button>
      </div>

      {/* Exam List */}
      <ul>
        {exams.map((exam) => (
          <li key={exam.id} className="bg-white p-4 mb-2 rounded shadow">
            {editingId === exam.id ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(editExam).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={editExam[key] || ""}
                    onChange={(e) => handleChange(e, setEditExam, editExam)}
                    className="border p-2 rounded"
                  />
                ))}
                <div className="col-span-2 flex gap-2">
                  <button onClick={() => updateExam(exam.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{exam.name} ({exam.level})</span>
                <div className="space-x-2">
                  <button onClick={() => { setEditingId(exam.id); setEditExam(exam); }} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteExam(exam.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default ManageExams;
