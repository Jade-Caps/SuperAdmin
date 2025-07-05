// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.login);

  if (user) {
    // ✅ If user is logged in, redirect away from login/signup
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ If not logged in, show the page
  return children;
};

export default PublicRoute;
