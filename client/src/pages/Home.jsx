import FeatureHighlights from "../components/FeatureHighlights"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Testimonials from "../components/Testimonials"

function Home(){
  return (
    <center className="bg-background">
      <Navbar />

      <Hero />

      <FeatureHighlights />

      <Testimonials />

      <Footer />
    </center>
  )
}

export default Home;