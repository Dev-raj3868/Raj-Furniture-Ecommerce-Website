
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const adminSession = localStorage.getItem('adminSession');
  
  // Check if admin session exists and is valid
  if (!isAdminLoggedIn || !adminSession) {
    console.log('Admin access denied: No valid session found');
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const session = JSON.parse(adminSession);
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

    // Session expires after 8 hours
    if (hoursDiff > 8) {
      console.log('Admin session expired');
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminSession');
      return <Navigate to="/admin/login" replace />;
    }

    console.log('Admin access granted:', {
      adminId: session.adminId,
      sessionValid: true
    });

    return <>{children}</>;
  } catch (error) {
    console.error('Invalid admin session data:', error);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminSession');
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedAdminRoute;
