import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function PaymentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5555/booking/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Không thể tải thông tin đặt tour');
        }

        const data = await response.json();
        setBooking(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, isAuthenticated, token, navigate]);

  const handlePayment = async (paymentMethod) => {
    try {
      setProcessingPayment(true);
      setError('');

      // Validate booking data
      if (!booking || !booking.total_price) {
        throw new Error('Thông tin đặt tour không hợp lệ');
      }

      // Convert total_price to number if it's a string
      const amount = typeof booking.total_price === 'string' 
        ? parseFloat(booking.total_price) 
        : booking.total_price;

      // Handle COD payment separately
      if (paymentMethod === 'COD') {
        try {
          const updateResponse = await fetch(`http://localhost:5555/booking`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              ...booking,
              status: 'CONFIRMED',
              payment_method: 'COD'
            })
          });

          if (!updateResponse.ok) {
            const errorData = await updateResponse.text();
            console.error('Error updating booking:', errorData);
            throw new Error('Không thể cập nhật trạng thái đặt tour');
          }

          // Show success message and navigate
          toast.success('🎉 Đặt tour thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => navigate('/')
          });
          
          return;
        } catch (error) {
          console.error('Error updating booking status:', error);
          throw new Error('Không thể cập nhật trạng thái đặt tour: ' + error.message);
        }
      }

      // Handle online payment (VNPAY)
      const paymentRequest = {
        orderId: id,
        amount: amount,
        paymentMethod: 'VNPAY',
        returnUrl: `${window.location.origin}/payment/callback`,
        customerEmail: booking.user_email || 'customer@example.com',
        description: `Thanh toán đặt tour ${booking.tour_title || id}`
      };

      console.log('Sending payment request:', paymentRequest);

      const response = await fetch('http://localhost:8086/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(paymentRequest)
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorMessage = 'Không thể tạo giao dịch thanh toán';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(`${errorMessage}. (Mã lỗi: ${response.status})`);
      }

      let paymentData;
      try {
        paymentData = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing success response:', e);
        throw new Error('Lỗi xử lý phản hồi từ máy chủ');
      }

      console.log('Payment response:', paymentData);

      if (!paymentData) {
        throw new Error('Không nhận được thông tin thanh toán từ máy chủ');
      }

      if (!paymentData.paymentUrl) {
        throw new Error('Không nhận được đường dẫn thanh toán VNPay');
      }

      window.location.href = paymentData.paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center text-red-600 mb-4">{error}</div>
          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center text-gray-600 mb-4">Không tìm thấy thông tin đặt tour</div>
          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Thanh toán đặt tour</h1>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin đặt tour</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Mã đặt tour:</span> {booking.id}</p>
                <p><span className="font-medium">Tour:</span> {booking.tour_title}</p>
                <p><span className="font-medium">Ngày khởi hành:</span> {new Date(booking.booking_date).toLocaleDateString('vi-VN')}</p>
                <p><span className="font-medium">Số người:</span> {booking.number_of_people}</p>
                <p className="text-lg font-semibold mt-4">
                  Tổng tiền: {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(booking.total_price)}
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Chọn phương thức thanh toán</h2>
              
              <button
                onClick={() => handlePayment('VNPAY')}
                disabled={processingPayment}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processingPayment ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <img src="/vnpay-logo.png" alt="VNPay" className="h-6 mr-2" />
                )}
                Thanh toán qua VNPay
              </button>

              <button
                onClick={() => handlePayment('COD')}
                disabled={processingPayment}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Thanh toán khi nhận tour (COD)
              </button>

              <button
                onClick={() => navigate(`/tourdetail/${booking.tour_id}`)}
                disabled={processingPayment}
                className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Hủy thanh toán
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
