import { Tabs, Spin, Empty } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { companyActions } from '../../../stores/companyStore/companyReducer';
import { jobPostActions } from '../../../stores/jobPostStore/jobPostReducer';
import CompanyItem from '../../../components/CompanyItem';
import JobCard from '../../../components/JobCard';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../routes/routePath';
import type { TabsProps } from 'antd';

const MySaved = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { savedCompanies, loading: companyLoading } = useSelector((state: RootState) => state.companyStore);
  const { savedJobPosts, loading: jobPostLoading } = useSelector((state: RootState) => state.jobPostStore);

  useEffect(() => {
    dispatch(companyActions.getSavedCompanies());
    dispatch(jobPostActions.getSavedJobPosts());
  }, [dispatch]);

  const handleJobClick = (jobPostId: number) => {
    navigate(ROUTE_PATH.JOB_DETAIL.replace(':jobPostId', jobPostId.toString()));
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Công ty đã lưu',
      children: (
        <Spin spinning={companyLoading}>
          {savedCompanies.length === 0 ? (
            <Empty 
              description="Chưa có công ty nào được lưu" 
              className="py-8"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCompanies.map((company) => (
                <CompanyItem key={company.company.id} company={company} />
              ))}
            </div>
          )}
        </Spin>
      ),
    },
    {
      key: '2',
      label: 'Việc làm đã lưu',
      children: (
        <Spin spinning={jobPostLoading}>
          {savedJobPosts.length === 0 ? (
            <Empty 
              description="Chưa có việc làm nào được lưu" 
              className="py-8"
            />
          ) : (
            <div className="space-y-3">
              {savedJobPosts.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onClick={handleJobClick}
                  size="large"
                />
              ))}
            </div>
          )}
        </Spin>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default MySaved;
