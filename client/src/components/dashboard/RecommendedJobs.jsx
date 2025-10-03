function RecommendedJobs({ jobs }) {
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>

      {safeJobs.length === 0 ? (
        <p>No recommended jobs.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {safeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow rounded p-4 w-72 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-lg">{job.title}</p>
                <p className="text-sm text-neutralText mt-1">{job.organisation}</p>
                <p className="text-sm text-neutralText mt-1">{job.location}</p>
                <p className="text-sm text-neutralText mt-1">{job.role_type}</p>
              </div>
              <a
                href={job.apply_url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-blue-600 hover:underline font-medium"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedJobs;
