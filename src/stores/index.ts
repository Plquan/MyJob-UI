import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

import { provinceSlice } from "./provinceStore/provinceReducer";
import { authSlice } from "./authStore/authReducer";
import { roleSlice } from "./roleStore/roleReducer";
import { userSlice } from "./userStore/userReducer";
import { candidateSlice } from "./candidateStore/candidateReducer";
import { careerSlice } from "./careerStore/careerReducer";
import { resumeSlice } from "./resumeStore/resumeReducer";
import { certificateSlice } from "./certificateStore/certificateReducer";
import { experienceSlice } from "./experienceStore/experienceReducer";

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authStore"], //  Chỉ lưu userStore
};

// Gộp các reducer lại
const rootReducer = combineReducers({
  provinceStore: provinceSlice.reducer,
  authStore: authSlice.reducer,
  roleStore: roleSlice.reducer,
  userStore: userSlice.reducer,
  candidateStore: candidateSlice.reducer,
  careerStore: careerSlice.reducer,
  resumeStore: resumeSlice.reducer,
  certificateStore: certificateSlice.reducer,
  experienceStore: experienceSlice.reducer
});

// Tạo reducer có tích hợp persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor để bọc app
export const persistor = persistStore(store);

// Kiểu state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
