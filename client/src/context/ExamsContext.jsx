import { createContext, useContext, useState } from "react";

const ExamsContext = createContext();

export function ExamsProvider({ children }) {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "CLAT (Common Law Admission Test)",
      level: "National",
      mode: "Offline",
      description: "National-level exam for admission into NLUs across India.",
    },
    {
      id: 2,
      name: "AILET (All India Law Entrance Test)",
      level: "National",
      mode: "Offline",
      description: "Conducted by NLU Delhi for its law programs.",
    },
  ]);

  return (
    <ExamsContext.Provider value={{ exams, setExams }}>
      {children}
    </ExamsContext.Provider>
  );
}

export const useExams = () => useContext(ExamsContext);
