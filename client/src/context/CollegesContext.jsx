import { createContext, useContext, useState } from "react";

// Create Context
const CollegesContext = createContext();

// Provider Component
export function CollegesProvider({ children }) {
  const [colleges, setColleges] = useState([
    { id: 1, name: "NLSIU Bangalore", city: "Bangalore", state: "Karnataka", duration: 5, rating: 4.9 },
    { id: 2, name: "NALSAR Hyderabad", city: "Hyderabad", state: "Telangana", duration: 5, rating: 4.7 },
    { id: 3, name: "NLU Delhi", city: "New Delhi", state: "Delhi", duration: 5, rating: 4.8 },
  ]);

  const addCollege = (college) =>
    setColleges([...colleges, { id: Date.now(), ...college }]);

  const updateCollege = (id, updatedFields) =>
    setColleges(colleges.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)));

  const deleteCollege = (id) =>
    setColleges(colleges.filter((c) => c.id !== id));

  return (
    <CollegesContext.Provider value={{ colleges, addCollege, updateCollege, deleteCollege }}>
      {children}
    </CollegesContext.Provider>
  );
}

// Hook for easy access
export const useColleges = () => useContext(CollegesContext);