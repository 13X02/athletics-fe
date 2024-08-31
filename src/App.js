import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this file does not conflict with Tailwind
import '@fontsource/poppins';
import '@fontsource/roboto';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import AthleteForm from './pages/AthleteForm/AthleteForm';
import NotFound from './pages/NotFound/NotFound';
import CoachForm from './pages/CoachForm/CoachForm';
import EventForm from './pages/EventForm/EventForm';
import MeetForm from './pages/MeetForm/MeetForm';
import Dashboard from './pages/DashBoard/Dashboard';
function App() {

 
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/athlete-form" element={<AthleteForm />} />
        <Route path='/coach-form' element={<CoachForm/>}/>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/event-form'element={<EventForm/>}/>
        <Route path='/meet-form' element={<MeetForm/>}/>
        <Route path='/' element={<Dashboard/>}/>
        

      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
