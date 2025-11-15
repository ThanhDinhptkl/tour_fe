import React from "react";

function MainContent() {
  return (
    <main className="container mx-auto p-4">
      {/* Nội dung chính của trang web */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Chào mừng đến với Tour Du Lịch!
        </h1>
        <p>Khám phá những điểm đến tuyệt vời cùng chúng tôi.</p>
      </div>
    </main>
  );
}

export default MainContent;
