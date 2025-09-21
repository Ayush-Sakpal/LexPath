import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import MockTests from "./pages/MockTests";
import Exams from "./pages/Exams";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/mock_tests" element={<MockTests/>} />
        <Route path="/exams" element={<Exams/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route 
          path="/admin_dashboard"  
          element={
            <ProtectedRoute allowesRoles = {["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard"  
          element={
              <ProtectedRoute allowesRoles = {["student", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );

  // return <h1>LawPath</h1>;
}

export default App;