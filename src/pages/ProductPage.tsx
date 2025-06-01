
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProduct, useProducts, useProductReviews } from '@/hooks/useSupabaseData';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading } = useProduct(id!);
  const { data: allProducts } = useProducts();
  const { data: reviews } = useProductReviews(id!);
  const { addToCart } = useCart();

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Transform product data
  const transformedProduct: Product = {
    ...product,
    rating: product.rating || 4.5,
    reviewCount: product.review_count || 0,
    features: (product.specifications as any)?.features || [],
    category: product.categories?.name || '',
    subCategory: '',
    inStock: product.in_stock,
    featured: product.featured || false,
    originalPrice: product.original_price
  };

  // Get related products from same category
  const relatedProducts = allProducts?.filter(
    p => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4).map(p => ({
    ...p,
    rating: p.rating || 4.5,
    reviewCount: p.review_count || 0,
    features: (p.specifications as any)?.features || [],
    category: p.categories?.name || '',
    subCategory: '',
    inStock: p.in_stock,
    featured: p.featured || false,
    originalPrice: p.original_price
  })) || [];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || (product.images && product.images[0]) || '/placeholder.svg'
    });
    toast.success('Added to cart!');
  };

  const productImages = product.images || [product.image_url || '/placeholder.svg'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {transformedProduct.rating} ({transformedProduct.reviewCount} reviews)
                  </span>
                </div>
                <Badge variant="secondary">{transformedProduct.category}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.original_price.toLocaleString()}
                  </span>
                )}
                {product.original_price && (
                  <Badge className="bg-red-500 text-white">
                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-green-600 font-medium">
                {transformedProduct.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Product Details */}
            <div className="space-y-3">
              {product.material && (
                <div className="flex justify-between">
                  <span className="font-medium">Material:</span>
                  <span>{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="font-medium">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between">
                  <span className="font-medium">Color:</span>
                  <span>{product.color}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>{product.weight}</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!transformedProduct.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <p className="text-sm">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({transformedProduct.reviewCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                {transformedProduct.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {transformedProduct.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.material && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Material</span>
                      <span>{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Dimensions</span>
                      <span>{product.dimensions}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Weight</span>
                      <span>{product.weight}</span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Color</span>
                      <span>{product.color}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.profiles?.full_name || 'Anonymous'}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
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
