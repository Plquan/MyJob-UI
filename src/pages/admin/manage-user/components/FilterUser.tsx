import { Input, Select } from 'antd';
import type { IUserFilter } from '../../../../types/user/UserType';

interface FilterUserProps {
  filters: IUserFilter;
  onFilterChange: (newPartialFilter: Partial<IUserFilter>) => void;
  onSearch: (value: string) => void;
}

const FilterUser: React.FC<FilterUserProps> = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="mb-4 mt-4 flex space-x-4 items-center">
      <Input.Search 
        placeholder="Tìm kiếm theo tên hoặc email" 
        className="w-70!" 
        onSearch={onSearch}
        allowClear
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Vai trò:</span>
        <Select 
          defaultValue={null} 
          className="w-40"
          onChange={(value) => onFilterChange({ roleName: value || undefined })}
        >
          <Select.Option>Tất cả</Select.Option>
          <Select.Option value="ADMIN">Quản trị viên</Select.Option>
          <Select.Option value="CANDIDATE">Ứng viên</Select.Option>
          <Select.Option value="EMPLOYER">Nhà tuyển dụng</Select.Option>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Xác thực:</span>
        <Select 
          defaultValue={null} 
          className="w-40"
          onChange={(value) =>
            onFilterChange({
              isVerifyEmail: value === null ? undefined : value,
            })
          }
        >
          <Select.Option>Tất cả</Select.Option>
          <Select.Option value={true}>Đã xác thực</Select.Option>
          <Select.Option value={false}>Chưa xác thực</Select.Option>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Trạng thái:</span>
        <Select 
          defaultValue={null} 
          className="w-40"
          onChange={(value) =>
            onFilterChange({ isActive: value === null ? undefined : value })
          }                
        >
          <Select.Option>Tất cả</Select.Option>
          <Select.Option value={true}>Đang hoạt động</Select.Option>
          <Select.Option value={false}>Không hoạt động</Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default FilterUser;
