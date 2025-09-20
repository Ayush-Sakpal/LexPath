import { useState } from "react";
import { useExams } from "../../context/ExamsContext";

function ManageExams() {
  const { exams, setExams } = useExams();
  const [newExam, setNewExam] = useState({
    name: "",
    level: "",
    mode: "",
    description: "",
  });

  const addExam = () => {
    if (!newExam.name) return;
    setExams([...exams, { ...newExam, id: Date.now() }]);
    setNewExam({ name: "", level: "", mode: "", description: "" });
  };

  const deleteExam = (id) => setExams(exams.filter((e) => e.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>

      {/* Add Exam */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Exam Name"
          value={newExam.name}
          onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
        />
        <button onClick={addExam} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Exam
        </button>
      </div>

      {/* Exam List */}
      <ul>
        {exams.map((exam) => (
          <li key={exam.id} className="flex justify-between bg-white p-4 mb-2 rounded shadow">
            <span>{exam.name} ({exam.level})</span>
            <button onClick={() => deleteExam(exam.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageExams;
