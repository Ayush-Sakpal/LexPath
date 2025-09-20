import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
// import Careers from "./pages/Careers";
// import Jobs from "./pages/Jobs";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        {/* <Route path="/careers" element={<Careers />} />
        <Route path="/jobs" element={<Jobs />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
