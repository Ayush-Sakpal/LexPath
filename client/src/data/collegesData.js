let colleges = [
  { id: 1, name: "NLSIU Bangalore", city: "Bangalore", state: "Karnataka", duration: 5, rating: 4.9 },
  { id: 2, name: "NALSAR Hyderabad", city: "Hyderabad", state: "Telangana", duration: 5, rating: 4.7 },
  { id: 3, name: "NLU Delhi", city: "New Delhi", state: "Delhi", duration: 5, rating: 4.8 },
];

export const getColleges = () => colleges;

export const addCollege = (college) => {
  colleges = [...colleges, {id: Date.now(), ...college}];
  return colleges;
};

export const updateCollege = (id, updatedFields) => {
  colleges = colleges.map((c) => (
    c.id === id ? {...c, ...updatedFields} : c
  ));

  return colleges;
};

export const deteleCollege = (id) => {
  colleges = colleges.filter((c) => (c.id !== id));
  return colleges;
};