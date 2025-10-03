import { useNavigate } from "react-router-dom";
import HighlightCard from "./HighlightCard";
import { RiGraduationCapFill, RiRoadMapFill } from "react-icons/ri";
import { PiExamFill } from "react-icons/pi";

function FeatureHighlights() {
  const navigate = useNavigate();

  return (
    <section className="px-6 my-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
          Explore Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <HighlightCard
            onClick={() => navigate("/colleges")}
            icon={<RiGraduationCapFill className="h-full w-full text-accentPrimary" />}
            title="Find Colleges"
          />
          <HighlightCard
            onClick={() => navigate("/career-roadmap")}
            icon={<RiRoadMapFill className="h-full w-full text-accentPrimary" />}
            title="Career Roadmap"
          />
          <HighlightCard
            onClick={() => navigate("/mock_tests")}
            icon={<PiExamFill className="h-full w-full text-accentPrimary" />}
            title="Mock Tests"
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlights;
