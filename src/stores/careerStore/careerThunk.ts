import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import type { ICareerData } from "../../types/career/CareerType";
import http from "../../ultils/axios/axiosCustom";

const getAllCareers = createAsyncThunk (
    "career/getAllCareers",
    async (_, {rejectWithValue}): Promise<IApiResponse<ICareerData[]>> => {
        try {
            const response: IApiResponse<ICareerData[]> = await http.get("/career/get-careers");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const careerThunks = {
    getAllCareers
}

export default careerThunks