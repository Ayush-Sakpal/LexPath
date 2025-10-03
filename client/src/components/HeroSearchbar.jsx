import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

function HeroSearchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full md:w-1/2 flex my-12 rounded-3xl mx-auto">
      <input
        type="text"
        placeholder="Search by college, exam, or career"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-primary bg-white focus:outline-none w-full text-lg rounded-l-3xl px-4 py-2"
      />

      <button
        onClick={handleSearch}
        className="flex items-center justify-center hover:cursor-pointer rounded-r-3xl bg-accentPrimary px-4 border-r-2 border-t-2 border-b-2 border-white"
      >
        <IoMdSearch className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

export default HeroSearchbar;
