import React from "react";
import hinh1 from "../assets/hinh1.png";

function AboutUs() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">GIỚI THIỆU VỀ CHÚNG TÔI</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Giới thiệu chung</h2>
          <p>
            [Tên Công Ty] là đơn vị chuyên cung cấp các tour du lịch trong nước
            và quốc tế với cam kết mang đến những trải nghiệm tuyệt vời nhất cho
            khách hàng. Chúng tôi tự hào là cầu nối đưa du khách đến gần hơn với
            những điểm đến mơ ước, khám phá văn hóa, thiên nhiên và con người ở
            khắp mọi miền.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Sứ mệnh & Tầm nhìn</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Sứ mệnh:</strong> Cung cấp dịch vụ du lịch chất lượng cao,
              giúp khách hàng có những hành trình đáng nhớ với mức giá hợp lý.
            </li>
            <li>
              <strong>Tầm nhìn:</strong> Trở thành một trong những công ty lữ
              hành hàng đầu, không ngừng đổi mới để mang lại những sản phẩm du
              lịch hấp dẫn và dịch vụ hoàn hảo.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Giá trị cốt lõi</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Chất lượng:</strong> Cam kết mang đến các tour du lịch
              chất lượng cao, an toàn và thú vị.
            </li>
            <li>
              <strong>Uy tín:</strong> Luôn đặt chữ tín lên hàng đầu, đảm bảo sự
              hài lòng cho khách hàng.
            </li>
            <li>
              <strong>Sáng tạo:</strong> Luôn đổi mới, đa dạng hóa sản phẩm để
              mang lại nhiều lựa chọn cho du khách.
            </li>
            <li>
              <strong>Trách nhiệm:</strong> Đặt lợi ích của khách hàng làm trọng
              tâm, đồng thời bảo vệ môi trường và phát triển du lịch bền vững.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Dịch vụ của chúng tôi
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Tour du lịch trong nước & quốc tế:</strong> Cung cấp các
              hành trình phong phú, đa dạng đến các điểm du lịch nổi tiếng.
            </li>
            <li>
              <strong>Dịch vụ đặt vé máy bay, khách sạn:</strong> Hỗ trợ khách
              hàng đặt vé máy bay, phòng khách sạn với mức giá tốt nhất.
            </li>
            <li>
              <strong>Tour theo yêu cầu:</strong> Thiết kế tour du lịch theo yêu
              cầu riêng của khách hàng, phù hợp cho gia đình, công ty, hội nhóm.
            </li>
            <li>
              <strong>Dịch vụ visa & hỗ trợ du lịch:</strong> Hỗ trợ khách hàng
              làm visa và cung cấp các thông tin cần thiết khi đi du lịch.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Thông tin liên hệ</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Địa chỉ:</strong> Địa chỉ công ty
            </li>
            <li>
              <strong>Hotline:</strong> (Số điện thoại)
            </li>
            <li>
              <strong>Email:</strong> [Địa chỉ email]
            </li>
            <li>
              <strong>Website:</strong> (Địa chỉ website)
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Hình ảnh giải thưởng & chứng nhận
          </h2>
          <div className="flex flex-col items-center space-y-6 mt-6">
            <div className="w-1/2">
              <img
                src={hinh1} // Thay đổi đường dẫn ảnh
                alt="Tour Cao Bằng"
                className="w-full "
              />
              <p className="text-center mt-2 text-sm font-medium">
                Top 20 Thương hiệu Việt nổi tiếng hàng đầu
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={hinh1} // Thay đổi đường dẫn ảnh
                alt="Top thương hiệu"
                className="w-full "
              />
              <p className="text-center mt-2 text-sm font-medium">
                Top 20 Thương hiệu Việt nổi tiếng hàng đầu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
