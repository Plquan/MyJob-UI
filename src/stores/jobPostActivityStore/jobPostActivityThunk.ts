import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IJobPostActivityDto, IGetJobPostActivityRequest } from "../../types/job-post-activity/JobPostActivity";
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


const jobPostActivityThunks = {
    getJobPostActivities,
    deleteJobPostActivity
}

export default jobPostActivityThunks

