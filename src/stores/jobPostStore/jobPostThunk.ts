import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICreateJobPostReq, ICompanyJobPost, IGetJobPostsReqParams, IJobPostUpdate, IJobPost, IApplyJobRequest } from "../../types/job-post/JobPostType";
import http from "../../ultils/axios/axiosCustom";
import type { IPaginationResponse } from "../../types/AppType";

const createJobPost = createAsyncThunk (
    "jobPost/createJobPost",
    async (data: ICreateJobPostReq, {rejectWithValue}): Promise<ICompanyJobPost> => {
        try {
            const response: ICompanyJobPost = await http.post("/job-post",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getCompanyJobPosts = createAsyncThunk (
    "jobPost/getCompanyJobPosts",
    async (params: IGetJobPostsReqParams, {rejectWithValue}): Promise<IPaginationResponse<ICompanyJobPost>> => {
        try {
            const response: IPaginationResponse<ICompanyJobPost> = await http.get("/job-post/get-company-job-posts", {
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
    async (data: IJobPostUpdate, {rejectWithValue}): Promise<ICompanyJobPost> => {
        try {
            const response: ICompanyJobPost = await http.put("/job-post",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getJobPost = createAsyncThunk (
    "jobPost/getJobPost",
    async (params: { page?: number; limit?: number; jobName?: string } = {}, {rejectWithValue}): Promise<IPaginationResponse<IJobPost>> => {
        try {
            const response: IPaginationResponse<IJobPost> = await http.get("/job-post", {
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    jobName: params?.jobName || "",
                }
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const toggleSaveJobPost = createAsyncThunk (
    "jobPost/toggleSaveJobPost",
    async (jobPostId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.post(`/job-post/toggle-save-job-post/${jobPostId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getJobPostById = createAsyncThunk (
    "jobPost/getJobPostById",
    async (jobPostId: number, {rejectWithValue}): Promise<IJobPost> => {
        try {
            const response: IJobPost = await http.get(`/job-post/${jobPostId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const applyJob = createAsyncThunk (
    "jobPost/applyJob",
    async (request: IApplyJobRequest, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.post("/job-post-activity/apply-job",request);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getSavedJobPosts = createAsyncThunk (
    "jobPost/getSavedJobPosts",
    async (_, {rejectWithValue}): Promise<IJobPost[]> => {
        try {
            const response: IJobPost[] = await http.get("/job-post/saved-job-posts");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const jobPostThunks = {
    createJobPost,
    getCompanyJobPosts,
    updateJobPost,
    getJobPost,
    toggleSaveJobPost,
    getJobPostById,
    applyJob,
    getSavedJobPosts
}

export default  jobPostThunks
