import { Button, Input, Select } from "antd"
import { EnvironmentOutlined} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../stores";



const JobSearchBar = () => {
    const { provinces } = useSelector((state: RootState) => state.provinceStore);

    return (
        <div className="bg-white rounded-2xl mt-15 p-4 md:p-6 max-w-5xl mx-auto shadow-lg">
        <div className="flex items-center gap-3 justify-center w-full flex-wrap md:flex-nowrap pr-10 pl-10">
          
        <div className="relative flex-[3] min-w-[350px] w-full">
            <Input
                placeholder="Tìm kiếm việc làm, vị trí, công ty..."
                className="pl-10 h-11"
            />
         </div>
        
        {/* Select địa điểm */}
        <div className="relative w-56">
          <Select
            showSearch
            placeholder="Chọn địa điểm"
            className="w-full rounded-lg custom-select-location"
            suffixIcon={<EnvironmentOutlined className="text-pink-500 text-lg" />}
            style={{ width: '100%', height: 44 }}
            options= {provinces?.map((province) => ({
                value: province.id,
                label: province.name,
              }))}
          />
        </div>
        
        {/* Button lọc nâng cao */}
        <Button
          type="primary"
          size="large"
          className="h-11 px-6 bg-[rgb(123,104,238)] text-white font-semibold shadow-lg rounded-lg border-0 flex items-center gap-2"
          style={{ background: 'rgb(123,104,238)', border: 'none', height: 44 }}
        >
          <span className="mr-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
              <path d="M9 10h6" />
              <path d="M9 14h6" />
            </svg>
          </span>
          Lọc nâng cao
        </Button>
        
        </div>
        </div>
    )
}

export default JobSearchBar;
