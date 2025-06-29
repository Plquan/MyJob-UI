import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { IFeature, IFeatureOfPackage, IPackage, IPackageType, IUpdatePackage } from "../../types/package/PackageType";

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

const getAllFeatures = createAsyncThunk (
    "package/getAllFeatures",
    async (_, {rejectWithValue}): Promise<IApiResponse<IFeature[]>> => {
        try {
            const response: IApiResponse<IFeature[]> = await http.get("/package/get-features");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getAllPackageTypes = createAsyncThunk (
    "package/getAllPackageTypes",
    async (_, {rejectWithValue}): Promise<IApiResponse<IPackageType[]>> => {
        try {
            const response: IApiResponse<IPackageType[]> = await http.get("/package/get-package-types");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createPackage = createAsyncThunk (
    "package/createPackage",
    async (data: IUpdatePackage, {rejectWithValue}): Promise<IApiResponse<IPackage>> => {
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
    async (data: IUpdatePackage, {rejectWithValue}): Promise<IApiResponse<IPackage>> => {
        try {
            const response: IApiResponse<IPackage> = await http.post("/package/update-package", data)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getFeaturesOfPackage = createAsyncThunk (
    "package/getFeaturesOfPackage",
    async (packageId: number, {rejectWithValue}): Promise<IApiResponse<IFeatureOfPackage[]>> => {
        try {
            const response: IApiResponse<IFeatureOfPackage[]> = await http.get(`/package/get-features-of-package/${packageId}`)
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
    getAllPackageTypes,
    createPackage,
    updatePackage,
    getAllFeatures,
    getFeaturesOfPackage,
    updatePackageFeatures
}
export default packageThunks;

