import { authActions } from "../../stores/authStore/authReducer";
import React, { type JSX } from "react";
import { useDispatch } from "react-redux";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch<any>(authActions.getCurrentUser());
  }, [dispatch]);
  return children;
};

export default GetCurrentUserProvider;
