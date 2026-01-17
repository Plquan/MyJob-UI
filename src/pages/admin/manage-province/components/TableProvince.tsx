
import { Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import { provinceActions } from "../../../../stores/provinceStore/provinceReducer";
import type { IProvince } from "../../../../types/province/ProvinceType";

const TableProvince = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { provinces, loading } = useSelector(
        (state: RootState) => state.provinceStore
    );

    useEffect(() => {
        dispatch(provinceActions.getAllProvinces());
    }, [dispatch]);

    const columns: ColumnsType<IProvince> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mã tỉnh",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Tên tỉnh thành",
            dataIndex: "name",
            key: "name",
        },
    ];

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Table
                loading={loading}
                columns={columns}
                dataSource={provinces || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Space>
    );
};

export default TableProvince;
