import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { ICreateUser, IPagingResponse, IUpdateUser, IUserData, IUserFilter } from "../../types/user/UserType";

const getAllUsers = createAsyncThunk (
    "user/getAllUsers",
    async (data: IUserFilter, {rejectWithValue}): Promise<IApiResponse<IPagingResponse>> => {
        try {
            const response: IApiResponse<IPagingResponse> = await http.post("/user/get-all-users",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getUserById = createAsyncThunk (
    "user/getUserById",
    async (userId: number, {rejectWithValue}): Promise<IApiResponse<IUserData>> => {
        try {
            const response: IApiResponse<IUserData> = await http.get(`/user/get-user/${userId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateUser = createAsyncThunk (
    "user/updateUser",
    async (data: IUpdateUser, {rejectWithValue}): Promise<IApiResponse<IUserData>> => {
        try {
            const response: IApiResponse<IUserData> = await http.post("/user/update-user",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createUser = createAsyncThunk (
    "user/createUser",
    async (data: ICreateUser, {rejectWithValue}): Promise<IApiResponse<IUserData>> => {
        try {
            const response: IApiResponse<IUserData> = await http.post("/user/create-user",data);
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
    createUser
}
export default userThunks;