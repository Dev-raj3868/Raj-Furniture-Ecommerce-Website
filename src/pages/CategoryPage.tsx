
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/hooks/useSupabaseData';
import { Product } from '@/types/product';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { data: categories } = useCategories();
  const { data: products, isLoading } = useProducts();

  // Find the category to get its ID
  const categoryData = categories?.find(
    cat => cat.name.toLowerCase() === category?.toLowerCase()
  );

  // Filter products by category
  const categoryProducts = products?.filter(
    product => product.category_id === categoryData?.id
  ) || [];

  // Transform Supabase product data to match ProductCard expectations
  const transformProduct = (product: any): Product => ({
    ...product,
    rating: product.rating || 4.5,
    reviewCount: product.review_count || 0,
    features: product.specifications?.features || [],
    category: product.categories?.name || '',
    subCategory: '',
    inStock: product.in_stock,
    featured: product.featured || false
  });

  const transformedProducts = categoryProducts.map(transformProduct);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {category} Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Discover our premium {category} furniture collection
          </p>
        </div>

        {transformedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No products found
            </h2>
            <p className="text-gray-600">
              We're working on adding more products to this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {transformedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
