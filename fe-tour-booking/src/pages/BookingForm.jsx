import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token, user, isLoading: authLoading } = useAuth();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [bookingData, setBookingData] = useState({
    booking_date: '',
    number_of_people: 1,
    status: 'PENDING',
    total_price: 0
  });

  // Tính tổng tiền
  const calculateTotal = () => {
    if (!tour) return 0;
    return tour.price * bookingData.number_of_people;
  };

  useEffect(() => {
    // Kiểm tra đăng nhập
    if (!authLoading && !isAuthenticated) {
      toast.error('Vui lòng đăng nhập để đặt tour');
      navigate('/login');
      return;
    }

    if (!authLoading && isAuthenticated && user) {
      const fetchTourDetail = async () => {
        try {
          const response = await fetch(`http://localhost:3333/tour/${id}`);
          if (!response.ok) {
            throw new Error('Tour không tồn tại');
          }
          const data = await response.json();
          setTour(data);
          
          // Cập nhật tổng tiền ban đầu
          setBookingData(prev => ({
            ...prev,
            total_price: data.price
          }));
        } catch (error) {
          console.error('Error fetching tour:', error);
          setError(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTourDetail();
    }
  }, [id, isAuthenticated, user, navigate, authLoading]);

  // Cập nhật tổng tiền khi số người thay đổi
  useEffect(() => {
    if (tour) {
      setBookingData(prev => ({
        ...prev,
        total_price: calculateTotal()
      }));
    }
  }, [bookingData.number_of_people, tour]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!authLoading && (!isAuthenticated || !user)) {
      toast.error('Vui lòng đăng nhập để đặt tour');
      navigate('/login');
      return;
    }

    if (!bookingData.booking_date) {
      toast.error('Vui lòng chọn ngày khởi hành');
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        tour_id: parseInt(id),
        user_id: user.id, // Sử dụng user.id từ context
        booking_date: bookingData.booking_date,
        status: 'PENDING',
        number_of_people: parseInt(bookingData.number_of_people),
        total_price: parseFloat(bookingData.total_price)
      };

      console.log('Sending booking request:', requestData);

      const response = await fetch('http://localhost:5555/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Đặt tour thất bại');
      }

      const data = await response.json();
      console.log('Booking response:', data);
      
      toast.success('Đặt tour thành công!');
      navigate(`/payment/${data.id}`);
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message);
      toast.error(error.message || 'Có lỗi xảy ra khi đặt tour');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
        <button
          onClick={() => navigate('/tours')}
          className="mt-4 mx-auto block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Quay lại danh sách tour
        </button>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Không tìm thấy thông tin tour</div>
        <button
          onClick={() => navigate('/tours')}
          className="mt-4 mx-auto block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Quay lại danh sách tour
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Đặt Tour</h1>
          
          {/* Tour Info Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-600 mb-2">Địa điểm: {tour.location}</p>
            <p className="text-gray-600">
              Giá/người: {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(tour.price)}
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Ngày khởi hành</label>
                <input
                  type="date"
                  name="booking_date"
                  value={bookingData.booking_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Số người</label>
                <input
                  type="number"
                  name="number_of_people"
                  value={bookingData.number_of_people}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                  max={tour.max_participants || 999}
                />
              </div>

              {/* Total Price */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-semibold">
                  Tổng tiền: {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(bookingData.total_price)}
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/tourdetail/${id}`)}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Tiến hành đặt tour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
