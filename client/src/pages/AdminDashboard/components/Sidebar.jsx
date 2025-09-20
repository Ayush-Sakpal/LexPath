function Sidebar({ activeTab, setActiveTab }) {
  const links = [
    { key: "overview", label: "Overview" },
    { key: "colleges", label: "Manage Colleges" },
    { key: "careers", label: "Manage Careers" },
    { key: "jobs", label: "Manage Jobs" },
    { key: "exams", label: "Manage Exams" },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        {links.map((link) => (
          <li key={link.key} className="mb-2">
            <button
              onClick={() => setActiveTab(link.key)}
              className={`block w-full text-left px-4 py-2 rounded ${
                activeTab === link.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
