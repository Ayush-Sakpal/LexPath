import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import ManageColleges from "./ManageColleges";
import ManageCareers from "./ManageCareers";
import ManageJobs from "./ManageJobs";
import ManageExams from "./ManageExams";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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