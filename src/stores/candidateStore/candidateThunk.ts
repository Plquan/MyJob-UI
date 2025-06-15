import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { ICandidateData, IResumeData, IResumeResponseData } from "../../types/candidate/ResumeType";


const getCandidateOnlineResume = createAsyncThunk (
    "candidate/getCandidateOnlineResume",
    async (_, {rejectWithValue}): Promise<IApiResponse<IResumeResponseData>> => {
        try {
            const response: IApiResponse<IResumeResponseData> = await http.get("/candidate/get-candidate-online-resume");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

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

const updateOnlineResume = createAsyncThunk (
    "candidate/updateOnlineResume",
    async (data: IResumeData, {rejectWithValue}): Promise<IApiResponse<IResumeData>> => {
        try {
            const response: IApiResponse<IResumeData> = await http.put("/candidate/update-online-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const candidateThunks = {
    getCandidateOnlineResume,
    updateProfile,
    updateOnlineResume
}
export default candidateThunks;