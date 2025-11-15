import React from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center border rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Nhập địa điểm bạn muốn đến..."
          className="flex-grow p-2 focus:outline-none"
        />
        <button
          onClick={() => navigate("/tourdetail")}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
