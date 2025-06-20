import { createAsyncThunk } from "@reduxjs/toolkit"
import type { IApiResponse } from "../../types/AppType"
import http from "../../ultils/axios/axiosCustom"
import type { IEducationData } from "../../types/resume/EducationType"


const getAllEducations = createAsyncThunk (
    "education/getAllEducations",
    async (_, {rejectWithValue}): Promise<IApiResponse<IEducationData[]>> => {
        try {
            const response: IApiResponse<IEducationData[]> = await http.get("/education/get-educations");
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createEducation = createAsyncThunk (
    "education/createEducation",
    async (data: IEducationData, {rejectWithValue}): Promise<IApiResponse<IEducationData>> => {
        try {
            const response: IApiResponse<IEducationData> = await http.post("/education/create-education",data);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateEducation = createAsyncThunk (
    "education/updateEducation",
    async (data: IEducationData, {rejectWithValue}): Promise<IApiResponse<IEducationData>> => {
        try {
            const response: IApiResponse<IEducationData> = await http.put("/education/update-education",data);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteEducation = createAsyncThunk (
    "education/deleteEducation",
    async (id: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.delete(`/education/delete-education/${id}`);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const educationThunks = {
    getAllEducations,
    createEducation,
    updateEducation,
    deleteEducation
}
export default educationThunks