function DashboardCard() {
  return (
    <aside className="w-64 bg-accentPrimary text-white p-6 hidden md:block">

      <h2 className="text-xl font-bold font-heading mb-6">My Dashboard</h2>

      <ul className="space-y-4">
        <li className="hover:bg-slate-700 px-3 py-2 rounded cursor-pointer">Saved Colleges</li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded cursor-pointer">Upcoming Exams</li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded cursor-pointer">Recommended Jobs</li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded cursor-pointer">Mock Test Progress</li>
      </ul>

    </aside>
  );
}

export default DashboardCard;