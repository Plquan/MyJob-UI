import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";
import ROUTE_PATH from "./routePath";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import { EUserRole } from "../constant/role";

interface ProtectRouteProps {
  role?: EUserRole;
  roles?: EUserRole[]; // Cho phép nhiều roles
  requireAuth?: boolean; // Chỉ cần authenticated, không check role
}

const ProtectRoute = ({ role, roles, requireAuth }: ProtectRouteProps): JSX.Element | null => {
  const { isAuthenticated, hasCheckedAuth, currentUser } = useSelector((state: RootState) => state.authStore);

  // Nếu chỉ cần authenticated (không check role)
  if (requireAuth) {
    if (hasCheckedAuth && !isAuthenticated) {
      return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
    }
    return <Outlet />;
  }

  // Nếu có roles array, check xem user có trong danh sách không
  if (roles && roles.length > 0) {
    if (hasCheckedAuth && !isAuthenticated) {
      // Redirect to first role's login page
      const firstRole = roles[0];
      if (firstRole === EUserRole.CANDIDATE) {
        return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
      } else if (firstRole === EUserRole.EMPLOYER) {
        return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
      } else if (firstRole === EUserRole.ADMIN) {
        return <Navigate to={ROUTE_PATH.ADMIN_LOGIN} />;
      }
    }
    if (hasCheckedAuth && isAuthenticated && currentUser?.role && !roles.includes(currentUser.role)) {
      // Đã login nhưng sai role -> redirect về login tương ứng
      const firstRole = roles[0];
      if (firstRole === EUserRole.CANDIDATE) {
        return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
      } else if (firstRole === EUserRole.EMPLOYER) {
        return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
      } else if (firstRole === EUserRole.ADMIN) {
        return <Navigate to={ROUTE_PATH.ADMIN_LOGIN} />;
      }
    }
    return <Outlet />;
  }

  // Nếu có role đơn, check theo role
  if (role) {
    // Chưa login -> redirect đến login tương ứng
    if (hasCheckedAuth && !isAuthenticated) {
      if (role === EUserRole.CANDIDATE) {
        return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
      } else if (role === EUserRole.EMPLOYER) {
        return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
      } else if (role === EUserRole.ADMIN) {
        return <Navigate to={ROUTE_PATH.ADMIN_LOGIN} />;
      }
    }

    // Đã login nhưng sai role -> redirect về login tương ứng
    if (hasCheckedAuth && isAuthenticated && currentUser?.role !== role) {
      if (role === EUserRole.CANDIDATE) {
        return <Navigate to={ROUTE_PATH.CANDIDATE_LOGIN} />;
      } else if (role === EUserRole.EMPLOYER) {
        return <Navigate to={ROUTE_PATH.EMPLOYER_LOGIN} />;
      } else if (role === EUserRole.ADMIN) {
        return <Navigate to={ROUTE_PATH.ADMIN_LOGIN} />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectRoute;
