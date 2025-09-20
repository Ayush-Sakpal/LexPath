import { useEffect, useState } from "react";
// import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollegeCard from "../components/CollegeCard";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter states
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [minRating, setMinRating] = useState(0.0);

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

  // Hardcoded colleges (temporary until backend is ready)
  const hardcodedColleges = [
    {
      id: 1,
      name: "National Law School of India University",
      city: "Bangalore",
      state: "Karnataka",
      duration: 5,
      rating: 4.9,
      image_url: "https://assets.telegraphindia.com/telegraph/2021/Nov/1635938068_nlsiu-resized.jpg"
    },
    {
      id: 2,
      name: "NALSAR University of Law",
      city: "Hyderabad",
      state: "Telangana",
      duration: 5,
      rating: 4.7,
      image_url: "https://assets.telegraphindia.com/telegraph/2021/Nov/1635938068_nlsiu-resized.jpg"
    },
    {
      id: 3,
      name: "National Law University Delhi",
      city: "New Delhi",
      state: "Delhi",
      duration: 5,
      rating: 4.8,
      image_url: "https://assets.telegraphindia.com/telegraph/2021/Nov/1635938068_nlsiu-resized.jpg"
    },
    {
      id: 4,
      name: "Gujarat National Law University",
      city: "Gandhinagar",
      state: "Gujarat",
      duration: 5,
      rating: 4.6,
      image_url: "https://assets.telegraphindia.com/telegraph/2021/Nov/1635938068_nlsiu-resized.jpg"
    },
    {
      id: 5,
      name: "National Law University Jodhpur",
      city: "Jodhpur",
      state: "Rajasthan",
      duration: 5,
      rating: 4.5,
      image_url: "https://assets.telegraphindia.com/telegraph/2021/Nov/1635938068_nlsiu-resized.jpg"
    },
  ];

  useEffect(() => {
    async function fetchColleges() {
      try {
        // const response = await api.get("/colleges");
        // setColleges(response.data);

        setColleges(hardcodedColleges); // Using hardcoded data for now
      }
      catch (error) {
        console.error("Error fetching colleges:", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  // Apply filters
  const filteredColleges = colleges.filter(
    (college) => {
      return (
        college.name.toLowerCase().includes(search.toLowerCase()) && (stateFilter ? college.state === stateFilter : true) 
        && college.rating >= minRating
      );
    }
  );

  // return
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto flex-1 px-6 py-10">

        <h1 className="text-3xl font-heading font-bold mb-6">Explore Colleges</h1>

        {/* Filter section */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4">
          <input 
            type="text"
            placeholder="Search by name..." 
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* State Filter */}
          <select
            className="border rounded px-3 py-2"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >

            <option value="">All States</option>

            {
              indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))
            }

          </select>

          {/* Rating Filter */}
          <select
            className="border rounded px-3 py-2"
            value={minRating}
            onChange={(e) => setStateFilter(e.target.value)}
          >

            <option value="0.0">All Ratings</option>

            {
              ratings.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))
            }

          </select>
        </div>

        {loading ? (
          <p className="text-lightText">Loading colleges...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ) )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Colleges;