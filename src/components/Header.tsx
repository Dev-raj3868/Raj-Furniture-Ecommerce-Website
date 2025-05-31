
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl transform group-hover:scale-105 transition-transform">
              Raj
            </div>
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              Furniture
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search furniture..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
                
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
