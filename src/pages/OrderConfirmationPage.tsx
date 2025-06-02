
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentId = location.state?.paymentId;
  const orderId = location.state?.orderId || `ORD${Date.now()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="text-blue-600 font-mono">{orderId}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between">
                  <span className="font-medium">Payment ID:</span>
                  <span className="text-green-600 font-mono">{paymentId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 font-semibold">Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Delivery:</span>
                <span>5-7 business days</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your items</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">Items will be shipped soon</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">5-7 business days</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/track-order')}
              className="w-full md:w-auto mr-4"
            >
              Track Your Order
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full md:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
