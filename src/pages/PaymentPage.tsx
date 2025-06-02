
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import RazorpayPayment from '@/components/RazorpayPayment';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  const handleRazorpaySuccess = (paymentId: string) => {
    setIsProcessing(false);
    setPaymentSuccess(true);
    clearCart();
    localStorage.removeItem('orderData');
    localStorage.setItem('lastPaymentId', paymentId);
    toast.success('Payment successful! Your order has been placed.');
  };

  const handleRazorpayFailure = (error: any) => {
    setIsProcessing(false);
    console.error('Payment failed:', error);
    toast.error('Payment failed. Please try again.');
  };

  const handleCODOrder = () => {
    setPaymentSuccess(true);
    clearCart();
    localStorage.removeItem('orderData');
    toast.success('Order placed successfully! Pay on delivery.');
  };

  if (!orderData) {
    return null;
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate('/')} size="lg">
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/track-order')}
            >
              Track Order
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/checkout')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Checkout
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Complete Your Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderData.paymentMethod === 'razorpay' ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <img 
                          src="https://razorpay.com/assets/razorpay-logo.svg" 
                          alt="Razorpay" 
                          className="h-12 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">Secure Payment with Razorpay</h3>
                        <p className="text-gray-600 mb-6">
                          You will be redirected to Razorpay's secure payment gateway
                        </p>
                        <RazorpayPayment
                          amount={orderData.total}
                          onSuccess={handleRazorpaySuccess}
                          onFailure={handleRazorpayFailure}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            `Pay ₹${orderData.total.toLocaleString()}`
                          )}
                        </RazorpayPayment>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>256-bit SSL encrypted payment</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
                    <p className="text-gray-600 mb-6">
                      Pay when your order is delivered to your doorstep
                    </p>
                    <Button onClick={handleCODOrder} size="lg">
                      Confirm Order
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {orderData.items.map((item: any) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{orderData.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{orderData.deliveryFee === 0 ? 'FREE' : `₹${orderData.deliveryFee}`}</span>
                  </div>
                  
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{orderData.discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{orderData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-sm text-gray-600">
                    <div>{orderData.shippingAddress.fullName}</div>
                    <div>{orderData.shippingAddress.address}</div>
                    <div>
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}
                    </div>
                    <div>{orderData.shippingAddress.phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
