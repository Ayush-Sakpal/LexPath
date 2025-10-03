function CareerCard({ career }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
      {/* Title */}
      <h2 className="text-xl font-bold font-heading mb-2">{career.title}</h2>

      {/* Field & Specialization */}
      <div className="text-sm text-gray-500 mb-2">
        <span className="mr-2 font-semibold">Field:</span>{career.field || "N/A"} <br />
        <span className="mr-2 font-semibold">Specialization:</span>{career.specialization || "N/A"}
      </div>

      {/* Summary */}
      <p className="text-gray-700 flex-1">{career.summary || "No summary available."}</p>

      {/* Skills */}
      {career.skills_required && career.skills_required.length > 0 && (
        <div className="mt-4">
          <span className="font-semibold text-gray-600">Skills:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {career.skills_required.map(skill => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerCard;
