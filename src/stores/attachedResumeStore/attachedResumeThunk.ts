import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IResume, ISearchResumesParams } from "../../types/resume/ResumeType";
import type { IPaginationResponse } from "../../types/base/IPaginationResponse";


const updateAttachedResume = createAsyncThunk (
    "resume/updateAttachedResume",
    async (data: FormData, {rejectWithValue}): Promise<IResume> => {
        try {
            const response: IResume= await http.put("/resume/update-attached-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const uploadAttachedResume = createAsyncThunk (
    "resume/uploadAttachedResume",
    async (data: FormData, {rejectWithValue}): Promise<IResume> => {
        try {
            const response: IResume = await http.post("/resume/create-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getResumes = createAsyncThunk (
    "resume/getResumes",
    async (_, {rejectWithValue}): Promise<IResume[]> => {
        try {
            const response: IResume[] = await http.get("/resume/get-resumes");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const deleteAttachedResume = createAsyncThunk (
    "resume/deleteAttachedResume",
    async (attachedresumeId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/resume/delete-resume/${attachedresumeId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const setSelectedResume = createAsyncThunk (
    "resume/setSelectedResume",
    async (resumeId: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.put(`/resume/set-selected-resume/${resumeId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const searchResumes = createAsyncThunk(
    "resume/searchResumes",
    async (params: ISearchResumesParams, { rejectWithValue }) => {
        try {
            const response: IPaginationResponse<IResume> = await http.get("/resume/search-resumes", { params });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

const attachedResumeThunks = {
    uploadAttachedResume,
    getResumes,
    deleteAttachedResume,
    updateAttachedResume,
    setSelectedResume,
    searchResumes
}
export default attachedResumeThunks