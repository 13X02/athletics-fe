import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import '@fontsource/poppins';
import '@fontsource/roboto';

// Import all your page components here
import Login from './pages/Login/Login';
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
import { getToken ,getUserRole } from './utils/AppUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const userRole = getUserRole(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(userRole)) {
      navigate('/unauthorized');
    }
  }, [token, userRole, allowedRoles, navigate]);

  if (!token || (allowedRoles && !allowedRoles.includes(userRole))) {
    return null;
  }

  return children;
};

const RoleBasedDashboard = () => {
  const token = getToken()
  const userRole = getUserRole(token);
  console.log(userRole);

  switch (userRole) {
    case 'ATHLETE':
      return <AthleteProfile />;
    case 'COACH':
      return <Coach />;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return <NotFound />;
  }
};

function App() {
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getToken();
      if (token) {
        // Decode the token to get the expiration time
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds

        if (Date.now() >= expirationTime) {
          // Token has expiredt
          localStorage.removeItem('authToken');
          // Redirect to login page or update state to reflect logged out status
          window.location.href = '/login';
        }
      }
    };

    // Check token expiration on component mount and every minute
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/coach/:coachId" element={<CoachProfile />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/athlete/:id" element={<AthleteDetails />} />
        <Route path="/result/:eventId" element={<EventResult />} />
        <Route path="/" element={<Dashboard />} />

        {/* Protected routes */}
        <Route path="/athlete-form" element={<ProtectedRoute><AthleteForm /></ProtectedRoute>} />
        <Route path="/coach-form" element={<ProtectedRoute><CoachForm /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><RoleBasedDashboard /></ProtectedRoute>} />

        {/* Admin only routes */}
        <Route path="/event-form" element={<ProtectedRoute allowedRoles={['ADMIN']}><EventForm /></ProtectedRoute>} />
        <Route path="/meet-form" element={<ProtectedRoute allowedRoles={['ADMIN']}><MeetForm /></ProtectedRoute>} />
        <Route path="/shortlist/:eventId" element={<ProtectedRoute allowedRoles={['ADMIN']}><RegistrationPage /></ProtectedRoute>} />
        <Route path="/adminevent" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminEvent /></ProtectedRoute>} />
        <Route path="/publishresult" element={<ProtectedRoute allowedRoles={['ADMIN']}><PublishEventResult /></ProtectedRoute>} />
        <Route path="/result-form/:eventId" element={<ProtectedRoute allowedRoles={['ADMIN']}><ResultFormPage /></ProtectedRoute>} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;