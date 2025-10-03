import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CollegeCard({ college }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Keep saved state in sync with localStorage
  useEffect(() => {
    const updateSavedState = () => {
      const savedColleges = JSON.parse(localStorage.getItem("savedColleges") || "[]");
      setSaved(savedColleges.includes(college.id));
    };

    updateSavedState(); // Run on mount

    window.addEventListener("storageChange", updateSavedState);
    return () => window.removeEventListener("storageChange", updateSavedState);
  }, [college.id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/save-college", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ collegeId: college.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save college");

      const savedColleges = JSON.parse(localStorage.getItem("savedColleges") || "[]");
      const updated = [...savedColleges, college.id];
      localStorage.setItem("savedColleges", JSON.stringify(updated));
      window.dispatchEvent(new Event("storageChange")); // notify others
    } catch (error) {
      alert(error.message || "Failed to save college");
    } finally {
      setSaving(false);
    }
  };

  const handleUnsave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/unsave-college", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ collegeId: college.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to unsave college");

      const savedColleges = JSON.parse(localStorage.getItem("savedColleges") || "[]");
      const updated = savedColleges.filter((id) => id !== college.id);
      localStorage.setItem("savedColleges", JSON.stringify(updated));
      window.dispatchEvent(new Event("storageChange")); // notify others
    } catch (error) {
      alert(error.message || "Failed to unsave college");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer flex flex-col">
      <div className="w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-lg">
        <img
          src={college.logo_url || college.image_url || "https://via.placeholder.com/400x200"}
          alt={college.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg md:text-xl font-heading font-bold text-primary mb-2 line-clamp-2">
          {college.name}
        </h2>
        <p className="text-neutralText font-paragraph text-sm md:text-base">
          {college.city}, {college.state}
        </p>
        {college.duration && (
          <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
            Duration: {college.duration} years
          </p>
        )}
        {college.rating && (
          <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
            Rating: {college.rating}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <Link
            to={`/college/${college.id}`}
            className="text-secondary font-semibold hover:underline text-sm md:text-base"
          >
            View Details →
          </Link>
          <button
            onClick={saved ? handleUnsave : handleSave}
            disabled={saving}
            className={`ml-3 px-3 py-1.5 rounded text-sm md:text-base font-medium transition 
              ${saved ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            {saving ? (saved ? "Removing..." : "Saving...") : saved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollegeCard;