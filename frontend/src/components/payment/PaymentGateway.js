import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const PaymentGateway = ({ amount, orderId, onPaymentSuccess, onPaymentFailure }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Pay with UPI, Cards, Net Banking',
      icon: BanknotesIcon,
      color: 'bg-blue-500'
    },
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay using UPI ID',
      icon: DevicePhoneMobileIcon,
      color: 'bg-purple-500'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with your card',
      icon: CreditCardIcon,
      color: 'bg-green-500'
    }
  ];

  const validateCardDetails = () => {
    const newErrors = {};
    
    if (!cardDetails.number || cardDetails.number.length < 16) {
      newErrors.number = 'Please enter a valid card number';
    }
    
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format';
    }
    
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Please enter cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpiId = () => {
    if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) {
      setErrors({ upi: 'Please enter a valid UPI ID (e.g., name@upi)' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const processRazorpayPayment = async () => {
    try {
      setLoading(true);
      
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: 'temp-user-id', // Replace with actual user ID
              shipping_address: {
                address: 'Sample Address',
                city: 'Sample City',
                state: 'Sample State',
                pincode: '123456'
              }
            })
          });

          const data = await response.json();
          
          if (!data.razorpayOrder) {
            throw new Error('Failed to create Razorpay order');
          }

          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_your_key',
            amount: data.razorpayOrder.amount,
            currency: data.razorpayOrder.currency,
            name: 'Saram Jewels',
            description: 'Jewelry Purchase',
            order_id: data.razorpayOrder.id,
            handler: function (response) {
              onPaymentSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: data.order.id,
                method: 'razorpay'
              });
            },
            prefill: {
              name: 'Customer Name',
              email: 'customer@example.com',
              contact: '9999999999'
            },
            theme: {
              color: '#EC4899'
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Razorpay error:', error);
          onPaymentFailure('Payment failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };
    } catch (error) {
      console.error('Error loading Razorpay:', error);
      onPaymentFailure('Failed to load payment gateway.');
      setLoading(false);
    }
  };

  const processUpiPayment = async () => {
    if (!validateUpiId()) return;
    
    setLoading(true);
    try {
      // Simulate UPI payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPaymentSuccess({
        paymentId: `upi_${Date.now()}`,
        orderId: orderId,
        method: 'upi',
        upiId: upiId
      });
    } catch (error) {
      onPaymentFailure('UPI payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processCardPayment = async () => {
    if (!validateCardDetails()) return;
    
    setLoading(true);
    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPaymentSuccess({
        paymentId: `card_${Date.now()}`,
        orderId: orderId,
        method: 'card',
        last4: cardDetails.number.slice(-4)
      });
    } catch (error) {
      onPaymentFailure('Card payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    switch (paymentMethod) {
      case 'razorpay':
        await processRazorpayPayment();
        break;
      case 'upi':
        await processUpiPayment();
        break;
      case 'card':
        await processCardPayment();
        break;
      default:
        onPaymentFailure('Please select a payment method.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Order Total:</span>
          <span className="text-2xl font-bold text-gray-900">₹{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === method.id
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center mr-4`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
              {paymentMethod === method.id && (
                <CheckCircleIcon className="w-6 h-6 text-pink-500" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method Specific Forms */}
      {paymentMethod === 'upi' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID (e.g., name@upi)"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.upi ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.upi && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationCircleIcon className="w-4 h-4 mr-1" />
              {errors.upi}
            </p>
          )}
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) => handleCardInputChange('number', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.number}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                placeholder="MM/YY"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.expiry && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {errors.expiry}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                placeholder="123"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => handleCardInputChange('name', e.target.value)}
              placeholder="Enter cardholder name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="w-5 h-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Secure Payment</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </button>

      {/* Cancel Button */}
      <button
        onClick={() => navigate('/cart')}
        className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
};

export default PaymentGateway;
