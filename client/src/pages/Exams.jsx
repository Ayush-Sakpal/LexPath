import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");

  // 🔹 Exam level options
  const examLevels = ["National", "State", "University"];

  // 🔹 Exam mode options
  const examModes = ["Online", "Offline", "Hybrid"];

  // 🔹 Hardcoded exams list
  const hardcodedExams = [
    {
      id: 1,
      name: "CLAT (Common Law Admission Test)",
      level: "National",
      mode: "Offline",
      description: "National-level exam for admission into NLUs across India."
    },
    {
      id: 2,
      name: "AILET (All India Law Entrance Test)",
      level: "National",
      mode: "Offline",
      description: "Conducted by NLU Delhi for its law programs."
    },
    {
      id: 3,
      name: "LSAT India",
      level: "National",
      mode: "Online",
      description: "Conducted by Pearson VUE for private law colleges."
    },
    {
      id: 4,
      name: "MH CET Law",
      level: "State",
      mode: "Offline",
      description: "Maharashtra state-level law entrance for 3-year and 5-year programs."
    },
    {
      id: 5,
      name: "SLAT (Symbiosis Law Admission Test)",
      level: "University",
      mode: "Online",
      description: "Entrance exam for Symbiosis Law School."
    },
    {
      id: 6,
      name: "KIITEE Law",
      level: "University",
      mode: "Online",
      description: "Kalinga Institute of Industrial Technology’s law entrance exam."
    },
  ];

  useEffect(() => {
    setExams(hardcodedExams);
    setLoading(false);
  }, []);

  // 🔹 Filtering logic
  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(search.toLowerCase()) &&
      (level ? exam.level === level : true) &&
      (mode ? exam.mode === mode : true)
  );

  const clearFilters = () => {
    setSearch("");
    setLevel("");
    setMode("");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto flex-1 px-6 py-10">
        <h1 className="text-3xl font-heading font-bold mb-6">Law Entrance Exams</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search exams..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            {examLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">All Modes</option>
            {examModes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Exam Cards */}
        {loading ? (
          <p className="text-gray-600">Loading exams...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <div key={exam.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-bold">{exam.name}</h2>
                  <p className="text-sm mt-2">{exam.level} Level • {exam.mode} Mode</p>
                  <p className="text-gray-600 mt-2">{exam.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No exams found.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Exams;
