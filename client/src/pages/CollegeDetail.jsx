import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CollegeDetails() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/colleges/${id}`);
        const data = await res.json();
        setCollege(data);
      } catch (err) {
        console.error("Error fetching college:", err);
      }
    };
    fetchCollege();
  }, [id]);

  if (!college) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading font-bold mb-4">{college.name}</h1>
      <p className="text-lg text-gray-700">
        {college.city}, {college.state}, {college.country}
      </p>
      <p className="mt-4 text-gray-600">Established in {college.established_year}</p>
      <p className="mt-6">{college.description || "No description available."}</p>
    </div>
  );
}

export default CollegeDetails;
