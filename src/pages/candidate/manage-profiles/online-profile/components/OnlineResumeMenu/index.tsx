import { UserOutlined, IdcardOutlined, ProfileOutlined, ReadOutlined, SafetyCertificateOutlined, GlobalOutlined, ToolOutlined } from "@ant-design/icons";
import { Card } from "antd";

const menuItems = [
  { icon: <UserOutlined />, label: "Thông tin cá nhân", id: "profile" },
  { icon: <IdcardOutlined />, label: "Thông tin chung", id: "resume" },
  { icon: <ProfileOutlined />, label: "Kinh nghiệm làm việc", id: "experience" },
  { icon: <ReadOutlined />, label: "Thông tin học vấn", id: "education" },
  { icon: <SafetyCertificateOutlined />, label: "Chứng chỉ", id: "certificate" },
  { icon: <GlobalOutlined />, label: "Kỹ năng ngôn ngữ", id: "language" },
  { icon: <ToolOutlined />, label: "Kỹ năng chuyên môn", id: "skill" },
];

const OnlineResumeMenu = () => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: middle,
        behavior: "smooth"
      });
    }
  };

  return (
    <Card title={"Hồ sơ trực tuyến của bạn"} className="w-72">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li 
            key={item.id} 
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default OnlineResumeMenu; 