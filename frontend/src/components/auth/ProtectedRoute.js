import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  // If signed in, show the protected content

  // If signed in, show the protected content
  return isSignedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
