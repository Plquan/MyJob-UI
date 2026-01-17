import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../stores/companyStore/companyReducer";
import { provinceActions } from "../../../stores/provinceStore/provinceReducer";
import type { RootState, AppDispatch } from "../../../stores";
import useDebounce from "../../../ultils/hooks/useDebounce";

const CompanySearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { requestParams } = useSelector((state: RootState) => state.companyStore);
    const { provinces } = useSelector((state: RootState) => state.provinceStore);
    const [searchValue, setSearchValue] = useState<string>(requestParams.companyName || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        dispatch(provinceActions.getAllProvinces());
    }, [dispatch]);

    useEffect(() => {
        dispatch(companyActions.setCompanyName(debouncedSearch || undefined));
    }, [debouncedSearch, dispatch]);

    const handleProvinceChange = (value: number | undefined) => {
        dispatch(companyActions.setProvinceId(value));
    };

    return (
        <div className="flex items-center gap-2 w-150">
            <Input
                placeholder="Tìm kiếm công ty theo tên..."
                allowClear
                className="flex-1"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
            />
            <Select
                placeholder="Tất cả tỉnh thành"
                className="w-52!"
                allowClear
                value={requestParams.provinceId}
                onChange={handleProvinceChange}
            >
                {provinces?.map(province => (
                    <Select.Option key={province.id} value={province.id}>
                        {province.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default CompanySearchBar;
