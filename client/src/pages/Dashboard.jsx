import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import SavedColleges from '../components/dashboard/SavedColleges'
import RecommendedJobs from '../components/dashboard/RecommendedJobs'
import MockTestProgress from '../components/dashboard/MockTestProgress'
import UpcomingExams from '../components/dashboard/UpcomingExams'
import StudentProfileCard from '../components/dashboard/StudentProfileCard'
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    
    const storedUser = localStorage.getItem("user");

    if(storedUser) {
      setUserData(JSON.parse(storedUser));
      setLoading(false);
    }
    else {
      setLoading(false);
      navigate("/login");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading dashboard...
      </div>
    );
  }

  if(!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        No user found. Please log in again.
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen flex flex-col'>

      <Navbar />

      <div className='flex flex-1'>

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6 space-y-6'>

          <h1 className='textx-3xl font-heading font-bold mb-4'>Welcome back, {userData.name}</h1>

          {/* Profile */}
          <StudentProfileCard user={userData} />

          {/* Grid of widgets */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <SavedColleges colleges={ userData.savedColleges} />
            <UpcomingExams exams={ userData.upcomingExams} />
            <RecommendedJobs jobs={ userData.recommendedJobs} />
            <MockTestProgress tests={ userData.mockTests} />
          </div>

        </main>

      </div>

      <Footer />

    </div>
  );

}

export default Dashboard;