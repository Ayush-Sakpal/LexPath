import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Legal Intern",
      organisation: "Khaitan & Co",
      location: "Mumbai, Maharashtra",
      role_type: "Internship",
      apply_url: "https://example.com/apply/khaitan-internship",
    },
    {
      id: 2,
      title: "Junior Associate",
      organisation: "Trilegal",
      location: "New Delhi, Delhi",
      role_type: "Full-time",
      apply_url: "https://example.com/apply/trilegal-associate",
    },
  ]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
