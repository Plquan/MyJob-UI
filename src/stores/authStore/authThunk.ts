import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICurrentUser, ILoginRequestData, ICandidateRegisterRequestData, ICompanyRegisterRequestData } from "../../types/auth/AuthType";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";

const getCurrentUser = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }): Promise<ICurrentUser> => { 
        try {
            const response: ICurrentUser = await http.get("/auth/get-me");
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

const allowSearch = createAsyncThunk (
    "candidate/allowSearch",
    async (status: boolean, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.put("/candidate/allow-search",{ status });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const login = createAsyncThunk(
    "auth/login",
    async (data: ILoginRequestData, { rejectWithValue }): Promise<string> => {
        try {
            const response: string = await http.post("/auth/login", data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const candidateRegister = createAsyncThunk(
    "auth/candidateRegister",
    async (data: ICandidateRegisterRequestData, { rejectWithValue }): Promise<boolean> => {
        try {
            const response: boolean = await http.post("/auth/register/candidate", data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const companyRegister = createAsyncThunk(
    "auth/companyRegister",
    async (data: ICompanyRegisterRequestData, { rejectWithValue }): Promise<string> => {
        try {
            const response: string = await http.post("/auth/register/employer", data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }): Promise<boolean> => {
        try {
            const response: boolean = await http.post("/auth/logout");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const authThunks = {
    getCurrentUser,
    updateAvatar,
    allowSearch,
    login,
    candidateRegister,
    companyRegister,
    logout
}
export default authThunks;