function CareerCard({ career }) {
  return (
    <div
      key={career.id}
      className="bg-white p-6 rounded shadow hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold font-heading">{career.title}</h2>

      <p className="text-neutralText mt-2">{career.summary}</p>
    </div>
  );
}

export default CareerCard;
