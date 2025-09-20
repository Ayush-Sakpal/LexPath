let jobs = [
  { id: 1, title: "Corporate Lawyer", summary: "Advises companies on legal issues." },
  { id: 2, title: "Litigation Lawyer", summary: "Represents clients in court." },
  { id: 3, title: "Legal Analyst", summary: "Researches and analyzes laws." },
];

export const getJobs = () => jobs;

export const addJob = (job) => {
  jobs = [...jobs, {id: Date.now(), ...job}];
  return jobs;
};

export const updateJob = (id, updatedFields) => {
  jobs = jobs.map((j) => (
    j.id === id ? {...j, ...updatedFields} : j
  ));

  return jobs;
};

export const deteleJob = (id) => {
  jobs = jobs.filter((j) => (j.id !== id));
  return jobs;
};