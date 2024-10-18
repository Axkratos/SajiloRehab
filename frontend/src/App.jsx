import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Navbar from './components/landing/Navbar';
import Login from './components/login';
import Register from './components/register';
import LandingPage from './components/landingpage';
import Pricing from './components/landing/Pricing';
import NotFound from './components/notFound';
import Exercise from './components/ExerciseCard'; // Direct import
import Bicep from './Exercises/bicep/bicep'; // Direct import
import About from './components/about'; // Direct import
import Test from './test.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const [exercises, setExercises] = useState('');

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/chat" element={<Chat setExercises={setExercises} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard exercises={exercises} />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/price" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/exercise/bicep-curls" element={<Bicep />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
