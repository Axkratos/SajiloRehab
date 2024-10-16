import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side Content */}
          <div className="md:w-1/2 p-8 bg-gradient-to-r from-orange-600 to-red-600 text-white flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-6">SajiloRehab</h1>
            <p className="text-xl mb-6 leading-relaxed">
              Struggling to bounce back from an injury? Feeling lost in your recovery journey? 😞 Fear not! SajiloRehab is here to transform your rehabilitation experience into a powerful comeback story! 🎉
            </p>
            <p className="text-lg leading-relaxed">
              Imagine having a personal coach right in your pocket—one who not only guides you through tailored exercise plans but also monitors your form in real-time! 💻✨ With SajiloRehab, you’ll receive expert-level rehab support anytime, anywhere, making recovery not just effective but also enjoyable.
            </p>
          </div>

          {/* Right Side Content */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-orange-400 mb-6">How to Get Started? 🍡</h2>
            <ul className="space-y-4">
              <li className="text-lg">
                🌟 <span className="font-semibold text-white">Onboarding:</span> Share your injury details and goals—let's get personal!
              </li>
              <li className="text-lg">
                💪 <span className="font-semibold text-white">Tailored Workouts:</span> Get custom exercise plans designed just for you!
              </li>
              <li className="text-lg">
                📈 <span className="font-semibold text-white">Real-Time Feedback:</span> Perfect your form with instant corrections as you work out!
              </li>
              <li className="text-lg">
                🏆 <span className="font-semibold text-white">Track Your Progress:</span> Celebrate milestones and stay motivated every step of the way!
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="p-8 bg-neutral-800">
          <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">
            Why Choose SajiloRehab? 🌟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem Solving */}
            <div className="p-6 bg-neutral-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-orange-500 mb-4">The Problem We’re Solving</h3>
              <p className="text-lg text-gray-300">
                Many people struggle with recovery, feeling isolated and unsure of their progress. 😔 SajiloRehab bridges that gap, providing both emotional support and expert guidance. Your AI coach will cheer you on through every challenge! 🎉
              </p>
            </div>

            {/* AI Coach Section */}
            <div className="p-6 bg-neutral-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-orange-500 mb-4">Meet Your AI Rehab Coach</h3>
              <ul className="list-disc list-inside text-lg text-gray-300">
                <li>💪 <span className="font-semibold text-white">Motivate you</span> to stay committed to your recovery.</li>
                <li>📚 <span className="font-semibold text-white">Teach you</span> the best practices for every exercise.</li>
                <li>🎉 <span className="font-semibold text-white">Celebrate your achievements</span> and keep you focused on your goals!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="p-8 bg-neutral-900 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Recovery Journey?</h2>
          <p className="text-lg text-gray-300 mb-10">
            Join us at SajiloRehab and turn your setbacks into comebacks—because healing should be as fierce as you are!
          </p>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-orange-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Get Started Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
