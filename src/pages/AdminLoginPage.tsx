
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminLoginPage = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Predefined admin credentials
  const ADMIN_CREDENTIALS = {
    adminId: 'raj_admin_2024',
    password: 'RajFurniture@Admin123'
  };

  useEffect(() => {
    // Check if already logged in as admin
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const adminSession = localStorage.getItem('adminSession');
    
    if (isAdminLoggedIn && adminSession) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate admin credentials
      if (adminId !== ADMIN_CREDENTIALS.adminId || password !== ADMIN_CREDENTIALS.password) {
        toast.error('Invalid admin credentials. Please check your Admin ID and password.');
        setIsLoading(false);
        return;
      }

      // Create admin session
      const adminSession = {
        adminId: adminId,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substring(2, 15)
      };

      // Store admin session
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminSession', JSON.stringify(adminSession));

      toast.success('Admin login successful!');
      navigate('/admin');
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-red-200">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-700 to-red-800 bg-clip-text text-transparent">
            Admin Portal
          </CardTitle>
          <p className="text-gray-600 mt-2">Secure Administrative Access</p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adminId" className="text-sm font-semibold text-gray-700">
                Admin ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                <Input
                  id="adminId"
                  type="text"
                  placeholder="Enter your admin ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="pl-12 h-12 border-red-200 focus:border-red-400 focus:ring-red-400"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 border-red-200 focus:border-red-400 focus:ring-red-400"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg shadow-lg transition-all duration-200" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Security Notice
                </p>
                <p className="text-xs text-red-700 leading-relaxed">
                  This portal is restricted to authorized administrators only. 
                  All login attempts are monitored and logged for security purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-sm border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
            >
              ← Return to Main Site
            </Button>
          </div>

          {/* Debug info for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
              <p className="font-semibold mb-1">Development Credentials:</p>
              <p>Admin ID: raj_admin_2024</p>
              <p>Password: RajFurniture@Admin123</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
