
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, getRelatedProducts } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const rawProduct = getProductById(id!);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!rawProduct) {
    return <div>Product not found</div>;
  }

  // Transform legacy product to match our unified Product type
  const product: Product = {
    ...rawProduct,
    image_url: rawProduct.images?.[0] || '/placeholder.svg',
    category_id: '',
    featured: rawProduct.featured || false,
    in_stock: rawProduct.inStock,
    rating: rawProduct.rating || 4.5,
    reviewCount: rawProduct.reviewCount || 0,
    features: rawProduct.features || [],
    category: rawProduct.category || '',
    subCategory: rawProduct.subCategory || '',
    inStock: rawProduct.inStock
  };

  const rawRelatedProducts = getRelatedProducts(product.id, product.category);
  const relatedProducts: Product[] = rawRelatedProducts.map(p => ({
    ...p,
    image_url: p.images?.[0] || '/placeholder.svg',
    category_id: '',
    featured: p.featured || false,
    in_stock: p.inStock,
    rating: p.rating || 4.5,
    reviewCount: p.reviewCount || 0,
    features: p.features || [],
    category: p.category || '',
    subCategory: p.subCategory || '',
    inStock: p.inStock
  }));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || (product.images && product.images[0]) || '/placeholder.svg',
      selectedColor,
      selectedSize
    });
    toast.success('Added to cart!');
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent quality furniture! Very comfortable and looks exactly as shown.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      rating: 4,
      comment: 'Good value for money. Delivery was quick and assembly was easy.',
      date: '2024-01-10'
    },
    {
      id: 3,
      name: 'Anita Patel',
      rating: 5,
      comment: 'Beautiful design and perfect finish. Highly recommended!',
      date: '2024-01-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images?.[selectedImage] || product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Color:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Size:</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity:</h3>
              <div className="flex items-center space-x-4">
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
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button onClick={handleAddToCart} className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Buy Now
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6 text-green-600 mb-2" />
                <span>Free Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-6 w-6 text-blue-600 mb-2" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="h-6 w-6 text-orange-600 mb-2" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div>
                    <strong>Sub-category:</strong> {product.subCategory}
                  </div>
                  {product.colors && (
                    <div>
                      <strong>Available Colors:</strong> {product.colors.join(', ')}
                    </div>
                  )}
                  {product.sizes && (
                    <div>
                      <strong>Available Sizes:</strong> {product.sizes.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
