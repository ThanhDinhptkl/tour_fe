import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && !isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Đăng xuất thành công');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Format date to Vietnamese format
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có thông tin';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Họ tên</label>
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <p className="text-gray-700">{user.phone || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Địa chỉ</label>
            <p className="text-gray-700">{user.address || 'Chưa cập nhật'}</p>
          </div>
          {/* <div className="col-span-2">
            <label className="block font-semibold mb-1">Ngày đăng ký tài khoản</label>
            <p className="text-gray-700">{formatDate(user.created_at)}</p>
          </div> */}
        </div>
        <div className="flex justify-end mt-8">
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
