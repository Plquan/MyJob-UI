import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import CompanyLoginPage from "../pages/auth/company/LoginPage";
import CompanyRegisterPage from "../pages/auth/company/RegisterPage";
import HomePage from "../pages/home/HomePage";
import JobsPage from "../pages/jobs/JobPage";
import CompanyPage from "../pages/company/CompanyPage";
import CandidateProfilePage from "../pages/candidate-profile/CandidateProfilePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import DefaultLayout from "../layouts/DefaultLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import ProtectRoute from "./ProtectedRoute";
import OverviewDashboard from "../pages/candidate-profile/overview";

const AppRoutes = () => {
    return (
       <BrowserRouter>
        <Routes>
            <Route path={ROUTE_PATH.CANDIDATE_LOGIN} element={<CandidateLoginPage />} />
            <Route path={ROUTE_PATH.CANDIDATE_REGISTER} element={<CandidateRegisterPage />} />
            <Route path={ROUTE_PATH.COMPANY_LOGIN} element={<CompanyLoginPage />} />
            <Route path={ROUTE_PATH.COMPANY_REGISTER} element={<CompanyRegisterPage />} />


            <Route element={<ProtectRoute/>}>
            <Route element={<CandidateLayout/>}>
            <Route path={ROUTE_PATH.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
            <Route path={ROUTE_PATH.CANDIDATE_OVERVIEW} element={<OverviewDashboard />} />
            </Route>
            </Route>
    
            <Route element={<DefaultLayout/>}>
            <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
            <Route path={ROUTE_PATH.JOBS} element={<JobsPage />} />
            <Route path={ROUTE_PATH.COMPANIES} element={<CompanyPage />} />
            </Route>


        </Routes>
       </BrowserRouter>
    )
}

export default AppRoutes;
