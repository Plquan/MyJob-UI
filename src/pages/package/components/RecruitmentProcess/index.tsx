import { Timeline, Typography } from "antd"
const {  Title } = Typography
const RecruitmentProcess = () => {
    return (
        <>
                <div>
          <Title level={3} className="text-center !mb-6">Quy trình tuyển dụng</Title>
          <div className="flex justify-center">
            <Timeline
              mode="alternate"
              className="p-6 w-full"
              items={[
                {
                  color: "blue",
                  position: "left",
                  children: <span>Đăng ký tài khoản và lựa chọn gói dịch vụ.</span>,
                },
                {
                  color: "green",
                  position: "right",
                  children: <span>Tạo bài đăng tuyển dụng với các tiêu chí chi tiết.</span>,
                },
                {
                  color: "red",
                  position: "left",
                  children: <span >Sử dụng công cụ phân tích để xem xét ứng viên tiềm năng.</span>,
                },
                {
                  color: "yellow",
                  position: "right",
                  children: <span>Liên hệ với ứng viên và tổ chức phỏng vấn.</span>,
                },
                {
                  color: "orange",
                  position: "left",
                  children: <span>Hoàn tất quy trình tuyển dụng với sự hỗ trợ của chúng tôi.</span>,
                },
              ]}
            />
          </div>
        </div>
        </>
    )
}

export default RecruitmentProcess