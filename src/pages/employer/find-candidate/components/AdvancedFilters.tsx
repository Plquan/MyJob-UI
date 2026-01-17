import { Select, Button } from 'antd';
import {
  CloseCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import {
  POSITION_OPTIONS,
  WORKPLACE_OPTIONS,
  EXPERIENCE_OPTIONS,
  ACADEMICLEVEL_OPTIONS,
  JOBTYPE_OPTIONS,
} from '../../../../constant/selectOptions';

const { Option } = Select;

interface AdvancedFiltersProps {
  filters: {
    careerId: number | undefined;
    position: number | undefined;
    typeOfWorkPlace: number | undefined;
    experience: number | undefined;
    academicLevel: number | undefined;
    jobType: number | undefined;
  };
  careers: any[] | undefined;
  hasActiveFilters: boolean;
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
}

const AdvancedFilters = ({
  filters,
  careers,
  hasActiveFilters,
  onFilterChange,
  onResetFilters,
}: AdvancedFiltersProps) => {

  return (
    <div className="w-full lg:w-80 shrink-0">
      <>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Bộ lọc nâng cao</h3>
          {hasActiveFilters && (
            <Button
              type="text"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={onResetFilters}
              className="text-red-500! hover:text-red-700!"
            >
              Xóa lọc
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Ngành nghề */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <TeamOutlined className="text-blue-500" />
              Ngành nghề
            </label>
            <Select
              placeholder="Tất cả ngành nghề"
              value={filters.careerId}
              onChange={(value) => onFilterChange('careerId', value)}
              allowClear
              className="w-full"
              showSearch
              filterOption={(input, option) =>
                String(option?.children || '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {careers?.map((career) => (
                <Option key={career.id} value={career.id}>
                  {career.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Kinh nghiệm */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <TrophyOutlined className="text-yellow-500" />
              Kinh nghiệm
            </label>
            <Select
              placeholder="Tất cả kinh nghiệm"
              value={filters.experience}
              onChange={(value) => onFilterChange('experience', value)}
              allowClear
              className="w-full"
            >
              {EXPERIENCE_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Cấp bậc */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ExperimentOutlined className="text-purple-500" />
              Cấp bậc
            </label>
            <Select
              placeholder="Tất cả vị trí"
              value={filters.position}
              onChange={(value) => onFilterChange('position', value)}
              allowClear
              className="w-full"
            >
              {POSITION_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Học vấn */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <BookOutlined className="text-green-500" />
              Học vấn
            </label>
            <Select
              placeholder="Tất cả trình độ"
              value={filters.academicLevel}
              onChange={(value) => onFilterChange('academicLevel', value)}
              allowClear
              className="w-full"
            >
              {ACADEMICLEVEL_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Hình thức làm việc */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <EnvironmentOutlined className="text-red-500" />
              Hình thức làm việc
            </label>
            <Select
              placeholder="Tất cả hình thức"
              value={filters.typeOfWorkPlace}
              onChange={(value) => onFilterChange('typeOfWorkPlace', value)}
              allowClear
              className="w-full"
            >
              {WORKPLACE_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Loại hình công việc */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ClockCircleOutlined className="text-orange-500" />
              Loại hình công việc
            </label>
            <Select
              placeholder="Tất cả loại hình"
              value={filters.jobType}
              onChange={(value) => onFilterChange('jobType', value)}
              allowClear
              className="w-full"
            >
              {JOBTYPE_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdvancedFilters;

