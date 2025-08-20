import { UserOutlined, IdcardOutlined, ProfileOutlined, ReadOutlined, SafetyCertificateOutlined, GlobalOutlined, ToolOutlined, DownloadOutlined } from "@ant-design/icons";
import { Card, Progress, Tooltip, Button } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../stores";
import type { IOnlineResume } from "../../../../../types/resume/ResumeType";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPdfDocument from "../../../../../components/CVdoc";

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
  const { 
    educations,
    resume,
    skills,
    candidate,
    userInfo,
    certificates,
    languages,
    experiences } = useSelector((state: RootState) => state.onlineResumeStore)

  const onlineResume: IOnlineResume = {
    userInfo,
    resume,
    candidate,
    educations,
    certificates,
    experiences,
    languages,
    skills
  }

  // Tính completion
  let completion = 0;

  if(candidate?.phone) completion += 25
  if(resume?.title) completion += 25
  if(experiences.length > 0) completion += 10
  if(educations.length > 0) completion += 10
  if(certificates.length > 0) completion += 10
  if(languages.length > 0) completion += 10
  if(skills.length > 0) completion += 10

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: middle,
        behavior: "smooth"
      })
    }
  }

  return (
    <Card title={"Hồ sơ của bạn"} className="w-72" 
     extra = {     
      <PDFDownloadLink
        document={<CVPdfDocument resume={onlineResume} />}
        fileName="myjob-cv.pdf"
      >
        {({ loading }) => (
          <Button
            loading={loading}
          >
            Tải xuống
          </Button>
        )}
      </PDFDownloadLink>
     }
    >
      <div className="flex flex-col items-center mb-4">
        <Tooltip
          title={
            <span>
              Nâng cấp hồ sơ của bạn lên <span style={{ color: '#6A5ACD', fontWeight: 600 }}>70%</span> để tải mẫu CV dành cho chuyên gia IT.
            </span>
          }
        >
          <div className="relative flex flex-col items-center">
            <Progress
              type="dashboard"
              percent={completion}
              strokeColor={{ '0%': '#6A5ACD', '100%': '#0096db' }}
              trailColor="#e0e7ff"
              format={percent => <span style={{ color: '#222', fontWeight: 700 }}>{percent}%</span>}
            />
            <span className="absolute bottom-2 text-xs text-gray-500">hoàn thành</span>
          </div>
        </Tooltip>
      </div>

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
  )
}
export default OnlineResumeMenu