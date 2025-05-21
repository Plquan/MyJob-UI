import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import CompanyLoginPage from "../pages/auth/employer/LoginPage";
import CompanyRegisterPage from "../pages/auth/employer/RegisterPage";
import HomePage from "../pages/home/HomePage";
import JobsPage from "../pages/jobs/JobPage";
import CompanyPage from "../pages/companies";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import DefaultLayout from "../layouts/DefaultLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import ProtectRoute from "./ProtectRoute";
import OverviewDashboard from "../pages/candidate/overview";
import MyCompanyTab from "../pages/candidate/my-companies";
import CandidateProfilePage from "../pages/candidate/manage-profile";
import CompanyLayout from "../layouts/CompanyLayout";
import EmployerDashboard from "../pages/employer/dashboard";
import CompanyDetail from "../pages/companies/company-detail";
const AppRoutes = () => {
    return (
       <BrowserRouter>
        <Routes>
            <Route path={ROUTE_PATH.CANDIDATE_LOGIN} element={<CandidateLoginPage />} />
            <Route path={ROUTE_PATH.CANDIDATE_REGISTER} element={<CandidateRegisterPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_LOGIN} element={<CompanyLoginPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_REGISTER} element={<CompanyRegisterPage />} />


            <Route element={<ProtectRoute/>}>
            <Route element={<CandidateLayout/>}>
            <Route path={ROUTE_PATH.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
            <Route path={ROUTE_PATH.CANDIDATE_OVERVIEW} element={<OverviewDashboard />} />
            <Route path={ROUTE_PATH.CANDIDATE_MY_COMPANIES} element={<MyCompanyTab />} />
            </Route>
            </Route>
    
            <Route element={<DefaultLayout/>}>
            <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
            <Route path={ROUTE_PATH.JOBS} element={<JobsPage />} />
            <Route path={ROUTE_PATH.COMPANIES} element={<CompanyPage />} />
            <Route path={ROUTE_PATH.COMPANY_DETAIL} element={<CompanyDetail />} />
            </Route>

            <Route element={<CompanyLayout/>}>
            <Route path={ROUTE_PATH.EMPLOYER_DASHBOARD} element={<EmployerDashboard />} />
            </Route>

        </Routes>
       </BrowserRouter>
    )
}

export default AppRoutes;
