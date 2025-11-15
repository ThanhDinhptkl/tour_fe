import banner from "../assets/banner.png";
import React from "react";

function Banner() {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-100 object-cover" />
    </div>
  );
}

export default Banner;
