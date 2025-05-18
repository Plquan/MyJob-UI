import { useDispatch } from "react-redux";
import type { AppDispatch } from "./stores";
import { provinceActions } from "./stores/provinceStore/provinceReducer";
import { useEffect } from "react";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(provinceActions.getAllProvinces());
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
