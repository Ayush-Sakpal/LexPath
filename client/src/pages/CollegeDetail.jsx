import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CollegeDetail() {
  const { id } = useParams();

   // Temporary hardcoded sample data
  const colleges = [
    { id: 1, name: "National Law School of India University", city: "Bangalore", state: "Karnataka", duration: 5, rating: 4.9, description: "India’s top law school." },
    { id: 2, name: "NALSAR University of Law", city: "Hyderabad", state: "Telangana", duration: 5, rating: 4.7, description: "Renowned for legal research and policy." },
    { id: 3, name: "National Law University Delhi", city: "New Delhi", state: "Delhi", duration: 5, rating: 4.8, description: "Leading in constitutional and criminal law." },
  ];

  const college = colleges.find(c => c.id === parseInt(id));

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <div className="flex-1 flex items-center justify-center ">
          <p className="text-neutralText text-xl">College not found</p>
        </div>

        <Footer />
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-background flex flex-col">

      <Navbar />

      <div className="container mx-auto flex-1 px-6 py-10">

        <h1 className="text-4xl font-heading font-bold mb-4">{college.name}</h1>

        <p className="text-neutralText mb-2">
          {college.city}, {college.state}
        </p>

        <p className="text-neutralText">Duration: {college.duration} years</p>

        <p className="text-secondary">Rating: {college.rating}</p>

        <p className="mt-4">{college.description}</p>
      </div>

      <Footer />

    </div>
  
  );
}

export default Collegedetail;