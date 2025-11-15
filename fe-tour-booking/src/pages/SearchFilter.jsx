import React from "react";

function SearchFilter() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Nhập địa điểm"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <select className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400">
          <option value="">Chọn dịch vụ</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400">
          <option value="">Chọn phương tiện</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400">
          <option value="">Đánh giá</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400">
          <option value="">Giá cả</option>
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200">
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
