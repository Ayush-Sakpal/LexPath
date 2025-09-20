import HighlightCard from "./HighlightCard";
import { RiGraduationCapFill } from "react-icons/ri";
import { RiRoadMapFill } from "react-icons/ri";
import { PiExamFill } from "react-icons/pi";

function FeatureHighlights() {
  return <div className="grid grid-cols-3 gap-12 my-4 mx-18">
    <HighlightCard icon = {<RiGraduationCapFill className="h-full w-full text-accentPrimary"/>} title = {'Find Colleges'} />
    <HighlightCard icon = {<RiRoadMapFill className="h-full w-full text-accentPrimary"/>} title = {'Career Roadmap'} />
    <HighlightCard icon = {<PiExamFill className="h-full w-full text-accentPrimary"/>} title = {'Mock Tests'} />
  </div>
}

export default FeatureHighlights;