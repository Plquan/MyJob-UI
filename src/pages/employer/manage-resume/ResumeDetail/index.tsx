import { useParams } from 'react-router-dom';
import ResumeDetailView from '../../../../components/employer/ResumeDetailView';
import ROUTE_PATH from '../../../../routes/routePath';

const ResumeDetail = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  return (
    <ResumeDetailView
      jobPostActivityId={resumeId || ''}
      onBackPath={ROUTE_PATH.EMPLOYER_MANAGE_RESUME}
      onFetchErrorPath={ROUTE_PATH.EMPLOYER_MANAGE_RESUME}
    />
  );
};

export default ResumeDetail;