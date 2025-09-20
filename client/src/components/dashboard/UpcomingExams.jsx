function UpcomingExams({exams}) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="text-xl font-bold font-heading mb-4">Upcoming Exams</h3>

      <ul className="space-y-2">
         {
          exams.map((exam) => (
            <li key={exam.id} className="border-b pb-2">
              <p className="font-semibold">{exam.name}</p>

              <p className="text-sm text-neutralText">{exam.date}</p>
            </li>
          ))
         }
      </ul>

    </div>
  );
}

export default UpcomingExams;