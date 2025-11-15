import React from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser, logout: authLogout } = useAuth();

  const handleLogout = () => {
    authLogout();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center shadow-lg">
      <button 
        className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200" 
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold">TOUR DU LỊCH</span>
      </button>
      <nav className="flex space-x-6">
        <button 
          onClick={() => navigate("/")} 
          className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Trang chủ
        </button>
        {/* <button 
          onClick={() => navigate("/tours")} 
          className="hover:text-gray-300"
        >
          Danh sách tour 
        </button> */}
        {isAuthenticated && (
          <button 
            onClick={() => navigate("/my-bookings")} 
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Tour đã đặt
          </button>
        )}
        <button 
          onClick={() => navigate("/contact")} 
          className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Liên hệ
        </button>
      </nav>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={() => isAuthenticated ? navigate("/profile") : navigate("/login")}
        >
          <img src={user} alt="Avatar" className="h-8 w-8 rounded-full border-2 border-white" />
          <span className="font-medium">
            {isAuthenticated ? (
              `Xin chào, ${authUser?.name || 'Người dùng'}`
            ) : (
              "Đăng nhập"
            )}
          </span>
        </button>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Đăng xuất
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
