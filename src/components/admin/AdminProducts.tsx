
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useProducts } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AdminProducts = () => {
  const { data: products, isLoading, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.categories?.name === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeleteLoading(productId);
    try {
      console.log('Deleting product with ID:', productId);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Product deleted successfully');
      toast.success('Product deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleFeatured = async (productId: string, currentFeatured: boolean) => {
    try {
      console.log('Toggling featured status for product:', productId, 'Current:', currentFeatured);
      
      const { error } = await supabase
        .from('products')
        .update({ featured: !currentFeatured })
        .eq('id', productId);

      if (error) {
        console.error('Toggle featured error:', error);
        throw error;
      }

      console.log('Product featured status updated');
      toast.success(`Product ${!currentFeatured ? 'featured' : 'unfeatured'} successfully!`);
      refetch();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const toggleStock = async (productId: string, currentStock: boolean) => {
    try {
      console.log('Toggling stock status for product:', productId, 'Current:', currentStock);
      
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !currentStock })
        .eq('id', productId);

      if (error) {
        console.error('Toggle stock error:', error);
        throw error;
      }

      console.log('Product stock status updated');
      toast.success(`Product marked as ${!currentStock ? 'in stock' : 'out of stock'}!`);
      refetch();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products Management</h1>
        <Link to="/admin/products/add">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Sofas">Sofas</option>
              <option value="Chairs">Chairs</option>
              <option value="Tables">Tables</option>
              <option value="Storage">Storage</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 sm:px-4">Product</th>
                  <th className="text-left py-3 px-2 sm:px-4">Category</th>
                  <th className="text-left py-3 px-2 sm:px-4">Price</th>
                  <th className="text-left py-3 px-2 sm:px-4">Stock</th>
                  <th className="text-left py-3 px-2 sm:px-4">Status</th>
                  <th className="text-left py-3 px-2 sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image_url || '/placeholder.svg'}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{product.description?.slice(0, 30)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <Badge variant="secondary" className="text-xs">{product.categories?.name}</Badge>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div>
                        <p className="font-medium text-sm sm:text-base">₹{product.price.toLocaleString()}</p>
                        {product.original_price && (
                          <p className="text-xs sm:text-sm text-gray-500 line-through">
                            ₹{product.original_price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <p className="font-medium text-sm sm:text-base">{product.stock_quantity || 0}</p>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleStock(product.id, product.in_stock)}
                          className="block"
                        >
                          <Badge 
                            variant={product.in_stock ? "default" : "destructive"}
                            className={`cursor-pointer text-xs ${product.in_stock ? "bg-green-100 text-green-800 hover:bg-green-200" : "hover:bg-red-200"}`}
                          >
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </button>
                        <button
                          onClick={() => toggleFeatured(product.id, product.featured)}
                          className="block"
                        >
                          <Badge 
                            className={`cursor-pointer text-xs ${
                              product.featured 
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" 
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {product.featured ? 'Featured' : 'Not Featured'}
                          </Badge>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex space-x-1 sm:space-x-2">
                        <Button size="sm" variant="outline" title="Edit Product" className="h-8 w-8 p-0">
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteLoading === product.id}
                          title="Delete Product"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
