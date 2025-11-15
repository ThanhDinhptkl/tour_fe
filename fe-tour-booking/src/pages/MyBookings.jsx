import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user, isLoading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      navigate('/login');
      return;
    }

    if (!authLoading && isAuthenticated && user) {
      const fetchTourDetails = async (tourId) => {
        try {
          const response = await fetch(`http://localhost:3333/tour/${tourId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Không thể tải thông tin tour');
          }
          return await response.json();
        } catch (error) {
          console.error('Error fetching tour details:', error);
          return null;
        }
      };

      const fetchBookings = async () => {
        try {
          console.log('Fetching bookings for user:', user.id);
          const response = await fetch(`http://localhost:5555/booking/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Không thể tải danh sách đặt tour');
          }

          const bookingsData = await response.json();
          console.log('Bookings data:', bookingsData);
          
          // Fetch tour details for each booking
          const bookingsWithTourDetails = await Promise.all(
            bookingsData.map(async (booking) => {
              const tourDetails = await fetchTourDetails(booking.tour_id);
              return {
                ...booking,
                tour_title: tourDetails?.title || 'Không có thông tin tour',
                tour_description: tourDetails?.description || '',
                tour_location: tourDetails?.location || '',
                tour_duration: tourDetails?.duration || 0,
                tour_price: tourDetails?.price || 0,
                tour_start_date: tourDetails?.start_date || null
              };
            })
          );

          setBookings(bookingsWithTourDetails);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          toast.error('Không thể tải danh sách đặt tour');
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [token, navigate, user, authLoading, isAuthenticated]);

  const canCancelBooking = (booking) => {
    if (booking.status !== 'PENDING') {
      return false;
    }

    if (booking.tour_start_date) {
      const startDate = new Date(booking.tour_start_date);
      const now = new Date();
      const hoursUntilStart = (startDate - now) / (1000 * 60 * 60);
      
      // Không cho phép hủy tour trong vòng 24h trước khi bắt đầu
      return hoursUntilStart > 24;
    }

    return true;
  };

  const cancelBooking = async (id) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    if (!canCancelBooking(booking)) {
      toast.error('Không thể hủy tour này');
      return;
    }

    if (!window.confirm('Bạn có chắc chắn muốn hủy đặt tour này?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5555/booking`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: id,
          status: 'CANCELLED'
        })
      });

      if (!response.ok) {
        throw new Error('Không thể hủy đặt tour');
      }

      // Update bookings list
      setBookings(bookings.map(booking => 
        booking.id === id 
          ? { ...booking, status: 'CANCELLED' }
          : booking
      ));

      toast.success('Hủy đặt tour thành công');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Không thể hủy đặt tour');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách tour đã đặt</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{booking.tour_title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Địa điểm:</span> {booking.tour_location}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Ngày đặt:</span>{' '}
                {new Date(booking.booking_date).toLocaleDateString('vi-VN')}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Thời gian:</span>{' '}
                {new Date(booking.booking_date).toLocaleDateString('vi-VN')}
              </p>
              {booking.tour_start_date && (
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Ngày khởi hành:</span>{' '}
                  {new Date(booking.tour_start_date).toLocaleDateString('vi-VN')}
                </p>
              )}
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Số người:</span> {booking.number_of_people}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Tổng tiền:</span>{' '}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(booking.total_price)}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                  booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status === 'PENDING' ? 'Chờ xác nhận' :
                   booking.status === 'CONFIRMED' ? 'Đã xác nhận' :
                   booking.status === 'CANCELLED' ? 'Đã hủy' :
                   booking.status}
                </span>
                
                {booking.status === 'PENDING' && canCancelBooking(booking) && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Hủy đặt tour
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Bạn chưa đặt tour nào</p>
          <button
            onClick={() => navigate('/tours')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Xem danh sách tour
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBookings; 