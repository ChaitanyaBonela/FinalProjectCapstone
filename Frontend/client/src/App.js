import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard'; 
import WelcomePage from './pages/WelcomePage';
import EventPage from './pages/EventPage';
import NotificationsPage from './pages/NotificationsPage';
import NotificationCard from './pages/NotificationCard';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notificationcard" element={<NotificationCard />} />
      </Routes>
    </div>
  );
}

export default App;
