import { Row, Col, Input, Select, Button } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const AdvancedFilter = () => (
  <div className='pt-5 pb-2 pr-5 pl-5 bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)]' >
    <div style={{ maxWidth: 1800, margin: '0 auto' }}>
      <Row gutter={16} style={{ marginBottom: 16, marginLeft: 60, marginRight: 60 }}>
        <Col xs={24} sm={24} md={10}>
          <Input
            size="large"
            placeholder="Tìm kiếm cơ hội việc làm"
            style={{ height: 40, fontSize: 16 }}
          />
        </Col>
        <Col xs={24} sm={12} md={7}> 
          <Select
            placeholder="Nghề nghiệp"
            size="large"
            style={{ width: '100%', fontSize: 16, height: 40 }}
          >
            {/* <Option value="dev">Developer</Option> */}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={7}>
          <Select
            placeholder="Tỉnh thành"
            size="large"
            style={{ width: '100%', fontSize: 16, height: 40 }}
          >
            {/* <Option value="hn">Hà Nội</Option> */}
          </Select>
        </Col>
      </Row>


      {/* Hàng 2 */}
      <Row gutter={8} style={{ marginBottom: 16 }}>
        {[
          'Cấp bậc',
          'Kinh nghiệm',
          'Mức lương',
          'Học vấn',
          'Loại công việc',
          'Đăng trong',
        ].map((placeholder, idx) => (
          <Col key={idx} xs={24} sm={12} md={4} lg={3}>
            <Select
              placeholder={placeholder}
              size="large"
              style={{ width: '100%', height: 40, fontSize: 16 }}
            >
              {/* <Option value="...">...</Option> */}
            </Select>
          </Col>
        ))}

        <Col xs={24} sm={12} md={4} lg={3}>
          <Button
            icon={<SearchOutlined />}
            style={{ width: '100%', height: 40, fontSize: 16 }}
            type="primary"
          >
            Tìm kiếm
          </Button>
        </Col>

        <Col xs={24} sm={12} md={4} lg={3}>
          <Button
            icon={<DeleteOutlined />}
            style={{ width: '100%', height: 40, fontSize: 16}}
            danger
          >
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </div>
  </div>
);

export default AdvancedFilter;
