import { configureStore } from "@reduxjs/toolkit";
import { provinceSlice } from "./provinceStore/provinceReducer";
import { authSlice } from "./authStore/authReducer";
import roleReducer from "./roleStore/roleReducer";

export const store = configureStore({
    reducer: {
        provinceStore: provinceSlice.reducer,
        authStore: authSlice.reducer,
        roleStore: roleReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

