import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample options
  const industryOptions = ["Law", "Finance", "IT", "Education", "Business", "Consulting"];
  const experienceOptions = ["Intern", "Fresher", "Experienced"];
  const skillsOptions = ["Research", "Writing", "Negotiation", "Communication", "Analysis", "Leadership"];

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

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

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(search.toLowerCase()) ||
     job.organisation.toLowerCase().includes(search.toLowerCase())) &&
    (!industryFilter || job.industry === industryFilter) &&
    (!experienceFilter || job.experience_level === experienceFilter) &&
    (skillsFilter.length === 0 || skillsFilter.every(skill => (job.skills_required || []).includes(skill)))
  );

  const clearFilters = () => {
    setSearch("");
    setIndustryFilter("");
    setExperienceFilter("");
    setSkillsFilter([]);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">Jobs & Internships</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </button>
        </div>

        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-neutralText">Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-600">No jobs found.</p>
            )}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50
                    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button className="text-red-500 font-bold" onClick={() => setDrawerOpen(false)}>
              ✕
            </button>
          </div>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="">All Industries</option>
            {industryOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="">All Experience Levels</option>
            {experienceOptions.map(exp => <option key={exp} value={exp}>{exp}</option>)}
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
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      <Footer />
    </div>
  );
}

export default Jobs;
