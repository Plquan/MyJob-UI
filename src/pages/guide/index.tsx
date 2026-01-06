import { Typography, Breadcrumb, Card, Tag } from 'antd';
import { FireOutlined, TrophyOutlined } from '@ant-design/icons';
import GuideCard from '../../components/GuideCard';
import { useTranslation } from '../../provider/Languages';
import ScrollReveal from '../../components/ScrollReveal';

const { Title } = Typography;

// Demo data cho các bài viết hướng dẫn về IT
const guideArticles = [
    {
        id: '1',
        title: 'Lộ trình trở thành Full Stack Developer từ con số 0',
        description: 'Hướng dẫn chi tiết các bước cần thiết để trở thành một Full Stack Developer chuyên nghiệp, từ học HTML/CSS cơ bản đến các framework hiện đại như React, Node.js và cơ sở dữ liệu.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        category: 'Lộ trình học',
        readTime: 12,
        publishDate: '05/01/2026',
        views: 2850,
    },
    {
        id: '2',
        title: 'Top 10 kỹ năng lập trình viên cần có trong năm 2026',
        description: 'Khám phá những kỹ năng quan trọng nhất mà các nhà tuyển dụng đang tìm kiếm, bao gồm AI/ML, Cloud Computing, DevOps và các công nghệ mới nhất.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        category: 'Kỹ năng',
        readTime: 8,
        publishDate: '04/01/2026',
        views: 3420,
    },
    {
        id: '3',
        title: 'Cách viết CV IT thu hút nhà tuyển dụng',
        description: 'Bí quyết tạo một CV IT nổi bật với các mẹo về cách trình bày dự án, kỹ năng kỹ thuật và kinh nghiệm làm việc để gây ấn tượng với nhà tuyển dụng.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
        category: 'Tìm việc',
        readTime: 10,
        publishDate: '03/01/2026',
        views: 4120,
    },
    {
        id: '4',
        title: 'React vs Vue vs Angular: Framework nào phù hợp với bạn?',
        description: 'So sánh chi tiết 3 framework JavaScript phổ biến nhất, giúp bạn lựa chọn công nghệ phù hợp với dự án và sự nghiệp của mình.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        category: 'Công nghệ',
        readTime: 15,
        publishDate: '02/01/2026',
        views: 2940,
    },
    {
        id: '5',
        title: 'Phỏng vấn IT: Các câu hỏi thường gặp và cách trả lời',
        description: 'Tổng hợp các câu hỏi phỏng vấn phổ biến cho các vị trí IT và cách trả lời hiệu quả để tăng cơ hội trúng tuyển.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        category: 'Phỏng vấn',
        readTime: 20,
        publishDate: '01/01/2026',
        views: 5680,
    },
    {
        id: '6',
        title: 'Mức lương IT tại Việt Nam 2026: Báo cáo và xu hướng',
        description: 'Phân tích mức lương trung bình cho các vị trí IT tại Việt Nam, từ Junior đến Senior, và xu hướng tăng lương trong ngành.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        category: 'Nghề nghiệp',
        readTime: 9,
        publishDate: '31/12/2025',
        views: 6240,
    },
    {
        id: '7',
        title: 'Docker và Kubernetes: Hướng dẫn cho người mới bắt đầu',
        description: 'Tìm hiểu về containerization và orchestration với Docker và Kubernetes, hai công nghệ quan trọng trong DevOps hiện đại.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
        category: 'DevOps',
        readTime: 18,
        publishDate: '30/12/2025',
        views: 3150,
    },
    {
        id: '8',
        title: 'Làm thế nào để làm việc hiệu quả từ xa (Remote)',
        description: 'Chia sẻ kinh nghiệm và công cụ giúp lập trình viên làm việc remote hiệu quả, quản lý thời gian và communication với team.',
        image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80',
        category: 'Làm việc',
        readTime: 7,
        publishDate: '29/12/2025',
        views: 2780,
    },
    {
        id: '9',
        title: 'Bảo mật ứng dụng web: Best practices 2026',
        description: 'Các nguyên tắc và kỹ thuật bảo mật quan trọng mà mọi developer cần biết để bảo vệ ứng dụng web khỏi các mối đe dọa phổ biến.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        category: 'Bảo mật',
        readTime: 14,
        publishDate: '28/12/2025',
        views: 4890,
    },
];

