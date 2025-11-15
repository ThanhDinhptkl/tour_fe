import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PaymentCallback = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('vnp_TxnRef');
        
        // First, process the callback with payment service
        const callbackResponse = await fetch(`http://localhost:8086/api/payments/vnpay/callback${location.search}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!callbackResponse.ok) {
          throw new Error('Xác thực thanh toán thất bại');
        }

        // Then get the payment details
        const paymentResponse = await fetch(`http://localhost:8086/api/payments/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!paymentResponse.ok) {
          throw new Error('Không thể tải thông tin thanh toán');
        }

        const paymentData = await paymentResponse.json();
        setPaymentDetails(paymentData);
        
        if (paymentData.status === 'COMPLETED') {
          setStatus('success');
          // Update booking status if needed
          try {
            await fetch(`http://localhost:5555/booking`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                id: orderId,
                status: 'CONFIRMED'
              })
            });
          } catch (error) {
            console.error('Error updating booking status:', error);
            // Log detailed error for debugging
            if (error.response) {
              console.error('Error response:', await error.response.text());
            }
          }
        } else {
          setStatus('failed');
          setError('Thanh toán không thành công');
        }
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    processPaymentCallback();
  }, [location.search, token, navigate]);

  useEffect(() => {
    let timeoutId;
    if (status === 'success') {
      timeoutId = setTimeout(() => {
        navigate('/profile');
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Kết quả thanh toán</h2>
        
        {status === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang xử lý thanh toán...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Thanh toán thành công!</h3>
            {paymentDetails && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4 text-left">
                <p><span className="font-medium">Mã đơn hàng:</span> {paymentDetails.orderId}</p>
                <p><span className="font-medium">Số tiền:</span> {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(paymentDetails.amount)}</p>
                <p><span className="font-medium">Phương thức:</span> {paymentDetails.paymentMethod}</p>
              </div>
            )}
            <p className="text-gray-600 mt-4">Tự động chuyển hướng sau 5 giây...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Thanh toán thất bại</h3>
            {error && <p className="text-gray-600 mb-4">{error}</p>}
            <div className="space-y-2">
              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Xem lịch sử đặt tour
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback; 