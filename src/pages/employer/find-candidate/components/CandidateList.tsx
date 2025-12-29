import { Spin, Empty, Pagination } from 'antd';
import CandidateCard from '../../../../components/CandidateCard';

interface CandidateListProps {
  loading: boolean;
  searchResults: {
    items: any[];
    totalItems: number;
    totalPages: number;
  };
  searchParams: {
    page: number;
    limit: number;
  };
  onCandidateClick: (resumeId: number) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const CandidateList = ({
  loading,
  searchResults,
  searchParams,
  onCandidateClick,
  onPageChange,
}: CandidateListProps) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-900">Kết quả tìm thấy: 
          <span className="text-base font-semibold text-[#154C91]">
           {searchResults.totalItems} hồ sơ
        </span></h3>
      </div>

      <Spin spinning={loading}>
        {searchResults.items.length === 0 ? (
          <Empty
            description="Không tìm thấy ứng viên phù hợp"
            className="py-12"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="space-y-3">
              {searchResults.items.map((resume) => (
                <CandidateCard 
                  key={resume.id} 
                  resume={resume} 
                  onClick={onCandidateClick} 
                  size="large" 
                />
              ))}
            </div>

            {searchResults.totalPages > 1 && (
              <div className="flex justify-center mt-6 pt-6 border-t border-gray-200">
                <Pagination
                  current={searchParams.page}
                  pageSize={searchParams.limit}
                  total={searchResults.totalItems}
                  onChange={onPageChange}
                  showSizeChanger
                  showTotal={(total) => `Tổng ${total} ứng viên`}
                  pageSizeOptions={['10', '20', '30', '50']}
                />
              </div>
            )}
          </>
        )}
      </Spin>
    </div>
  );
};

export default CandidateList;

