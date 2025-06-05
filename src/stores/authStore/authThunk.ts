import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICurrentUser } from "../../types/auth/AuthType";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";

const getCurrentUser = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }): Promise<IApiResponse<ICurrentUser>> => { 
        try {
            const response: IApiResponse<ICurrentUser> = await http.get("/auth/get-me");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateAvatar = createAsyncThunk (
    "account/updateAvatar",
    async (file: FormData, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.post("/account/update-avatar",file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const authThunks = {
    getCurrentUser,
    updateAvatar,
}
export default authThunks;