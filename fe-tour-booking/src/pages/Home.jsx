import React from "react";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import TourList from "./TourList";

import hinh1 from "../assets/hinh1.png";
import SearchFilter from "./SearchFilter";

function Home() {
  const domesticTours = [
    {
      image: hinh1,
      title: "Mùa Thu 1",
      description: "Tour Cao Bằng 3 ngày 2 đêm...",
      price: "2,100,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 2",
      description: "Tour Sapa 3 ngày 2 đêm...",
      price: "2,390,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 1",
      description: "Tour Cao Bằng 3 ngày 2 đêm...",
      price: "2,100,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 2",
      description: "Tour Sapa 3 ngày 2 đêm...",
      price: "2,390,000 VND",
    },
    // Thêm các tour khác
  ].map((tour, index) => ({ ...tour, id: index + 1 }));

  const internationalTours = [
    {
      image: hinh1,
      title: "Mùa Thu 3",
      description: "Tour Châu Âu 7 ngày 6 đêm...",
      price: "18,100,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 4",
      description: "Tour Nhật Bản 5 ngày 4 đêm...",
      price: "18,190,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 3",
      description: "Tour Châu Âu 7 ngày 6 đêm...",
      price: "18,100,000 VND",
    },
    {
      image: hinh1,
      title: "Mùa Thu 4",
      description: "Tour Nhật Bản 5 ngày 4 đêm...",
      price: "18,190,000 VND",
    },
    // Thêm các tour khác
  ].map((tour, index) => ({ ...tour, id: index + 1 }));

  return (
    <div>
      <Banner />
      <TourList title="Tour quốc tế" tours={internationalTours} />
    </div>
  );
}

export default Home;
