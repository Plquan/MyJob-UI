import { authActions } from "../../stores/authStore/authReducer";
import React, { type JSX } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../../ultils/cookies";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  React.useEffect(() => {
    if(!accessToken) return
    dispatch<any>(authActions.getCurrentUser());
  }, [accessToken,dispatch]);
  return children;
};

export default GetCurrentUserProvider;
