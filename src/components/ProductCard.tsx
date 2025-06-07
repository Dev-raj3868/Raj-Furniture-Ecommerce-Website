
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number; // Add index prop for unique image variations
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(product, index)
    });
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // Helper function to get unique colorful furniture-specific product images
  const getProductImage = (product: Product, imageIndex: number = 0): string => {
    // Try image_url first
    if (product.image_url) {
      return product.image_url;
    }
    
    // Try images array
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    
    // Create a diverse pool of furniture images
    const furnitureImages = [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&auto=format&q=80', // Modern sofa
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop&auto=format&q=80', // Elegant chair
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop&auto=format&q=80', // Dining table
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop&auto=format&q=80', // Bedroom
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&auto=format&q=80', // Storage cabinet
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop&auto=format&q=80', // Living room set
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop&auto=format&q=80', // Office desk
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&auto=format&q=80', // Bookshelf
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=400&fit=crop&auto=format&q=80', // Mirror decor
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop&auto=format&q=80', // Modern wardrobe
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop&auto=format&q=80', // Luxury sofa
      'https://images.unsplash.com/photo-1586594219413-03b10db95f26?w=500&h=400&fit=crop&auto=format&q=80', // Contemporary furniture
    ];
    
    // Use product name and index to determine unique image
    const productName = product.name?.toLowerCase() || '';
    const categoryName = product.category?.toLowerCase() || '';
    
    // Create a hash-like selection based on product name and index
    const nameHash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const imageSelectionIndex = (nameHash + imageIndex) % furnitureImages.length;
    
    // Category-specific selection with variations
    if (productName.includes('sofa') || productName.includes('couch') || categoryName.includes('sofa')) {
      const sofaImages = [furnitureImages[0], furnitureImages[10], furnitureImages[5]];
      return sofaImages[imageIndex % sofaImages.length];
    }
    if (productName.includes('chair') || categoryName.includes('chair')) {
      const chairImages = [furnitureImages[1], furnitureImages[6], furnitureImages[11]];
      return chairImages[imageIndex % chairImages.length];
    }
    if (productName.includes('table') || categoryName.includes('table')) {
      const tableImages = [furnitureImages[2], furnitureImages[7], furnitureImages[8]];
      return tableImages[imageIndex % tableImages.length];
    }
    if (productName.includes('bed') || categoryName.includes('bed')) {
      const bedImages = [furnitureImages[3], furnitureImages[9], furnitureImages[5]];
      return bedImages[imageIndex % bedImages.length];
    }
    
    // Return unique image based on calculated index
    return furnitureImages[imageSelectionIndex];
  };

  const productImage = getProductImage(product, index);
  
  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group h-full flex flex-col transform hover:-translate-y-2 hover:scale-105 animate-fade-in hover:rotate-1">
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-700 ease-out group-hover:brightness-110"
            onError={(e) => {
              console.log('Image failed to load:', productImage);
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&auto=format&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {(discountPercentage || product.discount) && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs animate-pulse hover:animate-bounce">
              {discountPercentage || product.discount}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white h-8 w-8 p-0 transform hover:scale-110 hover:rotate-12"
          >
            <Heart className="h-4 w-4 text-red-500" />
          </Button>
        </div>
        
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 text-xs sm:text-sm h-8 sm:h-9 transform hover:scale-105 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg"
                size="sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 h-8 sm:h-9 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:rotate-1"
                size="sm"
                disabled={!product.inStock}
              >
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Buy Now</span>
                <span className="sm:hidden">Buy</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-xs font-medium">
            {product.inStock ? (
              <span className="text-green-600 animate-pulse">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
