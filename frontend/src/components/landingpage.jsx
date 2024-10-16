
import HeroSection from "./landing/HeroSection";
import FeatureSection from "./landing/FeatureSection";
import Workflow from "./landing/Workflow";
import Footer from "./landing/Footer";
import Pricing from "./landing/Pricing";
import Testimonials from "./landing/Testimonials";

const App = () => {
  return (
    <>
      
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default App;