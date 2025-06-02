
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RazorpayPaymentProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  orderId,
  onSuccess,
  onFailure,
  disabled = false,
  children
}) => {
  const RAZORPAY_KEY_ID = 'rzp_test_n48QUoGCP2Rw3j';

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'FurniStore',
      description: 'Furniture Purchase',
      order_id: orderId,
      handler: function (response: any) {
        onSuccess(response.razorpay_payment_id);
        toast.success('Payment successful!');
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'FurniStore Corporate Office'
      },
      theme: {
        color: '#2563eb'
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        }
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        onFailure(response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      onFailure(error);
      toast.error('Payment initialization failed');
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={disabled}
      className="w-full"
    >
      {children}
    </Button>
  );
};

export default RazorpayPayment;
