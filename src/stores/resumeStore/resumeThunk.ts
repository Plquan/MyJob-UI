import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IResumeData } from "../../types/resume/ResumeType";


const getOnlineResume = createAsyncThunk (
    "resume/getOnlineResume",
    async (_, {rejectWithValue}): Promise<IApiResponse<IResumeData>> => {
        try {
            const response: IApiResponse<IResumeData> = await http.get("/resume/get-online-resume");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateOnlineResume = createAsyncThunk (
    "resume/updateOnlineResume",
    async (data: IResumeData, {rejectWithValue}): Promise<IApiResponse<IResumeData>> => {
        try {
            const response: IApiResponse<IResumeData> = await http.put("/resume/update-online-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const resumeThunks = {
    getOnlineResume,
    updateOnlineResume
}
export default resumeThunks;