import { useState } from "react";

function ManageJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Intern at Law Firm A" },
    { id: 2, title: "Junior Associate at Firm B" },
    { id: 3, title: "Legal Research Assistant" },
  ]);

  const [newJob, setNewJob] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addJob = () => {
    if (!newJob.trim()) return;
    setJobs([...jobs, { id: Date.now(), title: newJob }]);
    setNewJob("");
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const saveEdit = (id) => {
    setJobs(
      jobs.map((j) =>
        j.id === id ? { ...j, title: editValue } : j
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>

      <ul className="space-y-2">
        {jobs.map((j) => (
          <li key={j.id} className="p-3 bg-white rounded shadow flex justify-between">
            {editingId === j.id ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{j.title}</span>
            )}
            <div className="space-x-2">
              {editingId === j.id ? (
                <button onClick={() => saveEdit(j.id)} className="px-2 py-1 bg-green-500 text-white text-sm rounded">Save</button>
              ) : (
                <button onClick={() => startEdit(j.id, j.title)} className="px-2 py-1 bg-yellow-400 text-sm rounded">Edit</button>
              )}
              <button onClick={() => deleteJob(j.id)} className="px-2 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex space-x-2">
        <input
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
          placeholder="New job title"
          className="border p-2 rounded w-full"
        />
        <button onClick={addJob} className="px-4 py-2 bg-green-600 text-white rounded">
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageJobs;
