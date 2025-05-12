import CandidateLoginPage from "../pages/auth/candidate/LoginPage";
import CandidateRegisterPage from "../pages/auth/candidate/RegisterPage";
import EmployerLoginPage from "../pages/auth/employer/LoginPage";
import EmployerRegisterPage from "../pages/auth/employer/RegisterPage";
import HomePage from "../pages/home/HomePage";

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
        </Routes>
       </BrowserRouter>
    )
}

export default AppRoutes;
