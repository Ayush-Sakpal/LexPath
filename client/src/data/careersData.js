let careers = [
  { id: 1, title: "Corporate Lawyer", summary: "Advises companies on legal issues." },
  { id: 2, title: "Litigation Lawyer", summary: "Represents clients in court." },
  { id: 3, title: "Legal Analyst", summary: "Researches and analyzes laws." },
];

export const getCareers = () => careers;

export const addCareer = (career) => {
  careers = [...careers, {id: Date.now(), ...career}];
  return careers;
};

export const updateCareer = (id, updatedFields) => {
  careers = careers.map((c) => (
    c.id === id ? {...c, ...updatedFields} : c
  ));

  return careers;
};

export const deteleCareer = (id) => {
  careers = careers.filter((c) => (c.id !== id));
  return careers;
};