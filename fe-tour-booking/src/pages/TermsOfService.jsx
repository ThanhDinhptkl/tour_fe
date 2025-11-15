import React from "react";

function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">ĐIỀU KHOẢN SỬ DỤNG</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Giới thiệu</h2>
          <p>
            Chào mừng bạn đến với [Tên Website]. Khi sử dụng dịch vụ của chúng
            tôi, bạn đồng ý tuân theo các điều khoản sau đây. Nếu bạn không đồng
            ý, vui lòng không sử dụng website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Quyền và trách nhiệm của người dùng
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Cung cấp thông tin cá nhân chính xác khi đặt tour hoặc sử dụng
              dịch vụ.
            </li>
            <li>
              Không sử dụng website vào mục đích vi phạm pháp luật, lừa đảo hoặc
              gây ảnh hưởng đến quyền lợi của người khác.
            </li>
            <li>
              Không sao chép, chỉnh sửa hoặc phát tán nội dung của website nếu
              không có sự cho phép.
            </li>
            <li>
              Chịu trách nhiệm về tài khoản của mình và bảo mật thông tin đăng
              nhập.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Đặt tour và thanh toán
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Khi đặt tour, khách hàng cần đọc kỹ thông tin về dịch vụ, chính
              sách thanh toán và hủy tour.
            </li>
            <li>
              Chúng tôi cam kết cung cấp thông tin chính xác, tuy nhiên, có thể
              có thay đổi về lịch trình hoặc giá cả.
            </li>
            <li>
              Thanh toán có thể được thực hiện qua chuyển khoản ngân hàng, thẻ
              tín dụng hoặc các phương thức khác được website hỗ trợ.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Chính sách hủy tour và hoàn tiền
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Nếu khách hàng hủy tour trước [X] ngày, có thể được hoàn [X]% số
              tiền.
            </li>
            <li>Nếu hủy sát ngày khởi hành, có thể không được hoàn tiền.</li>
            <li>
              Trường hợp tour bị hủy do lỗi từ công ty (thời tiết, dịch bệnh, lý
              do bất khả kháng), khách hàng sẽ được hoàn tiền hoặc hỗ trợ đổi
              sang tour khác.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Bảo mật thông tin</h2>
          <p>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng theo Chính
            sách bảo mật.
          </p>
          <p>
            Không chia sẻ thông tin cá nhân với bên thứ ba mà không có sự đồng ý
            của khách hàng, trừ khi có yêu cầu từ cơ quan chức năng.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Quyền thay đổi điều khoản
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Chúng tôi có quyền thay đổi hoặc cập nhật Điều khoản sử dụng bất
              cứ lúc nào mà không cần thông báo trước.
            </li>
            <li>
              Người dùng có trách nhiệm kiểm tra và tuân theo các điều khoản mới
              nhất.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Giới hạn trách nhiệm
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Chúng tôi không chịu trách nhiệm với bất kỳ tổn thất nào do lỗi kỹ
              thuật, gián đoạn dịch vụ hoặc hành vi vi phạm của bên thứ ba.
            </li>
            <li>
              Khách hàng tự chịu trách nhiệm về quyết định đặt tour và tuân thủ
              các điều kiện đi lại, visa, bảo hiểm du lịch.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
