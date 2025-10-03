import { FaStar } from "react-icons/fa6";

function TestimonialCard({ testimonialBy, message, imageSrc, stars }) {
  const starArr = Array.from({ length: stars });

  return (
    <div className="bg-white w-80 h-96 px-6 py-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center justify-between text-center">
      {/* Avatar */}
      <img
        src={imageSrc}
        alt={testimonialBy}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />

      {/* Name */}
      <div className="text-lg font-heading font-bold">{testimonialBy} says:</div>

      {/* Message */}
      <p className="font-caption text-sm flex-1 mt-2 px-2 overflow-hidden">
        "{message}"
      </p>

      {/* Stars */}
      <div className="flex justify-center mt-4">
        {starArr.map((_, i) => (
          <FaStar key={i} className="text-secondary mx-0.5" />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCard;
