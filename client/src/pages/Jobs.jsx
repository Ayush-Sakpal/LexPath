import { useEffect, useState } from "react";
// import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [roleType, setRoleType] = useState("");

  // Full list of states
  const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
    "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
    "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  // Comprehensive role types
  const roleTypes = [
    "Internship",
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Temporary",
    "Volunteer",
    "Remote"
  ];


  // Hardcoded jobs
  const hardcodedJobs = [
    {
      id: 1,
      title: "Legal Intern",
      organisation: "Khaitan & Co",
      location: "Mumbai, Maharashtra",
      role_type: "Internship",
      apply_url: "https://example.com/apply/khaitan-internship",
    },
    {
      id: 2,
      title: "Junior Associate",
      organisation: "Trilegal",
      location: "New Delhi, Delhi",
      role_type: "Full-time",
      apply_url: "https://example.com/apply/trilegal-associate",
    },
    {
      id: 3,
      title: "Research Intern",
      organisation: "National Law University Delhi",
      location: "Delhi",
      role_type: "Internship",
      apply_url: "https://example.com/apply/nlu-research",
    },
    {
      id: 4,
      title: "Paralegal",
      organisation: "AZB & Partners",
      location: "Bangalore, Karnataka",
      role_type: "Full-time",
      apply_url: "https://example.com/apply/azb-paralegal",
    },
  ];

  useEffect(() => {
    async function fetchJobs() {
      try {
        // const res = await api.get("/jobs");
        // setJobs(res.data);

      setJobs(hardcodedJobs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.organisation.toLowerCase().includes(search.toLowerCase())) &&
      (location ? job.location === location : true) &&
      (roleType ? job.role_type === roleType : true)
  );

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setRoleType("");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <Navbar/>

      <div className="container mx-auto flex-1 px-6 py-10">

        <h1 className="font-heading text-3xl font-bold mb-6">Jobs & Internships</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
          >
            <option value="">All Roles</option>
            {roleTypes.map((role) => (
              <option key={role} value={role}>
                {role}
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

        {
          loading ? 
          (
            <p className="text-neutralText">Loading jobs...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="text-gray-600">{job.organisation}</p>
                  <p className="text-sm mt-2">{job.location}</p>
                  <p className="text-sm mt-2">{job.role_type}</p>
                  <a
                    href={job.apply_url}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Apply Now →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No jobs found.</p>
            )}
            </div>
          )
        }
      </div>

      <Footer/>
    </div>
  );
}

export default Jobs;