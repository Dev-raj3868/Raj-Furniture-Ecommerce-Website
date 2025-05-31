import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getProductsByCategory, categories } from '@/data/products';
import { Product } from '@/types/product';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryData = categories.find(cat => cat.id === category);
  const rawProducts = getProductsByCategory(category || '');

  // Transform legacy products to match our unified Product type
  const products: Product[] = rawProducts.map(product => ({
    ...product,
    image_url: product.images?.[0] || '/placeholder.svg',
    category_id: '',
    featured: product.featured !== undefined ? product.featured : false,
    in_stock: product.inStock,
    rating: product.rating || 4.5,
    reviewCount: product.reviewCount || 0,
    features: product.features || [],
    category: product.category || '',
    subCategory: product.subCategory || '',
    inStock: product.inStock
  }));

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' }
  ];

  const colorOptions = ['Gray', 'Navy Blue', 'Beige', 'Brown', 'Black', 'White', 'Natural Wood'];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          Home / {categoryData?.name || 'Category'}
        </div>

        {/* Category Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="text-4xl mr-3">{categoryData?.icon}</span>
              {categoryData?.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {products.length} products available
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span className="text-sm">Under ₹10,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span className="text-sm">₹10,000 - ₹25,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span className="text-sm">₹25,000 - ₹50,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span className="text-sm">Above ₹50,000</span>
                    </label>
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="space-y-2">
                    {colorOptions.map(color => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={color}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                        />
                        <Label htmlFor={color} className="text-sm cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="rating" className="mr-2" />
                      <span className="text-sm">4★ & above</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="rating" className="mr-2" />
                      <span className="text-sm">3★ & above</span>
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inStock" />
                      <Label htmlFor="inStock" className="text-sm cursor-pointer">
                        In Stock
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fastDelivery" />
                      <Label htmlFor="fastDelivery" className="text-sm cursor-pointer">
                        Fast Delivery
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map(product => (
                  <Card key={product.id} className="p-4">
                    <div className="flex space-x-4">
                      <img
                        src={product.image_url || (product.images && product.images[0]) || '/placeholder.svg'}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <Button>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
