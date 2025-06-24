import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IResume } from "../../types/resume/ResumeType";


const getOnlineResume = createAsyncThunk (
    "resume/getOnlineResume",
    async (_, {rejectWithValue}): Promise<IApiResponse<IResume>> => {
        try {
            const response: IApiResponse<IResume> = await http.get("/resume/get-online-resume");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateOnlineResume = createAsyncThunk (
    "resume/updateOnlineResume",
    async (data: IResume, {rejectWithValue}): Promise<IApiResponse<IResume>> => {
        try {
            const response: IApiResponse<IResume> = await http.put("/resume/update-online-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

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

const resumeThunks = {
    getOnlineResume,
    updateOnlineResume,
    uploadAttachedResume,
    getAllAttachedResumes,
    deleteAttachedResume,
    updateAttachedResume
}
export default resumeThunks;