import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import hinh1 from "../assets/hinh1.png";

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3333/tour/${id}`);
        if (!response.ok) {
          throw new Error('Tour không tồn tại');
        }
        const data = await response.json();
        setTour(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải thông tin tour...</div>
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Địa điểm:</p>
              <p className="font-semibold">{tour.location}</p>
            </div>
            <div>
              <p className="text-gray-600">Giá:</p>
              <p className="font-semibold text-xl text-blue-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(tour.price)}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Mô tả tour</h2>
            <p className="text-gray-700 whitespace-pre-line">{tour.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Lịch trình</h2>
            <p className="text-gray-700 whitespace-pre-line">{tour.duration} Ngày</p>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/tours')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Quay lại
            </button>
            <button
              onClick={() => navigate(`/booking/${tour.id_tour}`)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Đặt tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
