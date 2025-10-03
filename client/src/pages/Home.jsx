import FeatureHighlights from "../components/FeatureHighlights";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <FeatureHighlights />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
