import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, isClerkConfigured } = useAuth();

  // If Clerk is not configured, allow access
  if (!isClerkConfigured) {
    return children;
  }

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // If signed in, show the protected content
  return isSignedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
