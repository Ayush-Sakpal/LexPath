import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MockTests() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto flex-1 px-6 py-10">
        <h1 className="font-heading text-3xl font-bold mb-6">
          Mock Tests coming soon...
        </h1>

        <Footer />
      </div>
    </div>
  );
}

export default MockTests;
