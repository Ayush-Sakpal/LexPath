import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import MockTests from "./pages/MockTests";
import Exams from "./pages/Exams";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/mock_tests" element={<MockTests/>} />
        <Route path="/exams" element={<Exams/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );

  // return <h1>LawPath</h1>;
}

export default App;