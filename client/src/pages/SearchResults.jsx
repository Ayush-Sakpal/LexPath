import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState({ colleges: [], exams: [], careers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (!query) return <div className="px-6 py-12">Please enter a search term.</div>;
  if (loading) return <div className="px-6 py-12">Searching for "{query}"...</div>;

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-heading font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {/* Colleges */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Colleges</h2>
        {results.colleges.length > 0 ? (
          <ul className="space-y-3">
            {results.colleges.map((c) => (
              <Link key={c.id} to={`/colleges/${c.id}`}>
                <li className="p-4 bg-white rounded shadow hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-sm text-gray-600">
                    {c.city}, {c.state}, {c.country}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No colleges found</p>
        )}
      </section>

      {/* Exams */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exams</h2>
        {results.exams.length > 0 ? (
          <ul className="space-y-3">
            {results.exams.map((e) => (
              <Link key={e.id} to={`/exams/${e.id}`}>
                <li className="p-4 bg-white rounded shadow hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <p className="font-bold">{e.name}</p>
                  <p className="text-sm text-gray-600">
                    {e.conducting_body} • {e.level}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No exams found</p>
        )}
      </section>

      {/* Careers */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Careers</h2>
        {results.careers.length > 0 ? (
          <ul className="space-y-3">
            {results.careers.map((c) => (
              <Link key={c.id} to={`/careers/${c.id}`}>
                <li className="p-4 bg-white rounded shadow hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <p className="font-bold">{c.title}</p>
                  <p className="text-sm text-gray-600">
                    {c.field} • {c.specialization}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No careers found</p>
        )}
      </section>
    </div>
  );
}

export default SearchResults;
