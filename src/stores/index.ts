import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./roleStore/roleReducer";
import { userSlice } from "./userStore/userReducer";
import { careerSlice } from "./careerStore/careerReducer";
import { packageSlice } from "./packageStore/packageReducer";
import { provinceSlice } from "./provinceStore/provinceReducer";
import { authSlice } from "./authStore/authReducer";
import { onlineResumeSlice } from "./onlineResumeStore/onlineResumeReducer";
import { attachedResumeSlice } from "./attachedResumeStore/attachedResumeReducer";
import { companySlice } from "./companyStore/companyReducer";
import { jobPostSlice } from "./jobPostStore/jobPostReducer";

export const store = configureStore({
  reducer: {
    provinceStore: provinceSlice.reducer,
    authStore: authSlice.reducer,
    roleStore: roleSlice.reducer,
    userStore: userSlice.reducer,
    careerStore: careerSlice.reducer,
    onlineResumeStore: onlineResumeSlice.reducer,
    packageStore: packageSlice.reducer,
    attachedResumeStore: attachedResumeSlice.reducer,
    companyStore: companySlice.reducer,
    jobPostStore: jobPostSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
