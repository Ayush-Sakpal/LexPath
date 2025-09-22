function MockTestProgress({ tests }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold font-heading mb-4">Mock Test Progress</h3>

      {(!tests || tests.length === 0) ? (
        <p>No mock test progress available.</p>
      ) : (
        <ul className="space-y-2">
          {tests.map((item) => (
            <li key={item.id} className="border-b pb-2">
              <p className="font-semibold">{item.test}</p>
              <p className="text-sm text-neutralText">{item.score}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MockTestProgress;
