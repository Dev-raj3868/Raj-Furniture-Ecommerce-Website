
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import ChatBot from '@/components/ChatBot';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { useCategories, useProducts } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';

const Index = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { user } = useAuth();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@rajfurniture.com';

  // Transform Supabase product data to match ProductCard expectations
  const transformProduct = (product: any): Product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price,
    image_url: product.image_url || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg'),
    description: product.description,
    category_id: product.category_id,
    featured: product.featured,
    in_stock: product.in_stock,
    material: product.material,
    dimensions: product.dimensions,
    color: product.color,
    images: product.images || [],
    created_at: product.created_at,
    categories: product.categories,
    rating: product.rating || 4.5,
    reviewCount: product.review_count || 0,
    features: product.specifications?.features || [],
    category: product.categories?.name || '',
    subCategory: '',
    inStock: product.in_stock,
    discount: product.original_price && product.original_price > product.price 
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : undefined
  });

  const featuredProducts = products?.filter(product => product.featured).slice(0, 8).map(transformProduct) || [];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      {/* Admin Button - Only show for admin users */}
      {isAdmin && (
        <div className="bg-red-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-center">
            <Link to="/admin">
              <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <HeroSection onScrollToProducts={scrollToProducts} />
      <FeaturesSection />
      <CategoriesSection categories={categories} isLoading={categoriesLoading} />
      <FeaturedProductsSection products={featuredProducts} isLoading={productsLoading} />
      <TestimonialsSection />

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
