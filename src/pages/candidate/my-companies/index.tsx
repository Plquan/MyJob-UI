import { Tabs, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const companiesViewed = [
  {
    id: 1,
    logo: 'https://dummyimage.com/60x60/000/fff&text=GSI',
    name: 'GSI GROUP LIMITED',
    position: 'Lập trình viên Backend',
    count: 1,
    lastViewed: '21/04/2024 01:15',
  },
  {
    id: 2,
    logo: 'https://dummyimage.com/60x60/000/fff&text=GSI',
    name: 'GSI GROUP LIMITED',
    position: 'Software Engineer',
    count: 1,
    lastViewed: '21/04/2024 01:01',
  },
];

const companiesFollowed = [
  {
    id: 1,
    logo: 'https://dummyimage.com/60x60/000/fff&text=ABC',
    name: 'ABC COMPANY',
    position: 'UI/UX Designer',
    count: 2,
    lastViewed: '20/04/2024 10:00',
  },
];

const MyCompany = () => {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Nhà Tuyển Dụng Xem Hồ Sơ" key="1">
          {companiesViewed.map((c) => (
            <div key={c.id} className="flex items-center border mb-4 rounded p-4 bg-white">
              <Avatar src={c.logo} size={60} icon={<UserOutlined />} className="mr-4" />
              <div>
                <div className="font-bold">{c.name}</div>
                <div className="text-sm text-gray-600">
                  Đã xem hồ sơ {c.position} {c.count} lần
                </div>
                <div className="text-xs text-gray-400">
                  Lần xem cuối {c.lastViewed}
                </div>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theo Dõi Công Ty" key="2">
          {companiesFollowed.map((c) => (
            <div key={c.id} className="flex items-center border mb-4 rounded p-4 bg-white">
              <Avatar src={c.logo} size={60} icon={<UserOutlined />} className="mr-4" />
              <div>
                <div className="font-bold">{c.name}</div>
                <div className="text-sm text-gray-600">
                  Đã theo dõi vị trí {c.position} {c.count} lần
                </div>
                <div className="text-xs text-gray-400">
                  Lần tương tác cuối {c.lastViewed}
                </div>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyCompany; 