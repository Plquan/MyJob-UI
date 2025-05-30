import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { IUserData } from "../../types/user/UserType";

const getAllUsers = createAsyncThunk (
    "user/getAllUsers",
    async (_, {rejectWithValue}): Promise<IApiResponse<IUserData[]>> => {
        try {
            const response: IApiResponse<IUserData[]> = await http.get("/user/get-all-users");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const userThunks = {
    getAllUsers,
}
export default userThunks;