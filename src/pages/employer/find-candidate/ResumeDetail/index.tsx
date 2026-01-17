import { useParams, useLocation } from 'react-router-dom';
import ResumeDetailView from '../../../../components/employer/ResumeDetailView';
import ROUTE_PATH from '../../../../routes/routePath';

const ResumeDetail = () => {
    const { resumeId } = useParams<{ resumeId: string }>();
    const location = useLocation();
    const backPath = location.state?.from || ROUTE_PATH.EMPLOYER_FIND_CANDIDATE;

    return (
        <ResumeDetailView
            resumeId={resumeId}
            onBackPath={backPath}
            onFetchErrorPath={backPath}
        />
    );
};

export default ResumeDetail;
