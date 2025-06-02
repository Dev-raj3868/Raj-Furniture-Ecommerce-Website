
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useCategories, useProducts } from '@/hooks/useSupabaseData';

const AllCategoriesPage = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products } = useProducts();

  // Count products per category
  const getProductCount = (categoryId: string) => {
    return products?.filter(product => product.category_id === categoryId).length || 0;
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
            Explore All Categories
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover our complete range of furniture categories, each carefully curated to transform your space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-blue-900">
                      {getProductCount(category.id)} items
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllCategoriesPage;
