import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { packageActions } from "../../../../../stores/packageStore/packageReducer";
import { formatVND } from "../../../../../ultils/functions/formatVND";
import type { IPaymentHistoryDto } from "../../../../../types/payment/PaymentType";
import type { ColumnsType } from "antd/es/table";

const PaymentHistoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { paymentHistory, loading } = useSelector((state: RootState) => state.packageStore);

  useEffect(() => {
    dispatch(packageActions.getPaymentHistory());
  }, [dispatch]);

  const columns: ColumnsType<IPaymentHistoryDto> = [
    {
      title: 'STT',
      key: 'index',
      width: 80,
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên công ty',
      key: 'companyName',
      width: 200,
      render: (_: any, record: IPaymentHistoryDto) => record.company?.companyName || 'N/A',
    },
    {
      title: 'Email công ty',
      key: 'companyEmail',
      width: 200,
      render: (_: any, record: IPaymentHistoryDto) => record.company?.companyEmail || 'N/A',
    },
    {
      title: 'Số điện thoại',
      key: 'companyPhone',
      width: 150,
      render: (_: any, record: IPaymentHistoryDto) => record.company?.companyPhone || 'N/A',
    },
    {
      title: 'Mã số thuế',
      key: 'taxCode',
      width: 150,
      render: (_: any, record: IPaymentHistoryDto) => record.company?.taxCode || 'N/A',
    },
    {
      title: 'Tên gói',
      key: 'packageName',
      width: 200,
      render: (_: any, record: IPaymentHistoryDto) => record.package?.name || 'N/A',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      align: 'right',
      render: (price: number) => formatVND(price),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 150,
      render: (method: string) => method || 'N/A',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: 150,
      render: (date: Date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
      render: (date: Date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
      render: (date: Date) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={paymentHistory}
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} bản ghi`,
        }}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
      />
    </div>
  );
};

export default PaymentHistoryTable;

