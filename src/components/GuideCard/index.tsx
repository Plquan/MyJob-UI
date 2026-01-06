import { Card } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';

interface GuideCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    readTime: number;
    publishDate: string;
    views: number;
    onClick?: (id: string) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({
    id,
    title,
    description,
    image,
    category,
    readTime,
    publishDate,
    views,
    onClick,
}) => {
    return (
        <Card
            hoverable
            onClick={() => onClick?.(id)}
            className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-gray-200"
            cover={
                <div className="relative overflow-hidden h-48">
                    <img
                        alt={title}
                        src={image}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-[#6A5ACD] to-[#7B68EE] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            {category}
                        </span>
                    </div>
                </div>
            }
        >
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-snug hover:text-[#6A5ACD] transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <ClockCircleOutlined className="text-[#6A5ACD]" />
                            {readTime} phút đọc
                        </span>
                        <span className="flex items-center gap-1">
                            <CalendarOutlined className="text-[#7B68EE]" />
                            {publishDate}
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-gray-400">
                        <EyeOutlined />
                        {views.toLocaleString()}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default GuideCard;
