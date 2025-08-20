import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";
import ROUTE_PATH from "./routePath";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import toast from "react-hot-toast";
const ProtectRoute = (): JSX.Element | null=> {
  const {isAuthenticated, hasCheckedAuth,currentUser } = useSelector((state: RootState) => state.authStore);

  if (hasCheckedAuth && !isAuthenticated && currentUser?.roleName != "CANDIDATE") {
    toast.error("Bạn chưa xác thực");
    return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectRoute;
