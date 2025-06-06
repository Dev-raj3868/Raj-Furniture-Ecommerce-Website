
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

  // Enhanced product transformation with better image handling
  const transformProduct = (product: any): Product => {
    // Ensure we have a valid image
    let productImageUrl = '/placeholder.svg';
    
    if (product.image_url && product.image_url.trim() !== '') {
      productImageUrl = product.image_url;
    } else if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage && firstImage.trim() !== '') {
        productImageUrl = firstImage;
      }
    } else {
      // Use furniture-specific images from Unsplash based on category or random
      const furnitureImages = [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571898670072-6f8a681b5d8e?w=400&h=300&fit=crop'
      ];
      productImageUrl = furnitureImages[Math.floor(Math.random() * furnitureImages.length)];
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      image_url: productImageUrl,
      description: product.description,
      category_id: product.category_id,
      featured: product.featured,
      in_stock: product.in_stock,
      material: product.material,
      dimensions: product.dimensions,
      color: product.color,
      images: product.images || [productImageUrl],
      created_at: product.created_at,
      categories: product.categories,
      rating: product.rating || 4.5,
      reviewCount: product.review_count || Math.floor(Math.random() * 50) + 10, // Random review count if not set
      features: product.specifications?.features || [],
      category: product.categories?.name || '',
      subCategory: '',
      inStock: product.in_stock,
      discount: product.original_price && product.original_price > product.price 
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : undefined
    };
  };

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
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 shadow-lg">
          <div className="container mx-auto px-4 flex justify-center">
            <Link to="/admin">
              <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
