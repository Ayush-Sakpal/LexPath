function JobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col">
      <h2 className="text-xl font-heading font-bold">{job.title}</h2>

      <p className="text-neutralText mt-1">{job.organisation}</p>

      <p className="text-sm mt-2">{job.location}</p>
      <p className="text-sm mt-1 italic">{job.role_type}</p>
      <p className="text-sm mt-1 italic">{job.experience_level}</p>

      {/* Skills badges */}
      {job.skills_required && job.skills_required.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills_required.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <a
        href={job.apply_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 rounded"
      >
        Apply Now
      </a>
    </div>
  );
}

export default JobCard;
