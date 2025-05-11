import { Button, Dropdown, Switch, Tooltip } from "antd";
import {
  SearchOutlined,
  BankOutlined,
  FileTextOutlined,
  UserOutlined,
  EditOutlined,
  HomeOutlined,
  BellOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export default function App() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3 flex items-center justify-between px-6">
      {/* Logo bên trái */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/vinhuni.png" 
            alt="VINHUNI Logo" 
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Thanh menu giữa */}
      <nav className="flex items-center space-x-8 text-gray-700 text-base mx-6">
        <div className="flex items-center cursor-pointer hover:text-purple-700">
          <SearchOutlined className="mr-2 text-lg" />
          <span>Ngành nghề/ Địa điểm</span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-purple-700">
          <BankOutlined className="mr-2 text-lg" />
          <span>Công ty</span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-purple-700">
          <FileTextOutlined className="mr-2 text-lg" />
          <span>Cẩm nang việc làm</span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-purple-700">
          <FileTextOutlined className="mr-2 text-lg" />
          <span>Mẫu CV xin việc</span>
        </div>
      </nav>

      {/* Dropdown và Nút nhà tuyển dụng */}
      <div className="flex items-center space-x-6">
        <Dropdown menu={{ items: [
          {
            key: '1',
            label: 'Đăng nhập',
            icon: <UserOutlined />
          },
          {
            key: '2', 
            label: 'Đăng ký',
            icon: <EditOutlined />
          }
        ]}} placement="bottomRight" arrow>
          <div className="flex items-center text-base text-purple-700 cursor-pointer">
            <UserOutlined className="mr-2 text-lg" />
            <span>Đăng ký / Đăng nhập</span>
          </div>
        </Dropdown>

        <Button type="default" className="border border-gray-300 flex items-center h-9 px-4">
          <BankOutlined className="mr-2 text-lg" />
          Nhà tuyển dụng
        </Button>
      </div>
    </header>

      {/* Main content with fixed sidebar and content */}
      <div className="pt-18 min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Sidebar navigation (fixed like header) */}
        <div className="fixed top-14 left-0 w-64 bg-white shadow-sm p-4 h-[calc(100vh-56px)] overflow-y-auto hidden md:block z-40">
          <div className="flex flex-col items-center mb-6 p-4">
            <div className="w-20 h-20 rounded-full bg-red-200 mb-2 overflow-hidden">
              <img
                src="/api/placeholder/80/80"
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-center">Hoang Nguyen Van</h3>
            <p className="text-xs text-gray-500">nvhhoang286@gmail.com</p>
            <p className="text-xs text-gray-500">0369683675</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer">
              <HomeOutlined className="mr-3 text-gray-500" />
              <span className="text-gray-700">Tổng Quan</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded cursor-pointer">
              <FileTextOutlined className="mr-3 text-blue-500" />
              <span className="text-blue-500 font-medium">Hồ Sơ Của Tôi</span>
            </div>
            <div className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer">
              <FileTextOutlined className="mr-3 text-gray-500" />
              <span className="text-gray-700">Công Ty Của Tôi</span>
            </div>
            <div className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer">
              <FileTextOutlined className="mr-3 text-gray-500" />
              <span className="text-gray-700">Việc Làm Của Tôi</span>
            </div>
            <div className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer">
              <BellOutlined className="mr-3 text-gray-500" />
              <span className="text-gray-700">Thông Báo Việc Làm</span>
            </div>
            <div className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer">
              <UserOutlined className="mr-3 text-gray-500" />
              <span className="text-gray-700">Quản Lý Tài Khoản</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8 min-w-0">
          {/* Profile info section */}
          <div className="bg-white rounded-md shadow-sm p-8 mb-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Hoang Nguyen Van</h2>
            <Button type="default" className="border border-gray-300 flex items-center">
              <EditOutlined className="mr-1" />
              Chỉnh sửa
            </Button>
          </div>

          <div className="text-sm space-y-1 mb-6">
            <p>
              <span className="text-gray-500">Chức danh: </span>
              <span className="font-medium text-gray-700">FrontEnd Developer</span>
            </p>
            <p>
              <span className="text-gray-500">Kinh nghiệm: </span>
              <span className="text-gray-700">1-3 năm</span>
            </p>
            <p>
              <span className="text-gray-500">Cấp bậc: </span>
              <span className="text-gray-700">Mới tốt nghiệp</span>
            </p>
            <p>
              <span className="text-gray-500">Lĩnh vực: </span>
              <span className="text-gray-700">IT & Telecommunications</span>
            </p>
            <p>
              <span className="text-gray-500">Ngành nghề: </span>
              <span className="text-gray-700">UI/UX Designer</span>
            </p>
          </div>

        <div className="bg-gray-100 rounded px-4 py-2 flex items-center w-full">
          <Switch size="default" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Đang bật thông báo việc làm</span>
          <Tooltip title="Bật thông báo để nhận các cơ hội việc làm phù hợp">
            <QuestionCircleOutlined className="ml-2 text-gray-400" />
          </Tooltip>
        </div>
        </div>


          {/* Career goals section */}
          <div className="bg-white rounded-md shadow-sm p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Mục Tiêu Nghề Nghiệp</h3>
              <button className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
                <PlusOutlined className="mr-1" />
                Thêm mục tiêu nghề nghiệp
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Mục tiêu ngắn hạn:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1">
                  Học hỏi các công cụ và quy trình phát triển frontend hiện đại như Webpack,
                  Vite, Git, hoặc CI/CD để tăng hiệu quả công việc.
                </li>
              </ul>
              <h4 className="font-medium mb-2">Mục tiêu dài hạn:</h4>
              <ul className="list-disc pl-6">
                <li className="mb-1">
                  Trở thành một lập trình viên frontend chuyên nghiệp, có khả năng thiết kế và
                  xây dựng các sản phẩm web chất lượng cao, đáp ứng kỳ vọng của người dùng.
                </li>
                <li className="mb-1">
                  Phát triển khả năng thiết kế hệ thống giao diện phức tạp, tối ưu hóa hiệu suất
                  và bảo mật của các ứng dụng web frontend.
                </li>
                <li className="mb-1">
                  Đảm nhận vai trò Lead Frontend Developer hoặc UI/UX Designer, định hướng phát
                  triển giao diện người dùng và đưa ra các giải pháp sáng tạo cho sản phẩm.
                </li>
                <li className="mb-1">
                  Đóng góp vào các dự án lớn, xây dựng các ứng dụng web có hiệu suất cao và tích
                  hợp mượt mà với hệ thống backend.
                </li>
                <li className="mb-1">
                  Liên tục học hỏi các xu hướng công nghệ mới trong lĩnh vực frontend như
                  WebAssembly, Progressive Web Apps (PWA), hoặc AI/ML trong frontend để mở rộng
                  kiến thức chuyên môn.
                </li>
              </ul>
            </div>
          </div>

          {/* Work experience section */}
          <div className="bg-white rounded-md shadow-sm p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Kinh Nghiệm Làm Việc</h3>
              <button className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
                <PlusOutlined className="mr-1" />
                Thêm kinh nghiệm làm việc
              </button>
            </div>
            <div className="flex justify-center items-center p-12 text-gray-400 flex-col">
              <div className="w-24 h-24 mb-4">
                <img
                  src="/api/placeholder/96/96"
                  alt="Empty state"
                  className="w-full h-full opacity-30"
                />
              </div>
              <p>Chưa có thông tin kinh nghiệm làm việc</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}