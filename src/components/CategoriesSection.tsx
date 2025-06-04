
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

interface CategoriesSectionProps {
  categories: Category[] | undefined;
  isLoading: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, isLoading }) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Shop by Categories
        </h2>
        {isLoading ? (
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
  );
};

export default CategoriesSection;
