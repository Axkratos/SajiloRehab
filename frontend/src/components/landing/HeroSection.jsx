import { useNavigate } from 'react-router-dom';
import image1 from '/deadbug.jpg'; // Replace with actual image path
import image2 from '/spinaltwist.jpg'; // Replace with actual image path

const HeroSection = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate

  const handleGetStarted = () => {
    navigate('/signup'); // Redirect to signup page
  };

  const handleLearnMore = () => {
    navigate('/about'); // Redirect to about page
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        SajiloRehab
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}for Faster Recovery
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Accelerate your rehabilitation with SajiloRehab’s AI-powered solutions. Get personalized exercise plans, real-time feedback, and track your progress every step of the way. Start your recovery journey with us today!
      </p>
      <div className="flex justify-center my-10">
        <button
          onClick={handleGetStarted} // Navigate to signup
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Get Started for Free
        </button>
        <button
          onClick={handleLearnMore} // Navigate to about
          className="py-3 px-4 mx-3 rounded-md border"
        >
          Learn More
        </button>
      </div>
      <div className="flex mt-10 justify-center">
        <img
          src={image1}
          alt="Image 1"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        />
        <img
          src={image2}
          alt="Image 2"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        />
      </div>
    </div>
  );
};

export default HeroSection;
