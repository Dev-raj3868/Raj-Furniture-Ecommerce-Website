
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToProducts: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToProducts }) => {
  return (
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
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={onScrollToProducts}
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to="/all-categories">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
