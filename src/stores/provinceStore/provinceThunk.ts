import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IApiResponse } from "../../types/AppType";
import type { IProvince } from "../../types/province/ProvinceType";

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

const provinceThunks = {
    getAllProvinces,
}
export default provinceThunks;

