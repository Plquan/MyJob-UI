import { createSlice } from "@reduxjs/toolkit";
import authThunks from "./authThunk";
import type { ICurrentUser } from "../../types/auth/AuthType";  
import toast from "react-hot-toast";

interface AuthState {
    currentUser?: ICurrentUser
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    hasCheckedAuth: boolean
    isSubmitting:boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    isSubmitting:false,
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
        //update avatar
        builder.addCase(authThunks.updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authThunks.updateAvatar.fulfilled, (state, action) => {
            if (state.currentUser) {
                state.currentUser.avatar = action.payload.data;
            }
            state.loading = false;
            toast.success("Cập nhật ảnh đại diện thành công")

        });
        builder.addCase(authThunks.updateAvatar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });

        //allow search
        builder.addCase(authThunks.allowSearch.pending, (state) => {
            state.isSubmitting = true
        });
        builder.addCase(authThunks.allowSearch.fulfilled, (state, action) => {
            if (state.currentUser) {
                state.currentUser.allowSearch = action.payload.data
            }
            state.isSubmitting = false
        })
        builder.addCase(authThunks.allowSearch.rejected, (state, action) => {
            state.isSubmitting = false
            state.error = action.error as string;
        });
    }
})

export const authActions = { 
    ...authSlice.actions,
    ...authThunks,
}

export default authSlice.reducer;
