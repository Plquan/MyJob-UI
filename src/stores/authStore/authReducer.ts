import { createSlice } from "@reduxjs/toolkit";
import authThunks from "./authThunk";
import type { ICurrentUser } from "../../types/auth/AuthType";  
import toast from "react-hot-toast";

interface AuthState {
    currentUser: ICurrentUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    hasCheckedAuth: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    hasCheckedAuth: false,
}

export const authSlice = createSlice({ 
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authThunks.getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authThunks.getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.data;
            state.isAuthenticated = true;
            state.loading = false;
            state.hasCheckedAuth = true;
        });
        builder.addCase(authThunks.getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.hasCheckedAuth = true;
            state.error = action.error as string;
        });
    }
})

export const authActions = { 
    ...authSlice.actions,
    ...authThunks,
}

export default authSlice.reducer;
