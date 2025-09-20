let exams = [
  { id: 1, name: "CLAT" },
  { id: 2, name: "AILET" },
  { id: 3, name: "LSAT India" },
];

export const getExams = () => exams;

export const addExam = (exam) => {
  exams = [...exams, { id: Date.now(), ...exam }];
  return exams;
};

export const updateExam = (id, updatedFields) => {
  exams = exams.map((e) => (e.id === id ? { ...e, ...updatedFields } : e));
  return exams;
};

export const deleteExam = (id) => {
  exams = exams.filter((e) => e.id !== id);
  return exams;
};