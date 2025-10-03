function HighlightCard({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded shadow-md hover:cursor-pointer hover:shadow-xl text-xl transition w-64 h-60 flex flex-col items-center justify-center text-center"
    >
      <div className="h-20 w-20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
    </div>
  );
}

export default HighlightCard;
