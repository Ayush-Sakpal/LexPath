import { Link } from "react-router-dom";
import { useState } from "react";

function CollegeCard({ college }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      if (!res.ok) throw new Error(data.message);

      setSaved(true);
    } catch (error) {
      alert(error.message || "Failed to save college");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer flex flex-col">
      
      {/* Image */}
      <div className="w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-lg">
        <img
          src={college.image_url}
          alt="Image Unavailable"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg md:text-xl font-heading font-bold text-primary mb-2 line-clamp-2">
          {college.name}
        </h2>

        <p className="text-neutralText font-paragraph text-sm md:text-base">
          {college.city}, {college.state}
        </p>

        <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
          Duration: {college.duration} years
        </p>

        <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
          Rating: {college.rating}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between">
          {/* View details */}
          <Link
            to={`/college/${college.id}`}
            className="text-secondary font-semibold hover:underline text-sm md:text-base"
          >
            View Details →
          </Link>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`ml-3 px-3 py-1.5 rounded text-sm md:text-base font-medium transition 
              ${saved ? "bg-green-500 text-white cursor-default" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            {saved ? "Saved" : saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollegeCard;