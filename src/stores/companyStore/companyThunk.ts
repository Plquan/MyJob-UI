import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { ICompanyDetail } from "../../types/company/CompanyType";
import type { IMyJobFile } from "../../types/myJobFile/myJobFileType";

const getEmployerCompany = createAsyncThunk (
    "company/getEmployerCompany",
    async (_, {rejectWithValue}): Promise<ICompanyDetail> => {
        try {
            const response: ICompanyDetail = await http.get("/company/get-employer-company");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const uploadCompanyLogo = createAsyncThunk (
    "company/uploadCompanyLogo",
    async (file: FormData, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.put("/company/upload-company-logo",file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const uploadCompanyCoverImage = createAsyncThunk (
    "company/uploadCompanyCoverImage",
    async (file: FormData, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.put("/company/upload-company-cover-image",file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const uploadCompanyImages = createAsyncThunk (
    "company/uploadCompanyImages",
    async (file: FormData, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.post("/company/upload-company-images",file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)




const companyThunks = {
    getEmployerCompany,
    uploadCompanyLogo,
    uploadCompanyCoverImage,
    uploadCompanyImages
}

export default companyThunks