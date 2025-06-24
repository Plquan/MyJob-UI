import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { ICandidateData } from "../../types/resume/ResumeType";


const updateProfile = createAsyncThunk (
    "candidate/updateProfile",
    async (data: ICandidateData, {rejectWithValue}): Promise<IApiResponse<ICandidateData>> => {
        try {
            const response: IApiResponse<ICandidateData> = await http.put("/candidate/update-profile",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getProfile = createAsyncThunk (
    "candidate/getProfile",
    async (_, {rejectWithValue}): Promise<IApiResponse<ICandidateData>> => {
        try {
            const response: IApiResponse<ICandidateData> = await http.get("/candidate/get-profile");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const candidateThunks = {
    updateProfile,
    getProfile
}
export default candidateThunks;