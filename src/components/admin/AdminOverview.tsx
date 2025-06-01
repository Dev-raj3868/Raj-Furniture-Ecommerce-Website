
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { useProducts } from '@/hooks/useSupabaseData';

const AdminOverview = () => {
  const { data: products } = useProducts();

  const totalProducts = products?.length || 0;
  const inStockProducts = products?.filter(p => p.in_stock)?.length || 0;
  const featuredProducts = products?.filter(p => p.featured)?.length || 0;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'In Stock',
      value: inStockProducts,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Featured Products',
      value: featuredProducts,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Total Orders',
      value: 125, // This would come from orders query
      icon: ShoppingBag,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">₹{product.price.toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900">Add New Product</div>
                <div className="text-sm text-blue-600">Create a new product listing</div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900">Manage Orders</div>
                <div className="text-sm text-green-600">View and update order status</div>
              </button>
              <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="font-medium text-purple-900">Update Inventory</div>
                <div className="text-sm text-purple-600">Manage stock levels</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
