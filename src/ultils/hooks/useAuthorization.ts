import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../stores";
import { EUserRole } from "../../constant/role";
import ROUTE_PATH from "../../routes/routePath";

export function useAuthorization(allowRoles: EUserRole[]) {
    const { currentUser } = useSelector((state: RootState) => state.authStore);
    const navigate = useNavigate();
  
    const isAuthenticated = !!currentUser;
    const isAllowed =
      isAuthenticated && allowRoles.includes(currentUser.role);
  
    const requireCandidate = (): boolean => {
      if (!isAuthenticated) {
        navigate(ROUTE_PATH.CANDIDATE_LOGIN);
        return false;
      }
      
      if (currentUser?.role === EUserRole.EMPLOYER) {
        navigate(ROUTE_PATH.CANDIDATE_LOGIN);
        return false;
      }
      
      return true;
    };
  
    return {
      isAuthenticated,
      isAllowed,
      role: currentUser?.role,
      requireCandidate,
    };
  }
  