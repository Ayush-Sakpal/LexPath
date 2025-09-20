import { useEffect, useState } from "react";
// import api from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareerCard from "../components/CareerCard";

function Careers() {

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Comprehensive specialization list
  const specializationOptions = [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Constitutional Law",
    "Family Law",
    "Labour & Employment Law",
    "Intellectual Property Law",
    "International Law",
    "Environmental Law",
    "Taxation Law",
    "Banking & Finance Law",
    "Real Estate Law",
    "Cyber Law",
    "Maritime Law",
    "Human Rights Law",
    "Competition Law",
    "Sports Law",
    "Media & Entertainment Law",
    "Aviation Law",
    "Energy Law"
  ];

  // Hardcoded careers
  const hardcodedCareers = [
    {
      id: 1,
      title: "Corporate Lawyer",
      summary: "Specializes in corporate governance, compliance, and business law.",
    },
    {
      id: 2,
      title: "Criminal Lawyer",
      summary: "Focuses on defending or prosecuting individuals in criminal cases.",
    },
    {
      id: 3,
      title: "Civil Rights Lawyer",
      summary: "Advocates for equality and justice, protecting individual rights.",
    },
    {
      id: 4,
      title: "Family Lawyer",
      summary: "Deals with divorce, custody, and family-related legal issues.",
    },
  ];

  useEffect(
    () => {
      async function fetchCareers() {
        try {
          // const res = await api.get('/careers');
          // setCareers(res.data);

          setCareers(hardcodedCareers);
        } catch (error) {
          console.error("Error fetching careers:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchCareers();
    }, 
    []
  );

  const filteredCareers = careers.filter(
    (career) =>
      career.title.toLowerCase().includes(search.toLowerCase()) &&
      (specialization ? career.specialization === specialization : true)
  );

  const clearFilters = () => {
    setSearch("");
    setSpecialization("");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <Navbar />

      <div className="container mx-auto flex-1 px-6 py-10">

        <h1 className="text-3xl font-heading font-bold mb-6">Career Roadmap</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search careers..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializationOptions.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
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

        {loading ? (
          <p className="text-neutralText">Loading careers...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <div key={career.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-bold">{career.title}</h2>
                  <p className="text-gray-600 mt-2">{career.summary}</p>
                  <p className="text-sm mt-2 italic">{career.specialization}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No careers found.</p>
            )}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Careers;