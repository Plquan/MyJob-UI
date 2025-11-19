import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";
import ROUTE_PATH from "./routePath";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import { EUserRole } from "../constant/role";

interface ProtectRouteProps {
  role: EUserRole;
}

const ProtectRoute = ({ role }: ProtectRouteProps): JSX.Element | null => {
  const { isAuthenticated, hasCheckedAuth, currentUser } = useSelector((state: RootState) => state.authStore);

  if (hasCheckedAuth && !isAuthenticated) {
    if (role === EUserRole.CANDIDATE) {
      return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
    } else if (role === EUserRole.EMPLOYER) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    } else if (role === EUserRole.ADMIN) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    }
  }

  if (hasCheckedAuth && isAuthenticated && currentUser?.role !== role) {
    if (role === EUserRole.CANDIDATE) {
      return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
    } else if (role === EUserRole.EMPLOYER) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    } else if (role === EUserRole.ADMIN) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    }
  }
  return <Outlet />;
};

export default ProtectRoute;
