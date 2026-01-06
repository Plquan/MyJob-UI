import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICareerData } from "../../types/career/CareerType";
import http from "../../ultils/axios/axiosCustom";

const getAllCareers = createAsyncThunk (
    "career/getAllCareers",
    async (_, {rejectWithValue}): Promise<ICareerData[]> => {
        try {
            const response: ICareerData[] = await http.get("/career/get-careers");
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