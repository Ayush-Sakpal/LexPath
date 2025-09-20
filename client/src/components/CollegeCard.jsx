import { Link } from "react-router-dom";

function CollegeCard({ college }) {
  return <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">

    <img src={college.image_url} alt="Image Unavailable" className="w-full h-2/3 rounded-lg my-2 shadow hover:shadow-lg"/>

    <h2 className="text-xl font-heading font-bold text-primary mb-2">{college.name}</h2>

    <p className="text-neutralText font-paragraph text-sm">{college.city}, {college.state}</p>

    <p className="text-neutralText font-paragraph text-sm mt-1">Duration: {college.duration} years</p>

    <p className="text-neutraltext font-paragraph text-sm mt-1">Rating: {college.rating}</p>

    {/* <p className="text-neutralText font-paragraph text-sm mt-1">Fees: {college.fees?.annual}/year</p>

    <p className="text-neutralText font-paragraph text-sm mt-1">Exams Accepted: {college.accepted_exams?.join(', ')}</p> */}

    <Link to={`/college/${college.id}`} className="text-secondary font-semibold hover:underline mt-3 block">
        View Details →
    </Link>

  </div>;
}

export default CollegeCard;
