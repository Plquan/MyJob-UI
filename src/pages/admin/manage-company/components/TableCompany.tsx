
import { Table, Space, Image, Input, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import { companyActions } from "../../../../stores/companyStore/companyReducer";
import { FileType } from "../../../../constant/fileType";
import type { ICompanyWithImagesData } from "../../../../types/company/CompanyType";

const TableCompany = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { companies, loading, requestParams } = useSelector(
        (state: RootState) => state.companyStore
    );

    useEffect(() => {
        dispatch(companyActions.getCompanies(requestParams));
    }, [dispatch, requestParams]);

    const handlePageChange = (page: number) => {
        dispatch(companyActions.setPage(page));
    };

    const onSearch = (value: string) => {
        dispatch(companyActions.setCompanyName(value));
    };

    const columns: ColumnsType<ICompanyWithImagesData> = [
        {
            title: "Logo",
            key: "logo",
            render: (_, record) => {
                const logo = record.images?.find((img) => img.fileType === FileType.LOGO);
                return logo ? (
                    <Image src={logo.url} width={50} height={50} style={{ objectFit: 'contain' }} />
                ) : (
                    <span>No Logo</span>
                );
            },
        },
        {
            title: "Tên công ty",
            dataIndex: ["company", "companyName"],
            key: "companyName",
        },
        {
            title: "Email",
            dataIndex: ["company", "companyEmail"],
            key: "companyEmail",
        },
        {
            title: "Số điện thoại",
            dataIndex: ["company", "companyPhone"],
            key: "companyPhone",
        },
        {
            title: "Mã số thuế",
            dataIndex: ["company", "taxCode"],
            key: "taxCode",
        },
        {
            title: "Lĩnh vực",
            dataIndex: ["company", "fieldOperation"],
            key: "fieldOperation",
        },
    ];

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input.Search
                placeholder="Tìm kiếm công ty"
                onSearch={onSearch}
                enterButton
                allowClear
            />
            <Table
                loading={loading}
                columns={columns}
                dataSource={companies.items}
                rowKey={(record) => record.company.id.toString()}
                pagination={false}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <Pagination
                    current={requestParams.page}
                    pageSize={requestParams.limit}
                    total={companies.totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </Space>
    );
};

export default TableCompany;
