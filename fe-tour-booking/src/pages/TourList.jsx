import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Gọi API khi component mount hoặc khi các filter thay đổi
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError("");
      try {
        let url = "http://localhost:3333/tours";
        
        // Nếu có tìm kiếm theo địa điểm
        if (searchLocation) {
          url = `http://localhost:3333/tours/location/${encodeURIComponent(searchLocation)}`;
        }
        // Nếu có tìm kiếm theo tiêu đề
        else if (searchTitle) {
          url = `http://localhost:3333/tours/title/${encodeURIComponent(searchTitle)}`;
        }
        // Nếu có lọc theo giá
        else if (minPrice !== "" && maxPrice !== "") {
          // Kiểm tra giá trị hợp lệ
          const min = parseFloat(minPrice);
          const max = parseFloat(maxPrice);
          
          if (isNaN(min) || isNaN(max)) {
            setError("Giá trị giá không hợp lệ");
            setLoading(false);
            return;
          }
          
          if (min > max) {
            setError("Giá tối thiểu phải nhỏ hơn hoặc bằng giá tối đa");
            setLoading(false);
            return;
          }
          
          url = `http://localhost:3333/tours/price?minPrice=${min}&maxPrice=${max}`;
        }

        console.log("Fetching from URL:", url);
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 404) {
            setTours([]);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        
        // Kiểm tra nếu data là null hoặc undefined
        if (!data) {
          setTours([]);
          return;
        }
        
        // Đảm bảo data là một mảng
        const toursArray = Array.isArray(data) ? data : [data];
        setTours(toursArray);
      } catch (error) {
        console.error("Lỗi khi gọi API tour:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchTitle, searchLocation, minPrice, maxPrice]);

  // Hàm xử lý khi người dùng nhấn Enter trong ô tìm kiếm
  const handleKeyPress = (e, setter) => {
    if (e.key === 'Enter') {
      setter(e.target.value);
    }
  };

  // Hàm xử lý khi người dùng thay đổi giá trị giá
  const handlePriceChange = (e, setter) => {
    const value = e.target.value;
    // Chỉ cho phép số và dấu chấm
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // Hàm xử lý khi người dùng nhấn nút tìm kiếm theo giá
  const handlePriceSearch = () => {
    // Kiểm tra giá trị hợp lệ
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    
    if (isNaN(min) || isNaN(max)) {
      setError("Giá trị giá không hợp lệ");
      return;
    }
    
    if (min > max) {
      setError("Giá tối thiểu phải nhỏ hơn hoặc bằng giá tối đa");
      return;
    }
    
    // Cập nhật state để trigger useEffect
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách tour</h2>
      
      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Tìm theo tên tour..."
            defaultValue={searchTitle}
            onKeyPress={(e) => handleKeyPress(e, setSearchTitle)}
            className="p-2 border rounded w-full"
          />
          <button 
            onClick={() => setSearchTitle(document.querySelector('input[placeholder="Tìm theo tên tour..."]').value)}
            className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full"
          >
            Tìm kiếm
          </button>
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Tìm theo địa điểm..."
            defaultValue={searchLocation}
            onKeyPress={(e) => handleKeyPress(e, setSearchLocation)}
            className="p-2 border rounded w-full"
          />
          <button 
            onClick={() => setSearchLocation(document.querySelector('input[placeholder="Tìm theo địa điểm..."]').value)}
            className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full"
          >
            Tìm kiếm
          </button>
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Giá tối thiểu"
            value={minPrice}
            onChange={(e) => handlePriceChange(e, setMinPrice)}
            className="p-2 border rounded w-full"
          />
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Giá tối đa"
            value={maxPrice}
            onChange={(e) => handlePriceChange(e, setMaxPrice)}
            className="p-2 border rounded w-full"
          />
          <button 
            onClick={handlePriceSearch}
            className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full"
          >
            Lọc theo giá
          </button>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-center text-gray-500 my-8">
          Đang tải dữ liệu...
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-500 my-8">
          {error}
        </div>
      )}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tours.map((tour) => (
          <div key={tour.id_tour} className="rounded-lg shadow-lg p-4 bg-white">
            <img
              src={tour.image || "https://via.placeholder.com/300x200"}
              alt={tour.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold text-lg">{tour.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
            <p className="text-sm text-gray-500">Địa điểm: {tour.location}</p>
            <p className="text-sm text-gray-500">Thời gian: {tour.duration} ngày</p>
            <p className="font-bold text-blue-600">
              {tour.price?.toLocaleString()} VNĐ
            </p>
            <button
              onClick={() => navigate(`/tourdetail/${tour.id_tour}`)}
              className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {!loading && !error && tours.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Không tìm thấy tour phù hợp với tiêu chí tìm kiếm
        </div>
      )}
    </div>
  );
}

export default TourList;