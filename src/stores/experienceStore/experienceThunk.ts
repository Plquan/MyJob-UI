import { createAsyncThunk } from "@reduxjs/toolkit"
import type { IApiResponse } from "../../types/AppType"
import http from "../../ultils/axios/axiosCustom"
import type { IExperience } from "../../types/resume/ExperienceType";


const getAllExperiences = createAsyncThunk (
    "experience/getAllExperiences",
    async (_, {rejectWithValue}): Promise<IApiResponse<IExperience[]>> => {
        try {
            const response: IApiResponse<IExperience[]> = await http.get("/experience/get-experiences");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createExperience = createAsyncThunk (
    "experience/createExperience",
    async (data: IExperience, {rejectWithValue}): Promise<IApiResponse<IExperience>> => {
        try {
            const response: IApiResponse<IExperience> = await http.post("/experience/create-experience",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateExperience = createAsyncThunk (
    "experience/updateExperience",
    async (data: IExperience, {rejectWithValue}): Promise<IApiResponse<IExperience>> => {
        try {
            const response: IApiResponse<IExperience> = await http.put("/experience/update-experience",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteExperience = createAsyncThunk (
    "experience/deleteExperience",
    async (id: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.delete(`/experience/delete-experience/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const experienceThunks = {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience
}
export default experienceThunks