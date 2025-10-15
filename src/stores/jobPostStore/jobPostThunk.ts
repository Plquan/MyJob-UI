import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICreateJobPostReq, IJobPostData, IGetJobPostsReqParams, IJobPostUpdate } from "../../types/job-post/JobPostType";
import http from "../../ultils/axios/axiosCustom";
import type { IPaginationResponse } from "../../types/AppType";

const createJobPost = createAsyncThunk (
    "jobPost/createJobPost",
    async (data: ICreateJobPostReq, {rejectWithValue}): Promise<IJobPostData> => {
        try {
            const response: IJobPostData = await http.post("/job-post",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getCompanyJobPosts = createAsyncThunk (
    "jobPost/getCompanyJobPosts",
    async (params: IGetJobPostsReqParams, {rejectWithValue}): Promise<IPaginationResponse<IJobPostData>> => {
        try {
            const response: IPaginationResponse<IJobPostData> = await http.get("/job-post/get-company-job-posts", {
                params: {
                    page: params.page,
                    limit: params.limit,
                    search: params.search,
                    jobPostStatus: params.jobPostStatus
                }
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateJobPost = createAsyncThunk (
    "jobPost/updateJobPost",
    async (data: IJobPostUpdate, {rejectWithValue}): Promise<IJobPostData> => {
        try {
            const response: IJobPostData = await http.put("/job-post",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)



const jobPostThunks = {
    createJobPost,
    getCompanyJobPosts,
    updateJobPost
}

export default  jobPostThunks
