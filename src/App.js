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
import CoachesPage from './pages/CoachesPage/CoachesPage';
import CoachProfile from './pages/CoachProfile/CoachProfile';
import NewsPage from './pages/NewsPage/NewsPage';
import EventPage from './pages/EventPage/EventPage';
import EventDetails from './pages/EventDetails/EventDetails';
import AthletesPage from './pages/AthletesPages/AthletesPages';
import AthleteDetails from './pages/AthletesDetails/AthletesDetails';
import ResultPage from './pages/ResultPage/ResultPage';
import EventResult from './pages/EventResult/EventResult';
import AthleteProfile from './pages/AthletesProfile/AthletesProfile';
import Coach from './pages/Coach/Coach';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import AdminEvent from './pages/AdminEvent/AdminEvent';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResultFormPage from './pages/ResultFormPage/ResultFormPage';
import PublishEventResult from './pages/PublishEventResult/PublishEventResult';
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
      
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/coaches' element={<CoachesPage/>}/>
        <Route path="/coach/:coachId" element={<CoachProfile />} />
        <Route path='/news'element={<NewsPage/>}/>
        <Route path='/events' element={<EventPage/>}/>
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path='/athletes' element={<AthletesPage/>}/>
        <Route path='/results' element={<ResultPage/>}/>
        <Route path="/athlete/:id" element={<AthleteDetails/>} />
        <Route path='/result/:eventId'element={<EventResult/>}/>
        <Route path='/profile' element={<AthleteProfile/>}/>
        <Route path='/coach' element={<Coach/>}/>
       




        <Route path='/event-form'element={<EventForm/>}/>
        <Route path='/meet-form' element={<MeetForm/>}/>
        <Route path='/shortlist/:eventId' element={<RegistrationPage/>}/>
        <Route path='/adminevent' element={<AdminEvent/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/publishresult' element={<PublishEventResult/>}/>
        <Route path='/result-form/:eventId' element={<ResultFormPage/>}/>
      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
