function RecommendedJobs({jobs}) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="text-xl font-bold font-heading mb-4">Recommended Jobs</h3>

      <ul className="space-y-2">
         {
          jobs.map((job) => (
            <li key={job.id} className="border-b pb-2">
              <p className="font-semibold">{job.title}</p>

              <p className="text-sm text-neutralText">{job.orgnisation}</p>
            </li>
          ))
         }
      </ul>

    </div>
  );
}

export default RecommendedJobs;