import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserData } from "../../types/user/UserType";
import userThunks from "./userThunk";
import toast from "react-hot-toast";

interface UserState {
    users:IUserData[],
    selectedUser?: IUserData;
    loading: boolean,
    error: string | null;

    page?: number;
    limit?: number;
    search?: string;
    totalItem?: number;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error:null,
    
    page:1,
    limit:10,
    totalItem:0

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
            state.users = action.payload.data.users;
            state.limit = action.payload.data.limit
            state.page = action.payload.data.page
            state.totalItem = action.payload.data.totalItem
            state.loading = false;
        });
        builder.addCase(userThunks.getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });

        //update user
        builder.addCase(userThunks.updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userThunks.updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload.data;
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
            if (state.selectedUser?.id === updatedUser.id) {
                state.selectedUser = updatedUser;
            }
            state.loading = false;
            toast.success(action.payload.message??"Cập nhật người dùng thành công")
        });
        builder.addCase(userThunks.updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });

        // create user
        builder.addCase(userThunks.createUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userThunks.createUser.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message??"Thêm người dùng thành công")
        });
        builder.addCase(userThunks.createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
            toast.error((action.payload as any)?.message || "Đã xảy ra lỗi");
        });


    }
})

export const userActions = {
    ...userSlice.actions,
    ...userThunks,
}

export default userSlice.reducer;