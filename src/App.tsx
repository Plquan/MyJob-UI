import { useDispatch } from "react-redux";
import type { AppDispatch } from "./stores";
import { provinceActions } from "./stores/provinceStore/provinceReducer";
import { useEffect } from "react";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';
import { getCookie } from "./ultils/cookies";
import { authActions } from "./stores/authStore/authReducer";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(provinceActions.getAllProvinces());

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(authActions.getCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: { fontSize: '13px' },
          duration: 1500,
        }}
      />
    </>
  );
}