const popularArticles = [
    { id: '1', title: 'Mức lương IT tại Việt Nam 2026', views: 6240 },
    { id: '2', title: 'Phỏng vấn IT: Câu hỏi thường gặp', views: 5680 },
    { id: '3', title: 'Bảo mật ứng dụng web', views: 4890 },
    { id: '4', title: 'Cách viết CV IT thu hút', views: 4120 },
];

const categories = [
    'Tất cả',
    'Lộ trình học',
    'Kỹ năng',
    'Tìm việc',
    'Công nghệ',
    'Phỏng vấn',
    'Nghề nghiệp',
    'DevOps',
    'Bảo mật',
];

const GuidePage = () => {
    const { t } = useTranslation();

    const breadcrumbItems = [
        {
            title: (
                <a href="/" className="text-[#6A5ACD] underline font-bold">
                    {t('home.title1')}
                </a>
            ),
        },
        {
            title: <span className="text-gray-500">{t('guide.title')}</span>,
        },
    ];

    return (
        <>
            {/* Hero Section - Matching HomePage Dark Gradient */}
            <section className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] pt-24 pb-16 text-center text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-5">
                    <ScrollReveal>
                        <div className="text-center">
                            <h1 style={{ fontFamily: 'FZ Poppins', fontWeight: 900 }} className="text-4xl md:text-5xl mb-4 leading-tight transition-all duration-1000 ease-in-out">
                                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                    {t('guide.heroTitle')}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto transition-all duration-1000 delay-200">
                                {t('guide.heroSubtitle')}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4 md:p-5 pt-6 md:pt-10 flex flex-col lg:flex-row gap-4 md:gap-6">
                {/* Main content */}
                <div className="flex-1 w-full lg:w-auto">
                    <div className="rounded-lg bg-white border-2 border-gray-100 p-4 mb-6">
                        <Breadcrumb className="mb-3" items={breadcrumbItems} />

                        <Title level={2} className="font-bold mb-4">
                            {t('guide.title')} <span className="text-[#6A5ACD]">{guideArticles.length}</span> {t('guide.articles')}
                        </Title>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((category) => (
                                <Tag
                                    key={category}
                                    className={`cursor-pointer px-4 py-1 text-sm rounded-full transition-all ${category === 'Tất cả'
                                        ? 'bg-[#6A5ACD] text-white border-[#6A5ACD] shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-purple-50 hover:border-[#6A5ACD] border-gray-200'
                                        }`}
                                >
                                    {category}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    {/* Guide Articles Grid */}
                    <ScrollReveal delay={300}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {guideArticles.map((article) => (
                                <GuideCard
                                    key={article.id}
                                    {...article}
                                    onClick={(id) => {
                                        console.log('Navigate to guide detail:', id);
                                    }}
                                />
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[320px] flex flex-col gap-4 md:gap-6 shrink-0">
                    {/* Popular Articles */}
                    <ScrollReveal delay={400}>
                        <Card
                            className="shadow-lg border-gray-100"
                            title={
                                <span className="text-[#6A5ACD] font-bold flex items-center gap-2">
                                    <FireOutlined className="text-orange-500" />
                                    {t('guide.popular')}
                                </span>
                            }
                        >
                            <div className="flex flex-col gap-3">
                                {popularArticles.map((article, index) => (
                                    <div
                                        key={article.id}
                                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors group"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#6A5ACD] to-[#7B68EE] rounded-full flex items-center justify-center text-white font-bold text-xs">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#6A5ACD] transition-colors">
                                                {article.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {article.views.toLocaleString()} lượt xem
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </ScrollReveal>

                    {/* Featured Content */}
                    <ScrollReveal delay={500}>
                        <Card
                            className="shadow-lg bg-gradient-to-br from-white to-purple-50/30 border-purple-100"
                            title={
                                <span className="text-[#6A5ACD] font-bold flex items-center gap-2">
                                    <TrophyOutlined className="text-yellow-500" />
                                    {t('guide.featured')}
                                </span>
                            }
                        >
                            <div className="space-y-3">
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-purple-50">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        🎯 Khóa học IT miễn phí
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Truy cập các khóa học lập trình miễn phí từ cơ bản đến nâng cao
                                    </p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-purple-50">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        💼 Tư vấn nghề nghiệp
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Nhận tư vấn từ các chuyên gia về lộ trình phát triển sự nghiệp IT
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </ScrollReveal>
                </div>
            </div>
        </>
    );
};

export default GuidePage;
