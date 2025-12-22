import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IProvince } from "../../types/province/ProvinceType";

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

const provinceThunks = {
    getAllProvinces,
}
export default provinceThunks;


