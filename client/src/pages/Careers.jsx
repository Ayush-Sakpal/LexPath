import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareerCard from "../components/CareerCard";

function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Options
  const fieldOptions = ["Law", "Business", "Engineering", "Medical", "Arts", "Science", "IT"];
  const specializationOptions = [
    "Corporate Law", "Criminal Law", "Civil Law", "Constitutional Law",
    "Family Law", "Labour & Employment Law", "Intellectual Property Law",
    "International Law", "Environmental Law", "Taxation Law"
  ];
  const skillsOptions = ["Negotiation", "Research", "Writing", "Critical Thinking", "Leadership", "Analysis", "Communication"];

  // Fetch careers from backend
  useEffect(() => {
    async function fetchCareers() {
      try {
        const res = await fetch("http://localhost:5000/api/careers");
        if (!res.ok) throw new Error("Failed to fetch careers");
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
        alert("Error fetching careers. Check backend.");
      } finally {
        setLoading(false);
      }
    }
    fetchCareers();
  }, []);

  // Toggle skills selection
  const toggleSkill = (skill) => {
    setSkillsFilter(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Close skills dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSkillsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter careers
  const filteredCareers = careers.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (!fieldFilter || c.field === fieldFilter) &&
    (!specializationFilter || c.specialization === specializationFilter) &&
    (skillsFilter.length === 0 || skillsFilter.every(skill => (c.skills_required || []).includes(skill)))
  );

  const clearFilters = () => {
    setSearch("");
    setFieldFilter("");
    setSpecializationFilter("");
    setSkillsFilter([]);
    setDrawerOpen(false);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">Career Roadmap</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </button>
        </div>

        <input
          type="text"
          placeholder="Search careers..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-neutralText">Loading careers...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.length > 0 ? (
              filteredCareers.map(career => (
                <CareerCard key={career.id} career={career} />
              ))
            ) : (
              <p className="text-gray-600">No careers found.</p>
            )}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
                    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button className="text-red-500 font-bold" onClick={() => setDrawerOpen(false)}>✕</button>
          </div>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
          >
            <option value="">All Fields</option>
            {fieldOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Skills multi-select */}
          <div className="relative mb-3" ref={dropdownRef}>
            <button
              className="border rounded px-3 py-2 w-full text-left"
              onClick={() => setSkillsDropdownOpen(!skillsDropdownOpen)}
            >
              {skillsFilter.length === 0 ? "All Skills" : skillsFilter.join(", ")}
            </button>
            {skillsDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow">
                {skillsOptions.map(skill => (
                  <label key={skill} className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skillsFilter.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 cursor-pointer"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      <Footer />
    </div>
  );
}

export default Careers;
