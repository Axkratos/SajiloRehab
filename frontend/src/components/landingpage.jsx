import React, { useEffect } from "react";
import HeroSection from "./landing/HeroSection";
import FeatureSection from "./landing/FeatureSection";
import Workflow from "./landing/Workflow";
import Footer from "./landing/Footer";
import Pricing from "./landing/Pricing";
import Testimonials from "./landing/Testimonials";

const App = () => {
      // Using the Node.js backend URL
const nodeBackendUrl = import.meta.env.VITE_API_NODE_BACKEND;

// Using the Python backend URL
const pythonBackendUrl = import.meta.env.VITE_API_PYTHON_BACKEND;
  useEffect(() => {
    const wakeUpBackends = async () => {
      //ping python bacjend
        await fetch(`${pythonBackendUrl}/wake-up`, { method: "GET" });

        // Ping Node.js backend
        await fetch(`${nodeBackendUrl}/wake-up`, { method: "GET" });
      
    };

    wakeUpBackends();
  }, [])
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