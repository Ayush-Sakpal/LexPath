import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import SavedColleges from "../components/dashboard/SavedColleges";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import MockTestProgress from "../components/dashboard/MockTestProgress";
import UpcomingExams from "../components/dashboard/UpcomingExams";
import StudentProfileCard from "../components/dashboard/StudentProfileCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const initDashboard = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || !token) {
        setLoading(false);
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);
      setUserData(user); // just user basics, rest handled by child components
      setLoading(false);
    };

    initDashboard();
  }, [navigate, token]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading dashboard...
      </div>
    );

  if (!userData)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        No user found. Please log in again.
      </div>
    );

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-3xl font-heading font-bold mb-6">
            Welcome back, {userData.name}
          </h1>

          {/* Profile */}
          <StudentProfileCard user={userData} />

          {/* Dashboard Sections */}
          <div className="space-y-6">
            {/* Saved Colleges (handles its own fetching/removal) */}
            <SavedColleges />

            {/* Recommended Jobs (will fetch internally too) */}
            <RecommendedJobs />

            {/* Upcoming Exams */}
            <UpcomingExams />

            {/* Mock Test Progress */}
            <MockTestProgress />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
