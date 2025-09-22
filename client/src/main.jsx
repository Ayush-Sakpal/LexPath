import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CollegesProvider } from "./context/CollegesContext.jsx";
import { JobsProvider } from "./context/JobsContext.jsx";
import { ExamsProvider } from "./context/ExamsContext.jsx";
import { CareersProvider } from "./context/CareersContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CollegesProvider>
        <JobsProvider>
          <ExamsProvider>
            <CareersProvider>
              <App />
            </CareersProvider>
          </ExamsProvider>
        </JobsProvider>
      </CollegesProvider>
    </AuthProvider>
  </StrictMode>
);