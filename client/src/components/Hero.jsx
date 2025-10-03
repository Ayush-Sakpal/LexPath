import { useNavigate } from "react-router-dom";
import HeroSearchbar from "./HeroSearchbar";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-accentPrimary text-white font-heading py-12 text-center">
      <div className="text-5xl md:text-6xl my-4 font-logo">
        Conquer Law with Accredel
      </div>
      <div className="text-2xl md:text-3xl my-4 text-lightText">
        Explore colleges, crack exams, and build your legal career.
      </div>

      <HeroSearchbar />

      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => navigate("/courses")}
          className="bg-secondary hover:bg-amber-300 hover:shadow-lg text-primary text-lg md:text-xl px-6 py-2 rounded w-40 transition"
        >
          Explore Courses
        </button>

        <button
          onClick={() => navigate("/mock_tests")}
          className="border-2 border-white hover:border-amber-300 hover:bg-amber-300 hover:text-primary hover:shadow-lg text-secondary text-lg md:text-xl px-6 py-2 rounded w-40 transition"
        >
          Mock Tests
        </button>
      </div>
    </section>
  );
}

export default Hero;
