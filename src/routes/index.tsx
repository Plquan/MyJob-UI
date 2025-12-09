import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import CompanyLoginPage from "../pages/auth/employer/LoginPage";
import CompanyRegisterPage from "../pages/auth/employer/RegisterPage";
import HomePage from "../pages/home";
import CompanyPage from "../pages/company";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import DefaultLayout from "../layouts/DefaultLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import OverviewDashboard from "../pages/candidate/overview";
import MyCompanyTab from "../pages/candidate/my-companies";
import EmployerDashboard from "../pages/employer/dashboard";
import CompanyDetail from "../pages/company-detail";
import JobDetail from "../pages/jobs/job-detail";
import ManageRolePage from "../pages/admin/manage-role";
import AdminLayout from "../layouts/AdminLayout";
import ManageUserPage from "../pages/admin/manage-user";
import RoleManagement from "../pages/admin/manage-package";
import OnelineResumePage from "../pages/candidate/manage-online-resume";
import CandidateProfilePage from "../pages/candidate/manage-cv";
import EmployerCompanyPage from "../pages/employer/company";
import EmployerLayout from "../layouts/EmployerLayout";
import ManageJobPostPage from "../pages/employer/job-post";
import ProductPage from "../pages/product";
import { EUserRole } from "../constant/role";
import JobPage from "../pages/jobs/list-job";
import ProtectRoute from "./protectRoute";
const AppRoutes = () => {
    return (
       <BrowserRouter>
        <Routes>
            <Route path={ROUTE_PATH.CANDIDATE_LOGIN} element={<CandidateLoginPage />} />
            <Route path={ROUTE_PATH.CANDIDATE_REGISTER} element={<CandidateRegisterPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_LOGIN} element={<CompanyLoginPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_REGISTER} element={<CompanyRegisterPage />} />

            <Route element={<ProtectRoute role={EUserRole.CANDIDATE}/>}>
            <Route element={<CandidateLayout/>}>
            <Route path={ROUTE_PATH.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
            <Route path={ROUTE_PATH.CANDIDATE_OVERVIEW} element={<OverviewDashboard />} />
            <Route path={ROUTE_PATH.CANDIDATE_MY_COMPANIES} element={<MyCompanyTab />} />
            <Route path={ROUTE_PATH.CANDIDATE_ONLINE_RESUME} element={<OnelineResumePage />} />
            </Route>
            </Route>
    
            <Route element={<DefaultLayout/>}>
            <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
            <Route path={ROUTE_PATH.JOBS} element={<JobPage />} />
            <Route path={ROUTE_PATH.COMPANIES} element={<CompanyPage />} />
            <Route path={ROUTE_PATH.COMPANY_DETAIL} element={<CompanyDetail />} />
            <Route path={ROUTE_PATH.JOB_DETAIL} element={<JobDetail />} />
            </Route>
            
            <Route element={<ProtectRoute role={EUserRole.EMPLOYER}/>}>
            <Route element={<EmployerLayout/>}>
            <Route path={ROUTE_PATH.EMPLOYER_DASHBOARD} element={<EmployerDashboard />} />
            <Route path={ROUTE_PATH.EMPLOYER_COMPANY} element={<EmployerCompanyPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_JOB_POST} element={<ManageJobPostPage />} />
            </Route>
            </Route>

            <Route element={<AdminLayout/>}>
            <Route path={ROUTE_PATH.ADMIN_MANAGE_ROLE} element={<ManageRolePage />} />
            <Route path={ROUTE_PATH.ADMIN_MANAGE_USER} element={<ManageUserPage />} />
            <Route path={ROUTE_PATH.ADMIN_MANAGE_PACKAGE} element={<RoleManagement />} />
            </Route>
            <Route path={ROUTE_PATH.PRODUCTS} element={<ProductPage/>} />

        </Routes>
       </BrowserRouter>
    )
}

export default AppRoutes;
