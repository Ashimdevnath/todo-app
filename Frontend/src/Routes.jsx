import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Sigin';
import Signup from './components/SignUp';
import Dashboard from './components/UserProfileDashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const AppRoutes = () => {
  return (
    <UserContextProvider>
      <Router>
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Private Routes */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default AppRoutes;
