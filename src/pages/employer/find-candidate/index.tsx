import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { attachedResumeActions } from '../../../stores/attachedResumeStore/attachedResumeReducer';
import ROUTE_PATH from '../../../routes/routePath';
import SearchHeader from './components/SearchHeader';
import AdvancedFilters from './components/AdvancedFilters';
import CandidateList from './components/CandidateList';

const FindCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, searchParams, loading } = useSelector((state: RootState) => state.attachedResumeStore);
  const { provinces } = useSelector((state: RootState) => state.provinceStore);
  const { careers } = useSelector((state: RootState) => state.careerStore);

  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    title: '',
    provinceId: undefined as number | undefined,
    careerId: undefined as number | undefined,
    position: undefined as number | undefined,
    typeOfWorkPlace: undefined as number | undefined,
    experience: undefined as number | undefined,
    academicLevel: undefined as number | undefined,
    jobType: undefined as number | undefined,
  });

  useEffect(() => {
    // Only trigger search on pagination change if user has already performed a search
    if (hasSearched) {
      handleSearch();
    }
  }, [searchParams.page, searchParams.limit]);

  const handleSearch = () => {
    dispatch(
      attachedResumeActions.searchResumes({
        ...searchParams,
        ...filters,
        page: searchParams.page,
        limit: searchParams.limit,
      })
    );
    setHasSearched(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    dispatch(attachedResumeActions.setSearchParams(filters));
    handleSearch();
  };

  const handleResetFilters = () => {
    setFilters({
      title: '',
      provinceId: undefined,
      careerId: undefined,
      position: undefined,
      typeOfWorkPlace: undefined,
      experience: undefined,
      academicLevel: undefined,
      jobType: undefined,
    });
    dispatch(attachedResumeActions.resetSearchParams());
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(attachedResumeActions.setSearchParams({ page, limit: pageSize }));
  };

  const handleCandidateClick = (resumeId: number) => {
    navigate(ROUTE_PATH.EMPLOYER_FIND_CANDIDATE_DETAIL.replace(':resumeId', resumeId.toString()));
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <Card className="m-4" title={"Tìm kiếm ứng viên"}>
      {/* Search Header */}
      <SearchHeader
        filters={{ title: filters.title, provinceId: filters.provinceId }}
        provinces={provinces}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Advanced Filters */}
        <AdvancedFilters
          filters={{
            careerId: filters.careerId,
            position: filters.position,
            typeOfWorkPlace: filters.typeOfWorkPlace,
            experience: filters.experience,
            academicLevel: filters.academicLevel,
            jobType: filters.jobType,
          }}
          careers={careers}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {/* Candidate List */}
        <CandidateList
          loading={loading}
          searchResults={searchResults}
          searchParams={searchParams}
          onCandidateClick={handleCandidateClick}
          onPageChange={handlePageChange}
        />
      </div>
    </Card>
  );
};

export default FindCandidate;

