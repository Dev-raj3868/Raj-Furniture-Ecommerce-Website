
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToProducts: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToProducts }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-24 overflow-hidden">
      {/* Animated 3D background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-orange-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating icon */}
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl animate-bounce">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white animate-fade-in leading-tight">
            Transform Your 
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Living Space
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-gray-200 animate-slide-up max-w-4xl mx-auto leading-relaxed">
            Discover our curated collection of 
            <span className="font-bold text-blue-300"> premium furniture </span>
            pieces that blend modern design with timeless elegance
          </p>
          
          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Star, text: "Premium Quality", color: "from-yellow-400 to-orange-500" },
              { icon: Sparkles, text: "Modern Design", color: "from-blue-400 to-purple-500" },
              { icon: Star, text: "Fast Delivery", color: "from-green-400 to-blue-500" }
            ].map((badge, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 bg-gradient-to-r ${badge.color} px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <badge.icon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-10 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 text-xl font-bold group relative overflow-hidden"
              onClick={onScrollToProducts}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center">
                Shop Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            
            <Link to="/all-categories">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 text-xl font-semibold backdrop-blur-sm bg-white/10"
              >
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
