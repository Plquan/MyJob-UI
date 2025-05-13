import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import EmployerLoginPage from "../pages/auth/employer/LoginPage";
import EmployerRegisterPage from "../pages/auth/employer/RegisterPage";
import HomePage from "../pages/home/HomePage";
import JobsPage from "../pages/jobs/JobPage";
import CompanyPage from "../pages/company/CompanyPage";
import CandidateProfilePage from "../pages/candidate-profile/CandidateProfilePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTE_PATH from "./routePath";

const AppRoutes = () => {
    return (
       <BrowserRouter>
        <Routes>
            <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
            <Route path={ROUTE_PATH.CANDIDATE_LOGIN} element={<CandidateLoginPage />} />
            <Route path={ROUTE_PATH.CANDIDATE_REGISTER} element={<CandidateRegisterPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_LOGIN} element={<EmployerLoginPage />} />
            <Route path={ROUTE_PATH.EMPLOYER_REGISTER} element={<EmployerRegisterPage />} />
            <Route path={ROUTE_PATH.JOBS} element={<JobsPage />} />
            <Route path={ROUTE_PATH.COMPANIES} element={<CompanyPage />} />
            <Route path={ROUTE_PATH.CANDIDATE_PROFILE} element={<CandidateProfilePage />} />
        </Routes>
       </BrowserRouter>
    )
}

export default AppRoutes;
