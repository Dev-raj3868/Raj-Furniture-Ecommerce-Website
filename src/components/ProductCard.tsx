
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(product)
    });
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // Enhanced image handling with multiple fallbacks
  const getProductImage = (product: Product): string => {
    // Try image_url first
    if (product.image_url && product.image_url !== '') {
      return product.image_url;
    }
    
    // Try images array
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage && firstImage !== '') {
        return firstImage;
      }
    }
    
    // Use a furniture-specific placeholder from Unsplash
    return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop';
  };

  const productImage = getProductImage(product);
  
  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full flex flex-col transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                transform: 'perspective(1000px) rotateX(5deg)'
              }}
              onError={(e) => {
                console.log('Image failed to load:', productImage);
                const target = e.target as HTMLImageElement;
                if (target.src !== 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop') {
                  target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {(discountPercentage || product.discount) && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 animate-pulse shadow-lg">
              {discountPercentage || product.discount}% OFF
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 h-9 w-9 p-0 rounded-full shadow-lg"
          >
            <Heart className="h-4 w-4 text-red-500" />
          </Button>
        </div>
        
        <div className="p-4 flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-base group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2 font-medium">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex space-x-2">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 text-sm h-9 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group/btn"
                size="sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 text-sm bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-9 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                size="sm"
                disabled={!product.inStock}
              >
                <Zap className="h-4 w-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                Buy Now
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-sm font-semibold">
            {product.inStock ? (
              <span className="text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                In Stock
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
