function MockTestProgress({ tests }) {
  const safeTests = Array.isArray(tests) ? tests : [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mock Test Progress</h2>

      {safeTests.length === 0 ? (
        <p>No mock test progress available.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {safeTests.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded p-4 w-72 flex flex-col justify-between hover:shadow-lg transition"
            >
              <p className="font-semibold text-lg">{item.test}</p>
              <p className="text-sm text-neutralText mt-1">Score: {item.score}</p>
              {item.date && (
                <p className="text-sm text-neutralText mt-1">Date: {item.date}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MockTestProgress;
