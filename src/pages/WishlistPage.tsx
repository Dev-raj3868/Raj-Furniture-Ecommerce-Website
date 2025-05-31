
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const WishlistPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  // Mock wishlist data - in a real app, this would come from your database
  const wishlistItems = [
    {
      id: '1',
      name: 'Modern Sofa',
      price: 25999,
      image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      category: 'Sofas'
    },
    {
      id: '2',
      name: 'Dining Chair',
      price: 4999,
      image_url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
      category: 'Chairs'
    }
  ];

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
      selectedColor: 'Default',
      selectedSize: 'Default'
    });
    toast.success('Added to cart!');
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    // In a real app, this would remove from database
    toast.success('Removed from wishlist!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
          <p className="text-gray-600 mb-8">Please log in to view your wishlist items.</p>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 mr-3 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="ml-4 text-gray-500">({wishlistItems.length} items)</span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items you love to your wishlist!</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${item.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
