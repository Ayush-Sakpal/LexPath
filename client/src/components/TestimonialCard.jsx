import { FaStar } from "react-icons/fa6";

function TestimonialCard(props) {
  const numStars = props.stars;
  
  const starArr = [];

  var i=0;

  for(i=0; i<numStars; i++){
    starArr.push(1);
  }

  return <div className="bg-white w-full h-full px-4 py-4 rounded shadow-md justify-items-center">

    <img src={props.imageSrc} alt="image" className="w-3xs h-3xs rounded-full"/>

    <div className="block text-xl my-4 font-heading font-bold">
      {props.testimonialBy} says:
    </div>

    <div className="block font-caption">
      "{props.message}"
    </div>

    <div className="flex my-3">
      {
        starArr.map((num) => (
          <FaStar className="text-secondary" />
        ))
      }
    </div>
  </div>
}

export default TestimonialCard;