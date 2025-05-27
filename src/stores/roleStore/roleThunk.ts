import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IFunction } from "../../types/role/RoleType";


const getAllFunctions = createAsyncThunk(
    "role/getAllFunctions",
    async (_, {rejectWithValue}): Promise<IApiResponse<IFunction[]>> => {
        try {
            const response: IApiResponse<IFunction[]> = await http.get("/role/get-functions");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getAllGroupRoles = createAsyncThunk(
    "role/getAllGroupRoles",
    async (_, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.get("/role/get-all-group-roles");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const roleThunks = {
    getAllFunctions,
    getAllGroupRoles,
}
export default roleThunks;
