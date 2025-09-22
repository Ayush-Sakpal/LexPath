import { useState, useEffect } from "react";
import axios from "axios";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const emptyJob = {
    title: "", organisation: "", location: "", role_type: "", industry: "",
    experience_level: "", education_required: "", salary_range: "",
    job_description: "", responsibilities: "", openings: "", apply_url: "",
    contact_email: ""
  };
  const [newJob, setNewJob] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);
  const [editJob, setEditJob] = useState(emptyJob);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs").then((res) => setJobs(res.data));
  }, []);

  const handleChange = (e, setter, obj) => {
    setter({ ...obj, [e.target.name]: e.target.value });
  };

  const addJob = async () => {
    if (!newJob.title || !newJob.organisation) return;
    const res = await axios.post("http://localhost:5000/api/jobs", newJob);
    setJobs([...jobs, res.data]);
    setNewJob(emptyJob);
  };

  const updateJob = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/jobs/${id}`, editJob);
    setJobs(jobs.map((j) => (j.id === id ? res.data : j)));
    setEditingId(null);
    setEditJob(emptyJob);
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    setJobs(jobs.filter((j) => j.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>

      {/* Add Job */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        {Object.keys(newJob).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={newJob[key]}
            onChange={(e) => handleChange(e, setNewJob, newJob)}
            className="border p-2 rounded"
          />
        ))}
        <button onClick={addJob} className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded">
          Add Job
        </button>
      </div>

      {/* Job List */}
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="bg-white p-4 mb-2 rounded shadow">
            {editingId === job.id ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(editJob).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={editJob[key] || ""}
                    onChange={(e) => handleChange(e, setEditJob, editJob)}
                    className="border p-2 rounded"
                  />
                ))}
                <div className="col-span-2 flex gap-2">
                  <button onClick={() => updateJob(job.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{job.title} @ {job.organisation}</span>
                <div className="space-x-2">
                  <button onClick={() => { setEditingId(job.id); setEditJob(job); }} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteJob(job.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default ManageJobs;
