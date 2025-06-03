
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }
  
  // Check if user is logged in and is admin
  if (!user || !isAdminLoggedIn || user.email !== 'admin@rajfurniture.com') {
    console.log('Admin access denied:', {
      user: user?.email,
      isAdminLoggedIn,
      isCorrectEmail: user?.email === 'admin@rajfurniture.com'
    });
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
