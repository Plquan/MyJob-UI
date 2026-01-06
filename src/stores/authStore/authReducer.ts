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
    isSubmitting: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    isSubmitting: false,
    error: null,
    hasCheckedAuth: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = undefined;
            state.isAuthenticated = false;
            state.loading = false;
            state.isSubmitting = false;
            state.error = null;
            state.hasCheckedAuth = true;
            localStorage.removeItem("accessToken")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authThunks.getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authThunks.getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
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
                state.currentUser.avatar = action.payload.url;
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
                state.currentUser.allowSearch = action.payload
            }
            state.isSubmitting = false
        })
        builder.addCase(authThunks.allowSearch.rejected, (state, action) => {
            state.isSubmitting = false
            state.error = action.error as string;
        });

        // login
        builder.addCase(authThunks.login.pending, (state) => {
            state.isSubmitting = true;
        });
        builder.addCase(authThunks.login.fulfilled, (state, action) => {
            localStorage.setItem("accessToken", action.payload);
            state.isSubmitting = false;
        });
        builder.addCase(authThunks.login.rejected, (state, action) => {
            state.isSubmitting = false;
            state.error = action.error as string;
        });

        //candidate register
        builder.addCase(authThunks.candidateRegister.pending, (state) => {
            state.isSubmitting = true;
        });
        builder.addCase(authThunks.candidateRegister.fulfilled, (state) => {
            state.isSubmitting = false;
        });
        builder.addCase(authThunks.candidateRegister.rejected, (state, action) => {
            state.isSubmitting = false;
            state.error = action.error as string;
        });

        //company register
        builder.addCase(authThunks.companyRegister.pending, (state) => {
            state.isSubmitting = true;
        });
        builder.addCase(authThunks.companyRegister.fulfilled, (state) => {
            state.isSubmitting = false;
        });
        builder.addCase(authThunks.companyRegister.rejected, (state, action) => {
            state.isSubmitting = false;
            state.error = action.error as string;
        });

        //logout
        builder.addCase(authThunks.logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authThunks.logout.fulfilled, (state) => {
            state.currentUser = undefined;
            state.isAuthenticated = false;
            state.loading = false;
            state.isSubmitting = false;
            state.error = null;
            state.hasCheckedAuth = true;
            localStorage.removeItem("accessToken");
        });
        builder.addCase(authThunks.logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });
    }
})

export const authActions = {
    ...authSlice.actions,
    ...authThunks,
}

export default authSlice.reducer;
