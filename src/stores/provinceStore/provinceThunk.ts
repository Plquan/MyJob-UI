import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IDistrict, IProvince } from "../../types/province/ProvinceType";

const getAllProvinces = createAsyncThunk (
    "province/getAllProvinces",
    async (_, {rejectWithValue}): Promise<IProvince[]> => {
        try {
            const response: IProvince[] = await http.get("/province");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getDistrictsByProvince = createAsyncThunk (
    "province/getDistrictsByProvince",
    async (provinceId: number, {rejectWithValue}): Promise<IDistrict[]> => {
        try {
            const response: IDistrict[] = await http.get(`/province/get-districts/${provinceId}`);
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

