// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // DEBUG
  console.log('🔒 ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('🔒 ProtectedRoute - user:', user);
  console.log('🔒 ProtectedRoute - requireAdmin:', requireAdmin);

  // Si non authentifié, rediriger vers login
  if (!isAuthenticated) {
    console.log('🔒 Redirection vers /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si admin requis mais utilisateur n'est pas admin
  if (requireAdmin && user?.role !== 'admin') {
    console.log('🔒 Accès admin refusé');
    return <Navigate to="/" replace />;
  }

  // Sinon, rendre les enfants
  console.log('🔒 Accès autorisé');
  return children;
};

export default ProtectedRoute;