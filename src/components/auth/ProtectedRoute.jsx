import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

/* 
ProtectedRoute component for route protection.
Redirects to login if user is not authenticated.
*/

const ProtectedRoute = ({ children }) => {
  // Get authentication state and loading status from context
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render children if authenticated, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;