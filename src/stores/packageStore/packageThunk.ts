import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { ICreatePackagedata, IPackageDto, IUpdatePackageData, IPackageUsage } from "../../types/package/PackageType";

const getAllPackages = createAsyncThunk (
    "package/getAllPackages",
    async (_, {rejectWithValue}): Promise<IPackageDto[]> => {
        try {
            const response: IPackageDto[] = await http.get("/package/get-all-package");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createPackage = createAsyncThunk (
    "package/createPackage",
    async (data: ICreatePackagedata, {rejectWithValue}): Promise<IPackageDto> => {
        try {
            const response: IPackageDto = await http.post("/package",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updatePackage = createAsyncThunk (
    "package/updatePackage",
    async (data: IUpdatePackageData, {rejectWithValue}): Promise<IPackageDto> => {
        try {
            const response: IPackageDto = await http.put("/package",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deletePackage = createAsyncThunk (
    "package/deletePackage",
    async (packageId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/package?packageId=${packageId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const getPackages = createAsyncThunk (
    "package/getPackages",
    async (_, {rejectWithValue}): Promise<IPackageDto[]> => {
        try {
            const response: IPackageDto[] = await http.get("/package");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const purchasePackage = createAsyncThunk (
    "package/purchasePackage",
    async (packageId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.post(`/package/purchase-package?packageId=${packageId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getCompanyPackage = createAsyncThunk (
    "package/getCompanyPackage",
    async (_, {rejectWithValue}): Promise<IPackageUsage> => {
        try {
            const response: IPackageUsage = await http.get("/package/get-company-package");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const packageThunks = {
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getPackages,
    purchasePackage,
    getCompanyPackage
}
export default packageThunks;

