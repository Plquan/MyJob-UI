import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserData } from "../../types/user/UserType";
import userThunks from "./userThunk";

interface UserState {
    users:IUserData[],
    selectedUser?: IUserData;
    loading: boolean,
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error:null
}

export const userSlice = createSlice({ 
    name: "user",
    initialState,
    reducers: {
    setSelectedUser: (state, action: PayloadAction<IUserData | undefined>) => {
        state.selectedUser = action.payload;
    },
    },
    extraReducers: (builder) => {
        // get list
        builder.addCase(userThunks.getAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userThunks.getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.data;
            state.loading = false;
        });
        builder.addCase(userThunks.getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });


    }
})

export const userActions = {
    ...userSlice.actions,
    ...userThunks,
}

export default userSlice.reducer;