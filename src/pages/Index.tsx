
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import AnnouncementBar from '@/components/AnnouncementBar';
import ChatBot from '@/components/ChatBot';
import { useCategories, useProducts } from '@/hooks/useSupabaseData';
import { Product } from '@/types/product';

const Index = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useProducts();

  // Transform Supabase product data to match ProductCard expectations
  const transformProduct = (product: any): Product => ({
    ...product,
    rating: product.rating || 4.5,
    reviewCount: product.review_count || 0,
    features: product.specifications?.features || [],
    category: product.categories?.name || '',
    subCategory: '',
    inStock: product.in_stock
  });

  const featuredProducts = products?.filter(product => product.featured).slice(0, 8).map(transformProduct) || [];

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
              Transform Your Space with Premium Furniture
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
              Discover our curated collection of modern, stylish, and comfortable furniture pieces
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-blue-50">
              <CardContent className="pt-6">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
                <p className="text-gray-600">Free shipping on orders above ₹999</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-blue-50">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">1-year warranty on all products</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-blue-50">
              <CardContent className="pt-6">
                <Headphones className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Expert customer service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            Shop by Categories
          </h2>
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Link key={category.id} to={`/category/${category.name.toLowerCase()}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image_url || '/placeholder.svg'}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/50 transition-all duration-300"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked furniture pieces that combine style, comfort, and quality
            </p>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="hover:bg-blue-600 hover:text-white transition-all duration-300">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Amazing quality furniture at great prices. The delivery was quick and the customer service was excellent!"
                  </p>
                  <div className="font-semibold text-gray-800">Customer {i}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default Index;
