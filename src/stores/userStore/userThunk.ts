import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { ICreateUser, IPagingResponse, IUpdateUser, IUserData, IUserFilter } from "../../types/user/UserType";

const getAllUsers = createAsyncThunk (
    "user/getAllUsers",
    async (data: IUserFilter | undefined, {rejectWithValue}): Promise<IPagingResponse> => {
        try {
            const response: IPagingResponse = await http.post("/user/get-all-users",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getUserById = createAsyncThunk (
    "user/getUserById",
    async (userId: number, {rejectWithValue}): Promise<IUserData> => {
        try {
            const response: IUserData = await http.get(`/user/get-user/${userId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateUser = createAsyncThunk (
    "user/updateUser",
    async (data: IUpdateUser, {rejectWithValue}): Promise<IUserData> => {
        try {
            const response: IUserData = await http.put("/user/update-user",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createUser = createAsyncThunk (
    "user/createUser",
    async (data: ICreateUser, {rejectWithValue}): Promise<IUserData> => {
        try {
            const response: IUserData = await http.post("/user/create-user",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/user/delete-user/${userId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const userThunks = {
    getAllUsers,
    updateUser,
    getUserById,
    createUser,
    deleteUser
}
export default userThunks;