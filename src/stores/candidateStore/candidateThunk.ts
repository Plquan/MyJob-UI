import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUserActivityStatistics } from "../../types/candidate/CandidateType";
import type { IJobPost } from "../../types/job-post/JobPostType";
import http from "../../ultils/axios/axiosCustom";

const getActivityStatistics = createAsyncThunk(
    "candidate/getActivityStatistics",
    async (_, { rejectWithValue }): Promise<IUserActivityStatistics> => {
        try {
            const response: IUserActivityStatistics = await http.get("/candidate/activity-statistics");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy thống kê hoạt động") as any;
        }
    }
);

const getRecommendedJobs = createAsyncThunk(
    "candidate/getRecommendedJobs",
    async (limit: number = 10, { rejectWithValue }): Promise<IJobPost[]> => {
        try {
            const response: IJobPost[] = await http.get(`/candidate/recommended-jobs?limit=${limit}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy danh sách việc làm gợi ý") as any;
        }
    }
);

const candidateThunks = {
    getActivityStatistics,
    getRecommendedJobs,
};

export default candidateThunks;

