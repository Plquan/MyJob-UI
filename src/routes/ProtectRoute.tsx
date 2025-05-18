import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";
import { getCookie } from "../ultils/cookies";
import ROUTE_PATH from "./routePath";

const ProtectRoute = (): JSX.Element => {
    const accessToken = getCookie('accessToken');
    if(!accessToken) {
        return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />
    }
  return <Outlet />;
};
export default ProtectRoute;