
import React, { useState } from 'react';
import { Package, Truck, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  // Mock order data
  const handleTrackOrder = () => {
    if (orderNumber) {
      setOrderData({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: '2024-01-15',
        currentLocation: 'Mumbai Distribution Center',
        items: [
          {
            id: '1',
            name: 'Modern L-Shape Sofa Set',
            quantity: 1,
            price: 45999,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
          }
        ],
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-01-10',
            time: '10:30 AM',
            completed: true,
            description: 'Your order has been placed successfully'
          },
          {
            status: 'Order Confirmed',
            date: '2024-01-10',
            time: '02:15 PM',
            completed: true,
            description: 'Your order has been confirmed and is being prepared'
          },
          {
            status: 'Shipped',
            date: '2024-01-12',
            time: '09:00 AM',
            completed: true,
            description: 'Your order has been shipped from our warehouse'
          },
          {
            status: 'In Transit',
            date: '2024-01-13',
            time: '11:30 AM',
            completed: true,
            description: 'Your order is on its way to the delivery location'
          },
          {
            status: 'Out for Delivery',
            date: '2024-01-15',
            time: 'Expected',
            completed: false,
            description: 'Your order will be out for delivery'
          },
          {
            status: 'Delivered',
            date: '2024-01-15',
            time: 'Expected',
            completed: false,
            description: 'Your order will be delivered'
          }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
          
          {/* Order Tracking Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Enter your order number (e.g., RF123456)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTrackOrder} className="bg-blue-600 hover:bg-blue-700">
                  <Package className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {orderData && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{orderData.orderNumber}</CardTitle>
                      <p className="text-gray-600 mt-1">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Estimated delivery: {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {orderData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Current location: {orderData.currentLocation}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.timeline.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className={`font-medium ${
                                step.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {step.status}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {step.description}
                              </p>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <div>{step.date}</div>
                              <div>{step.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item: any) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please contact our customer support team.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline">
                  Call: +91 98765 43210
                </Button>
                <Button variant="outline">
                  Email: support@rajfurniture.com
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
