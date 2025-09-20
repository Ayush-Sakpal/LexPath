import FeatureHighlights from "./FeatureHighlights";
import HeroSearchbar from "./HeroSearchbar";

function Hero() {
  return <center className="bg-accentPrimary text-white font-heading py-9">

    <div className="text-6xl my-4 font-logo">Conquer Law with Accredel</div>
    <div className="text-3xl my-4 text-lightText">Explore colleges, crack exams, and build your legal career.</div>

    <HeroSearchbar />

    <div className="flex justify-center space-x-6">

      <button className="bg-secondary hover:bg-amber-300 hover:cursor-pointer hover:shadow-lg text-primary text-xl w-2xs py-2 rounded inline-block">Explore Courses</button>

      <button className="border-white hover:border-amber-300 hover:cursor-pointer hover:bg-amber-300 hover:shadow-lg hover:text-primary rounded text-secondary text-xl w-2xs py-2  border-2 inline-block">Mock Tests</button>

    </div>

  </center>
}

export default Hero;