import type { ColumnsType } from "antd/es/table";
import type { ICompanyJobPost } from "../../../../../../types/job-post/JobPostType";
import { Select, message } from "antd";
import dayjs from "dayjs";
import http from "../../../../../../ultils/axios/axiosCustom";

const { Option } = Select;

export const JobPostColumns = (onStatusUpdate: () => void): ColumnsType<ICompanyJobPost> => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
    },
    {
        title: "Tên công việc",
        dataIndex: "jobName",
        key: "jobName",
        width: 250,
        ellipsis: true,
    },
    {
        title: "Công ty",
        dataIndex: ["company", "companyName"],
        key: "companyName",
        width: 200,
        ellipsis: true,
        render: (_, record) => {
            return record.company?.companyName || `Company ID: ${record.companyId}`;
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 180,
        render: (status: number, record: ICompanyJobPost) => {
            const handleStatusChange = async (newStatus: number) => {
                try {
                    await http.put(`/job-post/update-status/${record.id}`, { status: newStatus });
                    message.success("Cập nhật trạng thái thành công");
                    onStatusUpdate(); // Refresh table
                } catch (error: any) {
                    console.error("Failed to update status:", error);
                    message.error("Cập nhật trạng thái thất bại");
                }
            };

            return (
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    style={{ width: "100%" }}
                    size="small"
                >
                    <Option value={1}>
                        <span style={{ color: "#FF9500" }}>● Chờ duyệt</span>
                    </Option>
                    <Option value={2}>
                        <span style={{ color: "#22C55E" }}>● Đã duyệt</span>
                    </Option>
                    <Option value={3}>
                        <span style={{ color: "#EF4444" }}>● Từ chối</span>
                    </Option>
                    <Option value={4}>
                        <span style={{ color: "#9CA3AF" }}>● Đã đóng</span>
                    </Option>
                </Select>
            );
        },
    },
    {
        title: "Lương (VND)",
        key: "salary",
        width: 200,
        render: (_, record) => {
            const formatSalary = (amount: number) => {
                return new Intl.NumberFormat("vi-VN").format(amount);
            };
            return `${formatSalary(record.salaryMin)} - ${formatSalary(record.salaryMax)}`;
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
        title: "Hạn nộp",
        dataIndex: "deadline",
        key: "deadline",
        width: 150,
        render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
];
