import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import CompanyLoginPage from "../pages/auth/employer/LoginPage";
import CompanyRegisterPage from "../pages/auth/employer/RegisterPage";
import HomePage from "../pages/home";
import CompanyPage from "../pages/company";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import DefaultLayout from "../layouts/DefaultLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import OverviewDashboard from "../pages/candidate/overview";
import MyCompanyTab from "../pages/candidate/my-saved";
import EmployerDashboard from "../pages/employer/dashboard";
import CompanyDetail from "../pages/company-detail";
import JobDetail from "../pages/jobs/job-detail";
import ManageRolePage from "../pages/admin/manage-role";
import AdminLayout from "../layouts/AdminLayout";
import ManageUserPage from "../pages/admin/manage-user";
import OnelineResumePage from "../pages/candidate/manage-online-resume";
import CandidateProfilePage from "../pages/candidate/manage-cv";
import EmployerCompanyPage from "../pages/employer/company";
import EmployerLayout from "../layouts/EmployerLayout";
import ManageJobPostPage from "../pages/employer/job-post";
import ProductPage from "../pages/product";
import { EUserRole } from "../constant/role";
import JobPage from "../pages/jobs/list-job";
import ProtectRoute from "./protectRoute";
import ManageResumePage from "../pages/employer/manage-resume/ListResume";
import ResumeDetailPage from "../pages/employer/manage-resume/ResumeDetail";
import ChatPage from "../pages/chat";
import FindCandidatePage from "../pages/employer/find-candidate";
import FindCandidateResumeDetailPage from "../pages/employer/find-candidate/ResumeDetail";
import ManagePackagePage from "../pages/employer/manage-package";
import GuidePage from "../pages/guide";
import PaymentRedirect from "../components/PaymentRedirect";
import PackageManagement from "../pages/admin/manage-package";
import AdminJobPostManagement from "../pages/admin/manage-job-post";
import SavedResumePage from "../pages/employer/saved-resume";
import AdminLoginPage from "../pages/auth/admin/LoginPage";
import ManageProvincePage from "../pages/admin/manage-province";
import ManageCareerPage from "../pages/admin/manage-career";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_PATH.CANDIDATE_LOGIN} element={<CandidateLoginPage />} />
                <Route path={ROUTE_PATH.CANDIDATE_REGISTER} element={<CandidateRegisterPage />} />
                <Route path={ROUTE_PATH.EMPLOYER_LOGIN} element={<CompanyLoginPage />} />
                <Route path={ROUTE_PATH.EMPLOYER_REGISTER} element={<CompanyRegisterPage />} />
                <Route path={ROUTE_PATH.ADMIN_LOGIN} element={<AdminLoginPage />} />

                <Route element={<ProtectRoute role={EUserRole.CANDIDATE} />}>
                    <Route element={<CandidateLayout />}>
                        <Route path={ROUTE_PATH.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
                        <Route path={ROUTE_PATH.CANDIDATE_OVERVIEW} element={<OverviewDashboard />} />
                        <Route path={ROUTE_PATH.CANDIDATE_MY_COMPANIES} element={<MyCompanyTab />} />
                        <Route path={ROUTE_PATH.CANDIDATE_ONLINE_RESUME} element={<OnelineResumePage />} />
                    </Route>
                </Route>

                <Route element={<DefaultLayout />}>
                    <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
                    <Route path={ROUTE_PATH.JOBS} element={<JobPage />} />
                    <Route path={ROUTE_PATH.COMPANIES} element={<CompanyPage />} />
                    <Route path={ROUTE_PATH.GUIDE} element={<GuidePage />} />
                    <Route path={ROUTE_PATH.COMPANY_DETAIL} element={<CompanyDetail />} />
                    <Route path={ROUTE_PATH.JOB_DETAIL} element={<JobDetail />} />
                </Route>

                <Route element={<ProtectRoute role={EUserRole.EMPLOYER} />}>
                    <Route element={<EmployerLayout />}>
                        <Route path={ROUTE_PATH.EMPLOYER_DASHBOARD} element={<EmployerDashboard />} />
                        <Route path={ROUTE_PATH.EMPLOYER_COMPANY} element={<EmployerCompanyPage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_JOB_POST} element={<ManageJobPostPage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_MANAGE_RESUME} element={<ManageResumePage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_RESUME_DETAIL} element={<ResumeDetailPage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_FIND_CANDIDATE} element={<FindCandidatePage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_FIND_CANDIDATE_DETAIL} element={<FindCandidateResumeDetailPage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_SAVED_RESUMES} element={<SavedResumePage />} />
                        <Route path={ROUTE_PATH.EMPLOYER_MANAGE_PACKAGE} element={<ManagePackagePage />} />
                    </Route>
                </Route>

                {/* Chat route - cho phép cả Candidate và Employer */}

                <Route path={ROUTE_PATH.CHAT} element={<ChatPage />} />


                <Route element={<ProtectRoute role={EUserRole.ADMIN} />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ROUTE_PATH.ADMIN_DASHBOARD} element={<Navigate to={ROUTE_PATH.ADMIN_MANAGE_ROLE} replace />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_ROLE} element={<ManageRolePage />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_USER} element={<ManageUserPage />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_PACKAGE} element={<PackageManagement />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_JOB_POST} element={<AdminJobPostManagement />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_PROVINCE} element={<ManageProvincePage />} />
                        <Route path={ROUTE_PATH.ADMIN_MANAGE_CAREER} element={<ManageCareerPage />} />
                    </Route>
                </Route>
                <Route path={ROUTE_PATH.PRODUCTS} element={<ProductPage />} />
                <Route path={ROUTE_PATH.PAYMENT_SUCCESS} element={<PaymentRedirect />} />
                <Route path={ROUTE_PATH.PAYMENT_CANCEL} element={<PaymentRedirect />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
