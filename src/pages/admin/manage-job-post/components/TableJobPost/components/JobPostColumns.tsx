import type { ColumnsType } from "antd/es/table";
import type { ICompanyJobPost } from "../../../../../../types/job-post/JobPostType";
import { Tag } from "antd";
import dayjs from "dayjs";

export const JobPostColumns = (): ColumnsType<ICompanyJobPost> => [
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
        title: "Company ID",
        dataIndex: "companyId",
        key: "companyId",
        width: 120,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 130,
        render: (status: number) => {
            const statusConfig: Record<number, { text: string; color: string }> = {
                0: { text: "Chờ duyệt", color: "gold" },
                1: { text: "Đã duyệt", color: "green" },
                2: { text: "Từ chối", color: "red" },
            };
            const config = statusConfig[status] || { text: "Không xác định", color: "default" };
            return <Tag color={config.color}>{config.text}</Tag>;
        },
    },
    {
        title: "Lượng ứng tuyển",
        dataIndex: "activityCount",
        key: "activityCount",
        width: 150,
        align: "center",
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
