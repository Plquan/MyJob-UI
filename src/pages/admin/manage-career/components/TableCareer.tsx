
import { Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import { careerActions } from "../../../../stores/careerStore/careerReducer";
import type { ICareerData } from "../../../../types/career/CareerType";

const TableCareer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { careers, loading } = useSelector(
        (state: RootState) => state.careerStore
    );

    useEffect(() => {
        dispatch(careerActions.getAllCareers());
    }, [dispatch]);

    const columns: ColumnsType<ICareerData> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên ngành nghề",
            dataIndex: "name",
            key: "name",
        },
    ];

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Table
                loading={loading}
                columns={columns}
                dataSource={careers || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Space>
    );
};

export default TableCareer;
