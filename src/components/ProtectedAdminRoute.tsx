
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  // Check if user is logged in and is admin
  if (!user || !isAdminLoggedIn || user.email !== 'admin@rajfurniture.com') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
