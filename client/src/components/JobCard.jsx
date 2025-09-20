function JobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-heading font-bold">{job.title}</h2>

      <p className="text-neutralText">{job.organisation}</p>

      <p className="text-sm mt-2">{job.location}</p>

      <p className="text-sm mt-2">{job.role_type}</p>

      <a
        href={job.apply_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        Apply Now
      </a>
    </div>
  );
}

export default JobCard;
