import { useState } from "react";
import { useJobs } from "../../context/JobsContext";

function ManageJobs() {
  const { jobs, setJobs } = useJobs();
  const [newJob, setNewJob] = useState({
    title: "",
    organisation: "",
    location: "",
    role_type: "",
    apply_url: "",
  });

  const addJob = () => {
    if (!newJob.title || !newJob.organisation) return;
    setJobs([...jobs, { ...newJob, id: Date.now() }]);
    setNewJob({ title: "", organisation: "", location: "", role_type: "", apply_url: "" });
  };

  const deleteJob = (id) => setJobs(jobs.filter((j) => j.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>

      {/* Add Job */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Organisation"
          value={newJob.organisation}
          onChange={(e) => setNewJob({ ...newJob, organisation: e.target.value })}
        />
        <button onClick={addJob} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Job
        </button>
      </div>

      {/* Job List */}
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="flex justify-between bg-white p-4 mb-2 rounded shadow">
            <span>{job.title} @ {job.organisation}</span>
            <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageJobs;
