import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IResume } from "../../types/resume/ResumeType";


const updateAttachedResume = createAsyncThunk (
    "resume/updateAttachedResume",
    async (data: FormData, {rejectWithValue}): Promise<IApiResponse<IResume>> => {
        try {
            const response: IApiResponse<IResume> = await http.put("/resume/update-attached-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const uploadAttachedResume = createAsyncThunk (
    "resume/uploadAttachedResume",
    async (data: FormData, {rejectWithValue}): Promise<IApiResponse<IResume>> => {
        try {
            const response: IApiResponse<IResume> = await http.post("/resume/upload-attached-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getAllAttachedResumes = createAsyncThunk (
    "resume/getAllAttachedResumes",
    async (_, {rejectWithValue}): Promise<IApiResponse<IResume[]>> => {
        try {
            const response: IApiResponse<IResume[]> = await http.get("/resume/get-attached-resumes");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const deleteAttachedResume = createAsyncThunk (
    "resume/deleteAttachedResume",
    async (attachedresumeId: number, {rejectWithValue}): Promise<IApiResponse<IResume[]>> => {
        try {
            const response: IApiResponse<IResume[]> = await http.delete(`/resume/delete-attached-resume/${attachedresumeId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const attachedResumeThunks = {
    uploadAttachedResume,
    getAllAttachedResumes,
    deleteAttachedResume,
    updateAttachedResume
}
export default attachedResumeThunks