import { Outlet } from "react-router-dom";
import type { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../stores";
import { authActions } from "../stores/authStore/authReducer";

const ProtectRoute = (): JSX.Element => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authStore.isAuthenticated);

  if (!isAuthenticated) {
    dispatch<any>(authActions.getCurrentUser());
  }
  return <Outlet />;
};
export default ProtectRoute;