import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Cảm ơn bạn đã đăng ký nhận bản tin!");
      setEmail("");
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback) {
      alert("Cảm ơn bạn đã gửi phản hồi!");
      setFeedback("");
    }
  };

  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Cột Liên hệ */}
          <div>
            <h3 className="text-lg font-bold mb-3">Liên hệ</h3>
            <p className="mb-2 flex items-center"><FaPhone className="mr-2" /> 0123 456 789</p>
            <p className="mb-2 flex items-center"><FaEnvelope className="mr-2" /> support@tourdulich.com</p>
            <p className="mb-2 flex items-center"><FaMapMarkerAlt className="mr-2" /> 123 Đường ABC, Hà Nội</p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Cột Về Chúng Tôi */}
          <div>
            <h3 className="text-lg font-bold mb-3">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a href="/aboutus" className="hover:text-gray-300">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-300">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/termofservice" className="hover:text-gray-300">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Sản Phẩm */}
          <div>
            <h3 className="text-lg font-bold mb-3">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Tour Du Lịch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Combo giá tốt
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Khác */}
          <div>
            <h3 className="text-lg font-bold mb-3">Đăng ký nhận tin</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                className="w-full p-2 text-black rounded"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Đăng ký
              </button>
            </form>
            {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
          </div>
        </div>

        {/* Phản hồi khách hàng */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold mb-3">Phản hồi của bạn</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <textarea
              className="w-full p-2 text-black rounded"
              placeholder="Nhập phản hồi của bạn"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Gửi phản hồi
            </button>
          </form>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-6 text-center border-t border-gray-400 pt-4">
          <p className="text-sm">&copy; 2025 Tourdulich. All rights reserved.</p>
          <p className="text-sm">
            Đội ngũ: Thanh Dinh - Hữu Thuận - Tuấn Trương - Hoàng Anh Thanh Than
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
