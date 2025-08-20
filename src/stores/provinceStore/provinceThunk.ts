import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { IDistrict, IProvince } from "../../types/province/ProvinceType";

const getAllProvinces = createAsyncThunk (
    "province/getAllProvinces",
    async (_, {rejectWithValue}): Promise<IApiResponse<IProvince[]>> => {
        try {
            const response: IApiResponse<IProvince[]> = await http.get("/province/get-provinces");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getDistrictsByProvince = createAsyncThunk (
    "province/getDistrictsByProvince",
    async (provinceId: number, {rejectWithValue}): Promise<IApiResponse<IDistrict[]>> => {
        try {
            const response: IApiResponse<IDistrict[]> = await http.get(`/province/get-districts/${provinceId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const provinceThunks = {
    getAllProvinces,
    getDistrictsByProvince
}
export default provinceThunks;

