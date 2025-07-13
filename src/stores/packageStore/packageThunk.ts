import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { IFeatureOfPackage, IPackage } from "../../types/package/PackageType";

const getAllPackages = createAsyncThunk (
    "package/getAllPackages",
    async (_, {rejectWithValue}): Promise<IApiResponse<IPackage[]>> => {
        try {
            const response: IApiResponse<IPackage[]> = await http.get("/package/get-packages");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createPackage = createAsyncThunk (
    "package/createPackage",
    async (data: IPackage, {rejectWithValue}): Promise<IApiResponse<IPackage>> => {
        try {
            const response: IApiResponse<IPackage> = await http.post("/package/create-package", data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updatePackage = createAsyncThunk (
    "package/updatePackage",
    async (data: IPackage, {rejectWithValue}): Promise<IApiResponse<IPackage>> => {
        try {
            const response: IApiResponse<IPackage> = await http.put("/package/update-package", data)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deletePackage = createAsyncThunk (
    "package/deletePackage",
    async (packageId: number, {rejectWithValue}): Promise<IApiResponse<IPackage>> => {
        try {
            const response: IApiResponse<IPackage> = await http.delete(`/package/delete-package/${packageId}`)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getPackageFeatures = createAsyncThunk (
    "package/getPackageFeatures",
    async (packageId: number, {rejectWithValue}): Promise<IApiResponse<IFeatureOfPackage[]>> => {
        try {
            const response: IApiResponse<IFeatureOfPackage[]> = await http.get(`/package/get-package-features/${packageId}`)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any
        }
    }
)

const updatePackageFeatures = createAsyncThunk (
    "package/updatePackageFeatures",
    async ({data, packageId}: {data: IFeatureOfPackage[], packageId: number}, {rejectWithValue}): Promise<IApiResponse<IFeatureOfPackage[]>> => {
        try {
            const response: IApiResponse<IFeatureOfPackage[]> = await http.put(`/package/update-package-features/${packageId}`,data)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any
        }
    }
)

const packageThunks = {
    getAllPackages,
    createPackage,
    updatePackage,
    getPackageFeatures,
    updatePackageFeatures,
    deletePackage
}
export default packageThunks;

