import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IApiResponse } from "../../types/AppType";
import http from "../../ultils/axios/axiosCustom";
import type { IFunction, IRoleData } from "../../types/role/RoleType";


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

const getAllRoles = createAsyncThunk(
    "role/getAllRoles",
    async (_, {rejectWithValue}): Promise<IApiResponse<IRoleData[]>> => {
        try {
            const response: IApiResponse<IRoleData[]> = await http.get("/role/get-roles");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const roleThunks = {
    getAllFunctions,
    getAllRoles,
}
export default roleThunks;
