// src/data/userData.js
const userData = {
  id: 1,
  name: "Aayush Sakpal",
  email: "aayush@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aayush", // fake avatar generator

  savedColleges: [
    { id: 1, name: "NLSIU Bangalore", rating: 4.9 },
    { id: 2, name: "NLU Delhi", rating: 4.8 },
  ],

  upcomingExams: [
    { id: 1, name: "CLAT 2025", date: "December 2025" },
    { id: 2, name: "AILET 2025", date: "January 2025" },
  ],

  recommendedJobs: [
    { id: 1, title: "Legal Intern", organisation: "Khaitan & Co" },
    { id: 2, title: "Junior Associate", organisation: "Trilegal" },
  ],

  mockTests: [
    { id: 1, test: "CLAT Mock 1", score: "85/100" },
    { id: 2, test: "AILET Mock 1", score: "78/100" },
  ],
};

export default userData;
