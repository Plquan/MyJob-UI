import { useDispatch } from "react-redux";
import type { AppDispatch } from "./stores";
import { provinceActions } from "./stores/provinceStore/provinceReducer";
import { useEffect } from "react";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';
import { careerActions } from "./stores/careerStore/careerReducer";
import { LanguageProvider } from "./provider/Languages";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(provinceActions.getAllProvinces());
    dispatch(careerActions.getAllCareers())

  }, [dispatch]);

  return (
    <LanguageProvider>
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: { fontSize: '13px' },
          duration: 1500,
        }}
      />
    </LanguageProvider>
  );
}
