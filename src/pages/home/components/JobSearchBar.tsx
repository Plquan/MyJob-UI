import { Button, Input, Select } from "antd"
import { EnvironmentOutlined, SearchOutlined} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../stores";
import { useTranslation } from "../../../provider/Languages";



const JobSearchBar = () => {
  const { t } = useTranslation();
    const { provinces } = useSelector((state: RootState) => state.provinceStore);

    return (
        <div className="bg-white rounded-xl mt-15 p-4 md:p-6 max-w-5xl mx-auto shadow-lg">
        <div className="flex items-center gap-3 justify-center w-full flex-wrap md:flex-nowrap pr-5 pl-5">
          
        <div className="relative flex-[3] min-w-[350px] w-full">
            <Input
                placeholder={t('home.searchJob.jobPlacehoder')}
                className="pl-10 h-11"
            />
         </div>
        
        <div className="relative w-56">
          <Select
            showSearch
            placeholder={t('home.searchJob.provincePlaceHolder')}
            className="w-full rounded-lg custom-select-location"
            suffixIcon={<EnvironmentOutlined className="text-pink-500 text-lg" />}
            style={{ width: '100%', height: 44 }}
            options= {provinces?.map((province) => ({
                value: province.id,
                label: province.name,
              }))}
          />
        </div>
        
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          className="h-11 px-6 bg-[rgb(123,104,238)] text-white font-semibold shadow-lg rounded-lg border-0 flex items-center gap-2"
          style={{ background: 'rgb(123,104,238)', border: 'none', height: 44 }}
        >
          {t('home.searchJob.button')}
        </Button>
        
        </div>
        </div>
    )
}

export default JobSearchBar;
