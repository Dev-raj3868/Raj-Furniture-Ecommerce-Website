
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Shield, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RazorpayPayment from '@/components/RazorpayPayment';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, items, shippingAddress } = location.state || {};

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Payment successful with ID:', paymentId);
    navigate('/order-confirmation', {
      state: {
        paymentId,
        orderId: `ORD${Date.now()}`,
        total,
        items,
        shippingAddress
      }
    });
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  if (!total || !items) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Request</h1>
          <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm sm:text-base">{item.name}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg sm:text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RazorpayPayment
                    amount={total}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-sm sm:text-base">Secure Payment</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      SSL Encrypted
                    </li>
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      PCI DSS Compliant
                    </li>
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      256-bit Encryption
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;
