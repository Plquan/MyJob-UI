import { createSlice } from "@reduxjs/toolkit";
import authThunks from "./authThunk";
import type { ICurrentUser } from "../../types/auth/AuthType";  

interface AuthState {
    currentUser: ICurrentUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
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
        });
        builder.addCase(authThunks.getCurrentUser.rejected, (state, action) => {
            state.loading = false;
        });
    }
})

export const authActions = { 
    ...authSlice.actions,
    ...authThunks,
}

export default authSlice.reducer;
