import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  const testimonials = [
    {
      testimonialBy: "Aayush",
      message: "Still thanking God for directing me to LexPath.",
      image: 'https://as1.ftcdn.net/v2/jpg/07/63/53/64/1000_F_763536492_8nD0eOD30NsBjk7p5mwOI8J118HKpCRv.jpg',
      stars: 4
    },
    {
      testimonialBy: "Revati",
      message: "Can't find a better guide than this.",
      image: 'https://img.freepik.com/premium-photo/3d-avatar-character_113255-32301.jpg',
      stars: 5
    },
    {
      testimonialBy: "Samvid",
      message: "Best courses at lowest prices.",
      image: 'https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13628.jpg?w=2000',
      stars: 5
    },
    {
      testimonialBy: "Ghana Raut",
      message: "Thanks to the Lexpath team for providing such a quality information.",
      image: 'https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13628.jpg?w=2000',
      stars: 3
    },
  ];

  return (
    <div className="mx-14 my-12 py-6">
      <p className="text-4xl my-4 font-heading font-bold">Testimonials</p>
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {testimonials.map((testimonail) => (
          <div className="flex-shrink-0 w-screen md:w-1/2 lg:w-1/3 snap-center px-4">
            <TestimonialCard
              testimonialBy={testimonail.testimonialBy}
              message={testimonail.message}
              imageSrc={testimonail.image}
              stars={testimonail.stars}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
