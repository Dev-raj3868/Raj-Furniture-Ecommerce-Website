
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
  const { 
    total, 
    items, 
    shippingAddress, 
    paymentMethod,
    subtotal,
    deliveryFee,
    discount 
  } = location.state || {};

  console.log('Payment page received data:', location.state);

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Payment successful with ID:', paymentId);
    navigate('/order-confirmation', {
      state: {
        paymentId,
        orderId: `ORD${Date.now()}`,
        total,
        items,
        shippingAddress,
        paymentMethod,
        subtotal,
        deliveryFee,
        discount
      }
    });
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  // Better validation with detailed logging
  if (!total || !items || !Array.isArray(items) || items.length === 0) {
    console.error('Payment page validation failed:', {
      total,
      items,
      itemsArray: Array.isArray(items),
      itemsLength: items?.length
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Request</h1>
          <p className="text-gray-600 mb-4">No items found for payment. Please add items to your cart first.</p>
          <div className="space-y-2">
            <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
            <Button variant="outline" onClick={() => navigate('/checkout')}>Back to Checkout</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/checkout')}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Checkout
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
                    <div key={`${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm sm:text-base">{item.name}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          {item.selectedColor && (
                            <p className="text-gray-500 text-xs">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && (
                            <p className="text-gray-500 text-xs">Size: {item.selectedSize}</p>
                          )}
                        </div>
                      </div>
                      <p className="font-medium text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  {subtotal && (
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {deliveryFee !== undefined && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                  )}
                  
                  {discount && discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {shippingAddress && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-600">
                      <p>{shippingAddress.fullName}</p>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  </div>
                )}
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
                  {paymentMethod === 'cod' ? (
                    <div className="text-center py-4">
                      <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
                      <p className="text-gray-600 mb-4">Pay when your order is delivered</p>
                      <Button 
                        onClick={() => handlePaymentSuccess('COD_' + Date.now())}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        Confirm Order - ₹{total.toLocaleString()}
                      </Button>
                    </div>
                  ) : (
                    <RazorpayPayment
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
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
