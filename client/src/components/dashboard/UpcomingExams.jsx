function UpcomingExams({ exams }) {
  const safeExams = Array.isArray(exams) ? exams : [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Exams</h2>

      {safeExams.length === 0 ? (
        <p>No upcoming exams.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {safeExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white shadow rounded p-4 w-72 flex flex-col justify-between hover:shadow-lg transition"
            >
              <p className="font-semibold text-lg">{exam.name}</p>
              <p className="text-sm text-neutralText mt-1">Date: {exam.date}</p>
              {exam.location && (
                <p className="text-sm text-neutralText mt-1">Location: {exam.location}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingExams;
