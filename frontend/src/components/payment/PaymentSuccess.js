import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  HomeIcon,
  ShoppingBagIcon,
  TruckIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const PaymentSuccess = ({ paymentDetails }) => {
  const navigate = useNavigate();

  // Mock tracking information - in real app, this would come from your backend
  const trackingInfo = {
    number: 'DLV123456789',
    carrier: 'Delhivery',
    status: 'Order Confirmed',
    estimatedDelivery: '3-5 business days'
  };

  const getTrackingUrl = () => {
    if (trackingInfo.carrier === 'Delhivery') {
      return `https://www.delhivery.com/track/package/${trackingInfo.number}`;
    } else if (trackingInfo.carrier === 'DTDC') {
      return `https://www.dtdc.in/tracking/tracking_results.asp?Ttype=awb_no&strCnno=${trackingInfo.number}`;
    }
    return '#';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircleIcon className="h-10 w-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">
                #{paymentDetails?.orderId?.slice(-8) || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium text-gray-900">
                {paymentDetails?.paymentId?.slice(-8) || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium text-gray-900 capitalize">
                {paymentDetails?.method || 'N/A'}
              </span>
            </div>
            {paymentDetails?.upiId && (
              <div className="flex justify-between">
                <span className="text-gray-600">UPI ID:</span>
                <span className="font-medium text-gray-900">
                  {paymentDetails.upiId}
                </span>
              </div>
            )}
            {paymentDetails?.last4 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Card:</span>
                <span className="font-medium text-gray-900">
                  **** **** **** {paymentDetails.last4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <TruckIcon className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-blue-800">Tracking Information</h3>
            </div>
            <a
              href={getTrackingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <EyeIcon className="h-3 w-3 mr-1" />
              Track
            </a>
          </div>
          <div className="text-left space-y-1">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Carrier:</span> {trackingInfo.carrier}
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Tracking Number:</span> {trackingInfo.number}
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Status:</span> {trackingInfo.status}
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Estimated Delivery:</span> {trackingInfo.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-green-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• You'll receive an order confirmation email</li>
            <li>• We'll notify you when your order ships</li>
            <li>• Track your order in your account</li>
            <li>• Estimated delivery: {trackingInfo.estimatedDelivery}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/profile?tab=orders"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <ShoppingBagIcon className="w-4 h-4 mr-2" />
            View My Orders
          </Link>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@saramjewels.com" className="text-pink-600 hover:text-pink-500">
              support@saramjewels.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
