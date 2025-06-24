import { createAsyncThunk } from "@reduxjs/toolkit"
import type { IApiResponse } from "../../types/AppType"
import http from "../../ultils/axios/axiosCustom"
import type { ICertificate } from "../../types/resume/CertificateType"


const getAllCertificates = createAsyncThunk (
    "certificate/getAllCertificates",
    async (_, {rejectWithValue}): Promise<IApiResponse<ICertificate[]>> => {
        try {
            const response: IApiResponse<ICertificate[]> = await http.get("/certificate/get-certificates");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createCertificate = createAsyncThunk (
    "certificate/createCertificate",
    async (data: ICertificate, {rejectWithValue}): Promise<IApiResponse<ICertificate>> => {
        try {
            const response: IApiResponse<ICertificate> = await http.post("/certificate/create-certificate",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateCertificate = createAsyncThunk (
    "certificate/updateCertificate",
    async (data: ICertificate, {rejectWithValue}): Promise<IApiResponse<ICertificate>> => {
        try {
            const response: IApiResponse<ICertificate> = await http.put("/certificate/update-certificate",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteCertificate = createAsyncThunk (
    "certificate/deleteCertificate",
    async (id: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.delete(`/certificate/delete-certificate/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const certificateThunks = {
    getAllCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
}
export default certificateThunks