
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface FeaturedProductsSectionProps {
  products: Product[];
  isLoading: boolean;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products, isLoading }) => {
  return (
    <section id="featured-products" className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
      
      {/* Geometric 3D Shapes */}
      <div className="absolute top-1/4 right-10 w-8 h-8 border-4 border-blue-300 rotate-45 animate-[spin_10s_linear_infinite] opacity-30"></div>
      <div className="absolute bottom-1/3 left-16 w-6 h-16 bg-gradient-to-b from-yellow-300 to-orange-400 opacity-25 animate-[pulse_3s_ease-in-out_infinite]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 animate-slide-up relative">
            Featured Products
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Handpicked furniture pieces that combine style, comfort, and quality
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse transform hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite] opacity-50"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in transform hover:scale-102 transition-all duration-500"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: `perspective(1000px) rotateX(${Math.sin(index) * 2}deg) rotateY(${Math.cos(index) * 2}deg)`
                }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 animate-fade-in relative" style={{animationDelay: '0.8s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50 rounded-full animate-pulse"></div>
          <Link to="/all-categories">
            <Button size="lg" variant="outline" className="relative z-10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-transparent">
              <span className="flex items-center">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md -z-10"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
