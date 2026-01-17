import { useEffect, useState } from 'react';
import { Card, Spin, Empty, Pagination, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { savedResumeActions } from '../../../stores/savedResumeStore/savedResumeReducer';
import ROUTE_PATH from '../../../routes/routePath';
import CandidateCard from '../../../components/CandidateCard';
import { useDebounce } from '@/hooks/useDebounce';

const SavedResumePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { savedResumes, searchParams, loading } = useSelector((state: RootState) => state.savedResumeStore);

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        dispatch(savedResumeActions.setSearchParams({
            title: debouncedSearchTerm,
            candidateName: debouncedSearchTerm
        }));
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadSavedResumes();
    }, [searchParams.page, searchParams.limit, searchParams.title, searchParams.candidateName]);

    const loadSavedResumes = () => {
        dispatch(
            savedResumeActions.getSavedResumes({
                page: searchParams.page,
                limit: searchParams.limit,
                title: searchParams.title,
                candidateName: searchParams.candidateName,
            })
        );
    };

    const handlePageChange = (page: number, pageSize: number) => {
        dispatch(savedResumeActions.setPage(page));
        if (pageSize !== searchParams.limit) {
            dispatch(savedResumeActions.setLimit(pageSize));
        }
    };

    const handleCandidateClick = (resumeId: number) => {
        navigate(ROUTE_PATH.EMPLOYER_FIND_CANDIDATE_DETAIL.replace(':resumeId', resumeId.toString()), {
            state: { from: ROUTE_PATH.EMPLOYER_SAVED_RESUMES }
        });
    };

    return (
        <Card className="m-4" title="Hồ sơ đã lưu">
            {/* Search Input */}
            <div className="mb-4">
                <Input
                    placeholder="Tìm kiếm theo tên tên ứng viên..."
                    className='!w-1/3'
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                />
            </div>

            <Spin spinning={loading}>
                {savedResumes.items.length === 0 ? (
                    <Empty
                        description={searchTerm ? "Không tìm thấy hồ sơ phù hợp" : "Bạn chưa lưu hồ sơ nào"}
                        className="py-12"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    <>
                        <div className="space-y-3">
                            {savedResumes.items.map((resume) => (
                                <CandidateCard
                                    key={resume.id}
                                    resume={resume}
                                    onClick={handleCandidateClick}
                                    size="large"
                                />
                            ))}
                        </div>

                        {savedResumes.totalPages > 1 && (
                            <div className="flex justify-center mt-6 pt-6 border-t border-gray-200">
                                <Pagination
                                    current={searchParams.page}
                                    pageSize={searchParams.limit}
                                    total={savedResumes.totalItems}
                                    onChange={handlePageChange}
                                    showSizeChanger
                                    showTotal={(total) => `Tổng ${total} hồ sơ`}
                                    pageSizeOptions={['10', '20', '30', '50']}
                                />
                            </div>
                        )}
                    </>
                )}
            </Spin>
        </Card>
    );
};

export default SavedResumePage;
