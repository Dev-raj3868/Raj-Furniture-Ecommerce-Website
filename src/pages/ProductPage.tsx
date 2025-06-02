
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Zap, Shield, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProduct, useProducts } from '@/hooks/useSupabaseData';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Product } from '@/types/product';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { data: allProducts } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '/placeholder.svg'
      });
      toast.success('Added to cart!');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '/placeholder.svg'
      });
      navigate('/checkout');
    }
  };

  const transformProduct = (prod: any): Product => ({
    ...prod,
    rating: prod.rating || 4.5,
    reviewCount: prod.review_count || 0,
    features: prod.specifications?.features || [],
    category: prod.categories?.name || '',
    subCategory: '',
    inStock: prod.in_stock,
    featured: prod.featured || false
  });

  // Get related products from the same category
  const relatedProducts = allProducts
    ?.filter(p => p.category_id === product?.category_id && p.id !== product?.id)
    .slice(0, 4)
    .map(transformProduct) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.categories?.name}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg text-gray-600 ml-2">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.original_price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Product Features */}
            {product.specifications?.features && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.specifications.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
              {product.material && (
                <div>
                  <span className="font-medium">Material:</span>
                  <span className="ml-2 text-gray-600">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span className="font-medium">Dimensions:</span>
                  <span className="ml-2 text-gray-600">{product.dimensions}</span>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="font-medium">Color:</span>
                  <span className="ml-2 text-gray-600">{product.color}</span>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="font-medium">Weight:</span>
                  <span className="ml-2 text-gray-600">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1"
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={!product.in_stock}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
              </div>
              
              <Button variant="ghost" className="w-full">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.in_stock ? (
                <span className="text-green-600 font-medium">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="flex items-center p-6">
              <Truck className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-600">On orders above ₹999</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Shield className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">1-year warranty</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold">Premium Quality</h4>
                <p className="text-sm text-gray-600">Handcrafted furniture</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
