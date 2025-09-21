import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import ManageColleges from "./ManageColleges";
import ManageCareers from "./ManageCareers";
import ManageJobs from "./ManageJobs";
import ManageExams from "./ManageExams";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role === "admin") {
        setAdminData(parsedUser);
      } else {
        // ❌ Non-admin users get redirected
        navigate("/dashboard");
      }
    } else {
      // Not logged in → redirect to login
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading admin dashboard...
      </div>
    );
  }

  if (!adminData) {
    return null; // already redirected
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <h1 className="text-3xl font-bold">Admin Overview</h1>
          )}
          {activeTab === "colleges" && <ManageColleges />}
          {activeTab === "careers" && <ManageCareers />}
          {activeTab === "jobs" && <ManageJobs />}
          {activeTab === "exams" && <ManageExams />}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
