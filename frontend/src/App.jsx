import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Exercise from './components/ExerciseCard';
import Bicep from './Exercises/bicep/bicep';
import Login from './components/login';
import Register from './components/register'
import LandingPage from './components/landingpage';
import NotFound from './components/notFound';


const App = () => {
  const [exercises, setExercises] = useState('');

  return (
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
        <Route path="/exercise/bicep-curls" element={<Bicep />} />
      </Routes>
    </Router>
  );
};

export default App;
