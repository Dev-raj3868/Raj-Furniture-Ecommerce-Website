
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import SearchBar from './SearchBar';
import { toast } from 'sonner';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const isAdmin = user?.email === 'admin@rajfurniture.com';

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('isAdminLoggedIn');
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar - hidden on mobile */}
      <div className="hidden md:block bg-gray-100 text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-4">
            <span>Free shipping on orders over ₹2,999</span>
            <span>•</span>
            <span>Call us: +91 9876543210</span>
          </div>
          <div className="flex space-x-4">
            {user && (
              <span>Welcome, {user.user_metadata?.full_name || user.email}!</span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              Raj
            </div>
            <span className="text-xl font-semibold text-gray-800 hidden sm:block">Furniture</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/categories/bedroom" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bedroom
            </Link>
            <Link to="/categories/office" className="text-gray-700 hover:text-blue-600 transition-colors">
              Office
            </Link>
            <Link to="/categories/dining" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dining
            </Link>
            <Link to="/categories/living-room" className="text-gray-700 hover:text-blue-600 transition-colors">
              Living Room
            </Link>
            <Link to="/all-categories" className="text-gray-700 hover:text-blue-600 transition-colors">
              All Categories
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search icon - Mobile only */}
            <button className="md:hidden text-gray-700 hover:text-blue-600">
              <Search className="h-6 w-6" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  {user ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Wishlist
                      </Link>
                      <Link 
                        to="/track-order" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Track Orders
                      </Link>
                      {/* Only show admin panel link for admin user */}
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-sm text-red-700 hover:bg-red-50 border-t"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="h-4 w-4 inline mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            {user && (
              <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 transition-colors">
                <Heart className="h-6 w-6" />
              </Link>
            )}

            {/* Shopping Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white py-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories/bedroom" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bedroom
              </Link>
              <Link 
                to="/categories/office" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Office
              </Link>
              <Link 
                to="/categories/dining" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dining
              </Link>
              <Link 
                to="/categories/living-room" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Living Room
              </Link>
              <Link 
                to="/all-categories" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Categories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
