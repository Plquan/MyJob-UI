import { Input, Select, Table, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { jobPostActions } from "../../../../../stores/jobPostStore/jobPostReducer";
import { JobPostColumns } from "./components/JobPostColumns";

const { Search } = Input;
const { Option } = Select;

const TableJobPost = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { adminJobPosts, loading, adminJobPostRequestParams } = useSelector(
        (state: RootState) => state.jobPostStore
    );

    useEffect(() => {
        dispatch(jobPostActions.getAllJobPosts(adminJobPostRequestParams));
    }, [dispatch, adminJobPostRequestParams]);

    const handleSearch = (value: string) => {
        dispatch(jobPostActions.setAdminJobPostSearch(value || undefined));
    };

    const handleStatusChange = (value: number | undefined) => {
        dispatch(jobPostActions.setAdminJobPostStatus(value));
    };

    const handleTableChange = (pagination: any) => {
        if (pagination.current !== adminJobPostRequestParams.page) {
            dispatch(jobPostActions.setAdminJobPostPage(pagination.current));
        }
        if (pagination.pageSize !== adminJobPostRequestParams.limit) {
            dispatch(jobPostActions.setAdminJobPostLimit(pagination.pageSize));
        }
    };

    const handleStatusUpdate = () => {
        dispatch(jobPostActions.getAllJobPosts(adminJobPostRequestParams));
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }} wrap>
                <Search
                    placeholder="Tìm kiếm theo tên công việc"
                    allowClear
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
                <Select
                    placeholder="Lọc theo trạng thái"
                    allowClear
                    onChange={handleStatusChange}
                    style={{ width: 200 }}
                    value={adminJobPostRequestParams.jobPostStatus}
                >
                    <Option value={1}>Chờ duyệt</Option>
                    <Option value={2}>Đã duyệt</Option>
                    <Option value={3}>Từ chối</Option>
                    <Option value={4}>Đã đóng</Option>
                </Select>
            </Space>

            <Table
                columns={JobPostColumns(handleStatusUpdate)}
                dataSource={adminJobPosts.items}
                loading={loading}
                pagination={{
                    current: adminJobPostRequestParams.page,
                    pageSize: adminJobPostRequestParams.limit,
                    total: adminJobPosts.totalItems,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} tin tuyển dụng`,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
                bordered
                scroll={{ x: 1200 }}
                rowKey="id"
                onChange={handleTableChange}
            />
        </div>
    );
};

export default TableJobPost;
