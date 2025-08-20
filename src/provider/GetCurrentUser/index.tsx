import { authActions } from "../../stores/authStore/authReducer";
import React, { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../stores";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const hasCheckedAuth = useSelector((state: RootState) => state.authStore.hasCheckedAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(!hasCheckedAuth){
      dispatch<any>(authActions.getCurrentUser());
    }
      
    
  }, [dispatch]);
  if(!hasCheckedAuth){
    return null;
  }
  return children;
};

export default GetCurrentUserProvider;
