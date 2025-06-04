
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Heart, Menu, X, Search, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from '@/components/SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Check if currently in admin area
  const isAdminArea = location.pathname.startsWith('/admin');
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RF</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Raj Furniture</span>
          </Link>

          {/* Navigation - Hide in admin area */}
          {!isAdminArea && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/all-categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          )}

          {/* Admin area indicator */}
          {isAdminArea && isAdminLoggedIn && (
            <div className="flex items-center space-x-2 text-red-600">
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Admin Panel</span>
            </div>
          )}

          {/* Search Bar - Desktop and not in admin area */}
          {!isAdminArea && (
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin area actions */}
            {isAdminArea && isAdminLoggedIn ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAdminLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            ) : !isAdminArea ? (
              <>
                {/* Search Icon - Mobile */}
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Search className="w-5 h-5" />
                </Button>

                {user ? (
                  <>
                    <Link to="/wishlist">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/cart">
                      <Button variant="ghost" size="sm" className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                          </span>
                        )}
                      </Button>
                    </Link>
                    <div className="relative group">
                      <Button variant="ghost" size="sm">
                        <User className="w-5 h-5" />
                      </Button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/track-order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Track Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/admin/login">
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Settings className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu - Only show if not in admin area */}
        {isMenuOpen && !isAdminArea && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-categories"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
