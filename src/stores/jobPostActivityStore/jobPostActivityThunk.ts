import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IJobPostActivityDto, IGetJobPostActivityRequest, ISendEmailRequest } from "../../types/job-post-activity/JobPostActivity";
import http from "../../ultils/axios/axiosCustom";
import type { IPaginationResponse } from "../../types/AppType";

const getJobPostActivities = createAsyncThunk (
    "jobPostActivity/getJobPostActivities",
    async (params: IGetJobPostActivityRequest, {rejectWithValue}): Promise<IPaginationResponse<IJobPostActivityDto>> => {
        try {
            const response: IPaginationResponse<IJobPostActivityDto> = await http.get("/job-post-activity", {
                params
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteJobPostActivity = createAsyncThunk (
    "jobPostActivity/deleteJobPostActivity",
    async (jobPostActivityId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/job-post-activity/${jobPostActivityId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getJobPostActivityById = createAsyncThunk (
    "jobPostActivity/getJobPostActivityById",
    async (jobPostActivityId: number, {rejectWithValue}): Promise<IJobPostActivityDto> => {
        try {
            const response: IJobPostActivityDto = await http.get(`/job-post-activity/${jobPostActivityId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const sendEmailToCandidate = createAsyncThunk (
    "jobPostActivity/sendEmailToCandidate",
    async (params: ISendEmailRequest, {rejectWithValue}): Promise<boolean> => {
        try {
            const { jobPostActivityId, ...emailData } = params;
            const response: boolean = await http.post(`/job-post-activity/${jobPostActivityId}/send-email`, emailData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const jobPostActivityThunks = {
    getJobPostActivities,
    deleteJobPostActivity,
    getJobPostActivityById,
    sendEmailToCandidate
}

export default jobPostActivityThunks

