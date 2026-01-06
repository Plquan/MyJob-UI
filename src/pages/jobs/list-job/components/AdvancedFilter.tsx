import { Row, Col, Input, Select, Button } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  POSITION_OPTIONS,
  EXPERIENCE_OPTIONS,
  SALARY_RANGE_OPTIONS,
  ACADEMICLEVEL_OPTIONS,
  JOBTYPE_OPTIONS,
  POSTED_WITHIN_OPTIONS
} from '../../../../constant/selectOptions';

interface IAdvancedFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  careerId?: number;
  onCareerChange: (value: number | undefined) => void;
  provinceId?: number;
  onProvinceChange: (value: number | undefined) => void;
  position?: number;
  onPositionChange: (value: number | undefined) => void;
  experience?: number;
  onExperienceChange: (value: number | undefined) => void;
  salaryRange?: { min: number; max: number };
  onSalaryRangeChange: (value: { min: number; max: number } | undefined) => void;
  academicLevel?: number;
  onAcademicLevelChange: (value: number | undefined) => void;
  jobType?: number;
  onJobTypeChange: (value: number | undefined) => void;
  postedWithin?: number;
  onPostedWithinChange: (value: number | undefined) => void;
  onSearch: () => void;
  onClearFilters: () => void;
  careers: Array<{ id: number; name: string }>;
  provinces: Array<{ id: number; name: string }>;
}

const AdvancedFilter: React.FC<IAdvancedFilterProps> = ({
  searchTerm,
  onSearchChange,
  careerId,
  onCareerChange,
  provinceId,
  onProvinceChange,
  position,
  onPositionChange,
  experience,
  onExperienceChange,
  salaryRange,
  onSalaryRangeChange,
  academicLevel,
  onAcademicLevelChange,
  jobType,
  onJobTypeChange,
  postedWithin,
  onPostedWithinChange,
  onSearch,
  onClearFilters,
  careers,
  provinces,
}) => (
  <div className='pt-5 pb-2 pr-5 pl-5 bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)]' >
    <div style={{ maxWidth: 1800, margin: '0 auto' }}>
      <Row gutter={16} style={{ marginBottom: 16, marginLeft: 60, marginRight: 60 }}>
        <Col xs={24} sm={24} md={10}>
          <Input
            size="large"
            placeholder="Tìm kiếm cơ hội việc làm"
            style={{ height: 40, fontSize: 16 }}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onPressEnter={onSearch}
          />
        </Col>
        <Col xs={24} sm={12} md={7}>
          <Select
            allowClear
            placeholder="Nghề nghiệp"
            size="large"
            style={{ width: '100%', fontSize: 16, height: 40 }}
            value={careerId}
            onChange={onCareerChange}
            options={careers.map((career) => ({
              value: career.id,
              label: career.name,
            }))}
          />
        </Col>
        <Col xs={24} sm={12} md={7}>
          <Select
            allowClear
            placeholder="Tỉnh thành"
            size="large"
            style={{ width: '100%', fontSize: 16, height: 40 }}
            value={provinceId}
            onChange={onProvinceChange}
            options={provinces.map((province) => ({
              value: province.id,
              label: province.name,
            }))}
          />
        </Col>
      </Row>


      {/* Hàng 2 */}
      <Row gutter={8} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Cấp bậc"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={position}
            onChange={onPositionChange}
            options={POSITION_OPTIONS}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Kinh nghiệm"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={experience}
            onChange={onExperienceChange}
            options={EXPERIENCE_OPTIONS}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Mức lương"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={salaryRange ? JSON.stringify(salaryRange) : undefined}
            onChange={(value) => onSalaryRangeChange(value ? JSON.parse(value) : undefined)}
            options={SALARY_RANGE_OPTIONS.map(opt => ({
              value: JSON.stringify(opt.value),
              label: opt.label
            }))}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Học vấn"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={academicLevel}
            onChange={onAcademicLevelChange}
            options={ACADEMICLEVEL_OPTIONS}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Loại công việc"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={jobType}
            onChange={onJobTypeChange}
            options={JOBTYPE_OPTIONS}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Select
            allowClear
            placeholder="Đăng trong"
            size="large"
            style={{ width: '100%', height: 40, fontSize: 16 }}
            value={postedWithin}
            onChange={onPostedWithinChange}
            options={POSTED_WITHIN_OPTIONS}
          />
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Button
            icon={<SearchOutlined />}
            style={{ width: '100%', height: 40, fontSize: 16, backgroundColor: '#6A5ACD' }}
            type="primary"
            onClick={onSearch}
          >
            Tìm kiếm
          </Button>
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Button
            icon={<DeleteOutlined />}
            style={{ width: '100%', height: 40, fontSize: 16 }}
            danger
            onClick={onClearFilters}
          >
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </div>
  </div>
);

export default AdvancedFilter;
