
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Package, Truck, Check, X } from 'lucide-react';

// Mock order data - in real app, this would come from Supabase
const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    items: [
      { name: 'Modern L-Shape Sofa Set', quantity: 1, price: 45999 }
    ],
    total: 45999,
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: '2024-01-15',
    shippingAddress: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    items: [
      { name: 'Executive Office Chair', quantity: 2, price: 12999 }
    ],
    total: 25998,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-01-14',
    shippingAddress: {
      street: '456 Park Ave',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    }
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    items: [
      { name: 'Glass Coffee Table', quantity: 1, price: 18999 }
    ],
    total: 18999,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-01-13',
    shippingAddress: {
      street: '789 Oak Rd',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    }
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    items: [
      { name: 'Modular Wardrobe System', quantity: 1, price: 35999 }
    ],
    total: 35999,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2024-01-12',
    shippingAddress: {
      street: '321 Pine St',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001'
    }
  }
];

const AdminOrders = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    return filterStatus === 'all' || order.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Package },
      shipped: { color: 'bg-blue-100 text-blue-800', icon: Truck },
      delivered: { color: 'bg-green-100 text-green-800', icon: Check },
      cancelled: { color: 'bg-red-100 text-red-800', icon: X }
    };

    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;

    return (
      <Badge className={variant.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      refunded: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || colors.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders Management</h1>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{orderStats.shipped}</p>
            <p className="text-sm text-gray-600">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
            <p className="text-sm text-gray-600">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
            <p className="text-sm text-gray-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order #</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Payment</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-blue-600">{order.orderNumber}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium">₹{order.total.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4 px-4">
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{order.createdAt}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.status === 'pending' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Ship
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
