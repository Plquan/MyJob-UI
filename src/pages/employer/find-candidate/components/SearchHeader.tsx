import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SearchHeaderProps {
  filters: {
    title: string;
    provinceId: number | undefined;
  };
  provinces: any[] | undefined;
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
}

const SearchHeader = ({
  filters,
  provinces,
  onFilterChange,
  onApplyFilters,
}: SearchHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-2">
          <Input
            placeholder="Nhập từ khóa..."
            value={filters.title}
            onChange={(e) => onFilterChange('title', e.target.value)}
            onPressEnter={onApplyFilters}
            allowClear
          />
        </div>

        <div className="lg:col-span-2">
          <Select
            placeholder="Chọn Tỉnh/Thành phố"
            value={filters.provinceId}
            onChange={(value) => onFilterChange('provinceId', value)}
            allowClear
            className="w-full"
            showSearch
            filterOption={(input, option) =>
              String(option?.children || '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {provinces?.map((province) => (
              <Option key={province.id} value={province.id}>
                {province.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            type="primary"
            block
            icon={<SearchOutlined />}
            onClick={onApplyFilters}
            className="bg-[#154C91]! hover:opacity-60! text-white!"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

