import { Link } from "react-router-dom";

function CollegeCard({ college }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer flex flex-col">
      
      {/* Image */}
      <div className="w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-lg">
        <img
          src={college.image_url}
          alt="Image Unavailable"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg md:text-xl font-heading font-bold text-primary mb-2 line-clamp-2">
          {college.name}
        </h2>

        <p className="text-neutralText font-paragraph text-sm md:text-base">
          {college.city}, {college.state}
        </p>

        <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
          Duration: {college.duration} years
        </p>

        <p className="text-neutralText font-paragraph text-sm md:text-base mt-1">
          Rating: {college.rating}
        </p>

        {/* View details button */}
        <Link
          to={`/college/${college.id}`}
          className="mt-auto inline-block text-secondary font-semibold hover:underline text-sm md:text-base"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default CollegeCard;