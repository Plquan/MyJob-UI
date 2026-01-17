import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../stores";
import type { ICompanyWithImagesData } from "../../types/company/CompanyType";
import CompanyItem from "../../components/CompanyItem";
import CompanySearchBar from "./components/CompanySearchBar";

const CompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading, requestParams } = useSelector((state: RootState) => state.companyStore);

  useEffect(() => {
    dispatch(companyActions.getCompanies({
      page: requestParams.page,
      limit: requestParams.limit,
      companyName: requestParams.companyName,
      provinceId: requestParams.provinceId
    }));
  }, [dispatch, requestParams.page, requestParams.limit, requestParams.companyName, requestParams.provinceId]);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold! text-gray-900">Khám Phá Văn Hóa Công ty</h1>
            <p className="text-sm text-gray-700">Tìm hiểu văn hóa công ty và chọn cho bạn nơi làm việc phù hợp nhất</p>
          </div>
          <CompanySearchBar />
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-base font-bold mb-4">
            <span className="text-red-500">{companies.totalItems}</span> công ty
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.items && companies.items.map((company: ICompanyWithImagesData) => (
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
