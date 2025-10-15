import { Input, Select, Button, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../../stores";
import type { ICompanyWithImagesData } from "../../../types/company/CompanyType";
import CompanyItem from "../../../components/CompanyItem";
const { Option } = Select;


const CompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading } = useSelector((state: RootState) => state.companyStore);

  useEffect(() => {
    dispatch(companyActions.getCompanies());
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Nhà tuyển dụng hàng đầu</h1>
          </div>

          <div className="flex items-center  gap-2 rounded-lg">
            <Input placeholder="GSI" allowClear className="w-80!" />
            <Select defaultValue="Tất cả tỉnh thành" className="w-44">
              <Option value="all">Tất cả tỉnh thành</Option>
              <Option value="hcm">TP.HCM</Option>
              <Option value="hn">Hà Nội</Option>
            </Select>
            <Button type="primary" icon={<SearchOutlined />} className="px-4 h-10 flex items-center">
              Tìm Kiếm
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 max-w-4xl mx-auto">
          <h2 className="text-base font-bold mb-4">
            <span className="text-red-500">{companies.length}</span> công ty
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company: ICompanyWithImagesData) => (
                <CompanyItem key={company.company.id} company={company} />
              ))}
            </div>
          )}
        </div>

      </div>

    </>
  );
};

export default CompanyPage;
