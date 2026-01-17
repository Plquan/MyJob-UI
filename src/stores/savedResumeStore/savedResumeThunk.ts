import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IResume } from "../../types/resume/ResumeType";
import type { IPaginationResponse } from "../../types/base/IPaginationResponse";

interface GetSavedResumesParams {
    page: number;
    limit: number;
    title?: string;
    candidateName?: string;
}

const getSavedResumes = createAsyncThunk(
    "savedResume/getSavedResumes",
    async (params: GetSavedResumesParams, { rejectWithValue }) => {
        try {
            const response: IPaginationResponse<IResume> = await http.get("/resume/saved-resumes", { params });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

const toggleSaveResume = createAsyncThunk(
    "savedResume/toggleSaveResume",
    async (resumeId: number, { rejectWithValue }) => {
        try {
            const response: boolean = await http.post(`/resume/toggle-save-resume/${resumeId}`);
            return {
                resumeId,
                isSaved: response
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

const savedResumeThunks = {
    getSavedResumes,
    toggleSaveResume
};

export default savedResumeThunks;
