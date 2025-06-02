
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    if (logout) {
      await logout();
    }
    navigate('/');
  };

  const handleAdminClick = () => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Raj Furniture</span>
              <span className="text-xs text-gray-500 hidden sm:block">Premium Quality Furniture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAdminClick}
              className="hidden md:flex items-center space-x-1"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Profile
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Wishlist
                    </Link>
                    <Link to="/track-order" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Track Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <SearchBar />
              </div>
              
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Home
              </Link>
              <Link to="/all-categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Categories
              </Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Contact
              </Link>
              <button 
                onClick={handleAdminClick}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Admin Panel
              </button>
              {!user && (
                <>
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
