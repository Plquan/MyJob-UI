import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IMyJobFile } from "../../types/myJobFile/myJobFileType";
import type { ICompanyDetail, ICompanyWithImagesData, IGetCompaniesReqParams } from "../../types/company/CompanyType";
import type { IPaginationResponse } from "../../types/AppType";

const getEmployerCompany = createAsyncThunk (
    "company/getEmployerCompany",
    async (_, {rejectWithValue}): Promise<ICompanyWithImagesData> => {
        try {
            const response: ICompanyWithImagesData = await http.get("/company/get-employer-company");
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
            const response: IMyJobFile = await http.put("/company/upload-company-logo", file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message) as any;
        }
    }
)

const uploadCompanyCoverImage = createAsyncThunk (
    "company/uploadCompanyCoverImage",
    async (file: FormData, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.put("/company/upload-company-cover-image", file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message) as any;
        }
    }
)
const uploadCompanyImages = createAsyncThunk (
    "company/uploadCompanyImages",
    async (file: FormData, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.post("/company/upload-company-images", file);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message) as any;
        }
    }
)

const deleteCompanyImage = createAsyncThunk (
    "company/deleteCompanyImage",
    async (imageId: Number, {rejectWithValue}): Promise<IMyJobFile> => {
        try {
            const response: IMyJobFile = await http.delete(`/company/delete-company-image/${imageId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getCompanies = createAsyncThunk (
    "company/getCompanies",
    async (params: IGetCompaniesReqParams = { page: 1, limit: 10 }, {rejectWithValue}): Promise<IPaginationResponse<ICompanyWithImagesData>> => {
        try {
            const response: IPaginationResponse<ICompanyWithImagesData> = await http.get("/company", {
                params: {
                    page: params.page,
                    limit: params.limit,
                    companyName: params.companyName || "",
                }
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getCompanyDetail = createAsyncThunk (
    "company/getCompanyDetail",
    async (companyId: number, {rejectWithValue}): Promise<ICompanyDetail> => {
        try {
            const response: ICompanyDetail = await http.get(`/company/get-company-detail/${companyId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const toggleFollowCompany = createAsyncThunk (
    "company/toggleFollowCompany",
    async (companyId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.post(`company/toggle-follow-company?companyId=${companyId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getSavedCompanies = createAsyncThunk (
    "company/getSavedCompanies",
    async (_, {rejectWithValue}): Promise<ICompanyWithImagesData[]> => {
        try {
            const response: ICompanyWithImagesData[] = await http.get("/company/saved-companies");
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
    uploadCompanyImages,
    deleteCompanyImage,
    getCompanies,
    getCompanyDetail,
    toggleFollowCompany,
    getSavedCompanies
}

export default companyThunks