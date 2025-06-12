import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import type { IResumeData } from "../../types/candidate/CandidateType";
import http from "../../ultils/axios/axiosCustom";


const getCandidateOnlineResume = createAsyncThunk (
    "candidate/getCandidateOnlineResume",
    async (_, {rejectWithValue}): Promise<IApiResponse<IResumeData>> => {
        try {
            const response: IApiResponse<IResumeData> = await http.get("/candidate/get-candidate-online-resume");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const candidateThunks = {
    getCandidateOnlineResume
}
export default candidateThunks;