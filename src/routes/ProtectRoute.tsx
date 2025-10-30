import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";
import ROUTE_PATH from "./routePath";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import toast from "react-hot-toast";
import { EUserRole } from "../constant/role";

interface ProtectRouteProps {
  roleName: EUserRole;
}

const ProtectRoute = ({ roleName }: ProtectRouteProps): JSX.Element | null => {
  const {isAuthenticated, hasCheckedAuth, currentUser } = useSelector((state: RootState) => state.authStore);

  if (hasCheckedAuth && !isAuthenticated) {
    toast.error("Bạn chưa xác thực");
    return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
  }

  if (currentUser?.roleName !== roleName) {
    if (currentUser?.roleName === EUserRole.CANDIDATE) {
      return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
    } else if (currentUser?.roleName === EUserRole.EMPLOYER) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    } else if (currentUser?.roleName === EUserRole.ADMIN) {
      return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
    }
    return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectRoute;
