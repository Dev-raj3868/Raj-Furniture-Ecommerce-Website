
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
    <section id="featured-products" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 animate-slide-up">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Handpicked furniture pieces that combine style, comfort, and quality
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="h-80 bg-gray-200 rounded-lg animate-pulse transform hover:scale-105 transition-transform duration-300"
                style={{animationDelay: `${i * 0.1}s`}}
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <Link to="/all-categories">
            <Button size="lg" variant="outline" className="hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
