import { useState, useEffect } from "react";

function SavedColleges() {
  const [savedColleges, setSavedColleges] = useState([]);

  useEffect(() => {
    const fetchSavedColleges = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/users/saved-colleges", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setSavedColleges(data);
          localStorage.setItem("savedColleges", JSON.stringify(data.map(c => c.id)));
          window.dispatchEvent(new Event("storageChange"));
        }
      } catch (err) {
        console.error("Failed to fetch saved colleges", err);
      }
    };

    fetchSavedColleges();
  }, []);

  const handleRemoveCollege = async (collegeId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/remove-college", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ collegeId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to unsave college");

      const updated = savedColleges.filter(c => c.id !== collegeId);
      setSavedColleges(updated);

      localStorage.setItem("savedColleges", JSON.stringify(updated.map(c => c.id)));
      window.dispatchEvent(new Event("storageChange")); // notify CollegeCard
    } catch (error) {
      alert(error.message || "Failed to remove college");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Colleges</h2>

      {savedColleges.length === 0 ? (
        <p className="text-gray-600">No colleges saved yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">{college.name}</h3>
                <p className="text-gray-600">
                  {college.city}, {college.state}
                </p>
              </div>

              <button
                onClick={() => handleRemoveCollege(college.id)}
                className="mt-3 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedColleges;
