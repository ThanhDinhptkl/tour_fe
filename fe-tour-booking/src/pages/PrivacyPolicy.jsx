import React from "react";

function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">CHÍNH SÁCH BẢO MẬT</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Mục đích và phạm vi thu thập thông tin
          </h2>
          <p>Chúng tôi thu thập thông tin cá nhân của khách hàng nhằm:</p>
          <ul className="list-disc list-inside">
            <li>Cung cấp dịch vụ đặt tour, vé máy bay, khách sạn.</li>
            <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng.</li>
            <li>Hỗ trợ khách hàng, xử lý khiếu nại.</li>
            <li>Gửi thông tin khuyến mãi, ưu đãi (nếu khách hàng đồng ý).</li>
          </ul>
          <p>Các thông tin có thể được thu thập bao gồm:</p>
          <ul className="list-disc list-inside">
            <li>Họ tên, số điện thoại, email, địa chỉ.</li>
            <li>Thông tin thanh toán (nếu có).</li>
            <li>Lịch sử đặt tour và dịch vụ đã sử dụng.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Phạm vi sử dụng thông tin
          </h2>
          <p>
            Thông tin cá nhân của khách hàng chỉ được sử dụng cho mục đích nội
            bộ hoặc trong các trường hợp sau:
          </p>
          <ul className="list-disc list-inside">
            <li>Cung cấp dịch vụ theo yêu cầu của khách hàng.</li>
            <li>
              Gửi thông tin xác nhận đặt tour, thông báo thay đổi lịch trình.
            </li>
            <li>Hỗ trợ xử lý khiếu nại, tranh chấp.</li>
            <li>Tuân thủ yêu cầu pháp lý từ cơ quan có thẩm quyền.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Thời gian lưu trữ thông tin
          </h2>
          <p>
            Thông tin cá nhân của khách hàng sẽ được lưu trữ trong hệ thống cho
            đến khi khách hàng yêu cầu xóa hoặc công ty không còn cần sử dụng
            thông tin đó.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Bảo mật thông tin</h2>
          <p>
            Chúng tôi cam kết bảo mật thông tin cá nhân của khách hàng bằng các
            biện pháp:
          </p>
          <ul className="list-disc list-inside">
            <li>Mã hóa dữ liệu thanh toán.</li>
            <li>Hạn chế truy cập nội bộ.</li>
            <li>
              Không chia sẻ thông tin khách hàng với bên thứ ba nếu không có sự
              đồng ý.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Chia sẻ thông tin với bên thứ ba
          </h2>
          <p>Thông tin cá nhân có thể được chia sẻ với:</p>
          <ul className="list-disc list-inside">
            <li>
              Đối tác cung cấp dịch vụ (hãng hàng không, khách sạn, công ty vận
              chuyển).
            </li>
            <li>Cơ quan chức năng nếu có yêu cầu hợp pháp.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Quyền của khách hàng
          </h2>
          <p>Khách hàng có quyền:</p>
          <ul className="list-disc list-inside">
            <li>Kiểm tra, cập nhật, điều chỉnh thông tin cá nhân.</li>
            <li>Yêu cầu xóa thông tin khỏi hệ thống.</li>
            <li>Khiếu nại nếu phát hiện thông tin bị lạm dụng.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
