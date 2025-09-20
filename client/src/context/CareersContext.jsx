import { createContext, useContext, useState } from "react";

const CareersContext = createContext();

export function CareersProvider({ children }) {
  const [careers, setCareers] = useState([
    {
      id: 1,
      title: "Corporate Lawyer",
      summary: "Specializes in corporate governance, compliance, and business law.",
      specialization: "Corporate Law",
    },
    {
      id: 2,
      title: "Criminal Lawyer",
      summary: "Focuses on defending or prosecuting individuals in criminal cases.",
      specialization: "Criminal Law",
    },
  ]);

  return (
    <CareersContext.Provider value={{ careers, setCareers }}>
      {children}
    </CareersContext.Provider>
  );
}

export const useCareers = () => useContext(CareersContext);
