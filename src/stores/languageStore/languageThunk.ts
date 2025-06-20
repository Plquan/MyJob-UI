import { createAsyncThunk } from "@reduxjs/toolkit"
import type { IApiResponse } from "../../types/AppType"
import http from "../../ultils/axios/axiosCustom"
import type { ILanguageData } from "../../types/resume/LanguageType";



const getAllLanguages = createAsyncThunk (
    "language/getAllLanguages",
    async (_, {rejectWithValue}): Promise<IApiResponse<ILanguageData[]>> => {
        try {
            const response: IApiResponse<ILanguageData[]> = await http.get("/language/get-languages");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createLanguage = createAsyncThunk (
    "language/createLanguage",
    async (data: ILanguageData, {rejectWithValue}): Promise<IApiResponse<ILanguageData>> => {
        try {
            const response: IApiResponse<ILanguageData> = await http.post("/language/create-language",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateLanguage = createAsyncThunk (
    "language/updateLanguage",
    async (data: ILanguageData, {rejectWithValue}): Promise<IApiResponse<ILanguageData>> => {
        try {
            const response: IApiResponse<ILanguageData> = await http.put("/language/update-language",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteLanguage = createAsyncThunk (
    "language/deleteLanguage",
    async (id: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.delete(`/language/delete-language/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const languageThunks = {
    getAllLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage
}
export default languageThunks