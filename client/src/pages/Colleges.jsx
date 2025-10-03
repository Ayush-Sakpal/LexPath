import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollegeCard from "../components/CollegeCard";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minRating, setMinRating] = useState("0.0");
  const [maxDuration, setMaxDuration] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
    "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
    "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  const ratings = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));
  const types = ["Public", "Private"];

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch("http://localhost:5000/api/colleges");
        if (!res.ok) throw new Error("Failed to fetch colleges");
        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        alert("Error fetching colleges. Check backend.");
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  // Unique cities & courses
  const uniqueCities = Array.from(new Set(colleges.map(c => c.city))).sort();
  const allCourses = Array.from(new Set(colleges.flatMap(c => c.courses_offered || []))).sort();

  const toggleCourse = (course) => {
    setSelectedCourses(prev =>
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(search.toLowerCase()) &&
    (!stateFilter || college.state === stateFilter) &&
    (!cityFilter || college.city.toLowerCase() === cityFilter.toLowerCase()) &&
    (!typeFilter || college.type === typeFilter) &&
    (parseFloat(minRating) <= 0 || college.rating >= parseFloat(minRating)) &&
    (!maxDuration || college.duration <= parseInt(maxDuration)) &&
    (selectedCourses.length === 0 || selectedCourses.every(course => (college.courses_offered || []).includes(course)))
  );

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">Explore Colleges</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-lightText">Loading colleges...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map(college => (
              <CollegeCard key={college.id} college={college} />
            ))}
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
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="">All States</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            className="border rounded px-3 py-2 mb-3"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            <option value="0.0">All Ratings</option>
            {ratings.map(r => <option key={r} value={r}>{r} & up</option>)}
          </select>

          <input
            type="number"
            placeholder="Max Duration (years)"
            className="border rounded px-3 py-2 mb-3"
            value={maxDuration}
            onChange={(e) => setMaxDuration(e.target.value)}
          />

          <div className="relative mb-3" ref={dropdownRef}>
            <button
              className="border rounded px-3 py-2 w-full text-left"
              onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
            >
              {selectedCourses.length === 0 ? "All Courses" : selectedCourses.join(", ")}
            </button>
            {coursesDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow">
                {allCourses.map(course => (
                  <label key={course} className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course)}
                      onChange={() => toggleCourse(course)}
                      className="mr-2"
                    />
                    {course}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setStateFilter(""); setCityFilter(""); setTypeFilter("");
              setMinRating("0.0"); setMaxDuration(""); setSelectedCourses([]);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default Colleges;
