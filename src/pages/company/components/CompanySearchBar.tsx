import { Button, Input } from "antd";
import Select from "antd/es/select";
const { Option } = Select;

const CompanySearchBar = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                <Input placeholder="GSI" allowClear className="w-90!" />
                <Select defaultValue="Tất cả tỉnh thành" className="w-44!">
                    <Option value="all">Tất cả tỉnh thành</Option>
                    <Option value="hcm">TP.HCM</Option>
                    <Option value="hn">Hà Nội</Option>
                </Select>
                <Button type="primary" className="bg-[#154C91]!">
                    Tìm Kiếm
                </Button>
            </div>
        </>

    );
};

export default CompanySearchBar;
