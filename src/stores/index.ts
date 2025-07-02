import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./roleStore/roleReducer";
import { skillSlice } from "./skillStore/skillReducer";
import { userSlice } from "./userStore/userReducer";
import { candidateSlice } from "./candidateStore/candidateReducer";
import { careerSlice } from "./careerStore/careerReducer";
import { certificateSlice } from "./certificateStore/certificateReducer";
import { educationSlice } from "./educationStore/educationReducer";
import { experienceSlice } from "./experienceStore/experienceReducer";
import { languageSlice } from "./languageStore/languageReducer";
import { packageSlice } from "./packageStore/packageReducer";
import { provinceSlice } from "./provinceStore/provinceReducer";
import { authSlice } from "./authStore/authReducer";
import { onlineResumeSlice } from "./resumeStore/resumeReducer";

export const store = configureStore({
  reducer: {
    provinceStore: provinceSlice.reducer,
    authStore: authSlice.reducer,
    roleStore: roleSlice.reducer,
    userStore: userSlice.reducer,
    candidateStore: candidateSlice.reducer,
    careerStore: careerSlice.reducer,
    onlineResumeStore: onlineResumeSlice.reducer,
    certificateStore: certificateSlice.reducer,
    experienceStore: experienceSlice.reducer,
    educationStore: educationSlice.reducer,
    languageStore: languageSlice.reducer,
    skillStore: skillSlice.reducer,
    packageStore: packageSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
