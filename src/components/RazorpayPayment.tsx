
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onError }) => {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_n48QUoGCP2Rw3j', // Your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Raj Furniture',
      description: 'Purchase from Raj Furniture',
      image: '/placeholder.svg',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        onSuccess(response.razorpay_payment_id);
        navigate('/order-confirmation', { 
          state: { 
            paymentId: response.razorpay_payment_id,
            orderId: `ORD${Date.now()}`
          } 
        });
      },
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Raj Furniture Store'
      },
      theme: {
        color: '#2563eb'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
        }
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        onError(response.error);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      onError(error);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
      size="lg"
    >
      Pay ₹{amount.toLocaleString()} with Razorpay
    </Button>
  );
};

export default RazorpayPayment;
