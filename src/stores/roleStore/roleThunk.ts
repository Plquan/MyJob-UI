import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { ICreateRoleData, IFunctionData, IRoleData, IUpdateRoleData, IUpdateRolePermission } from "../../types/role/RoleType";


const getAllFunctions = createAsyncThunk(
    "role/getAllFunctions",
    async (_, {rejectWithValue}): Promise<IFunctionData[]> => {
        try {
            const response: IFunctionData[] = await http.get("/role/get-functions");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getAllRoles = createAsyncThunk(
    "role/getAllRoles",
    async (_, {rejectWithValue}): Promise<IRoleData[]> => {
        try {
            const response: IRoleData[] = await http.get("/role/get-roles");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createRole = createAsyncThunk(
    "role/createRole",
    async (data: ICreateRoleData, {rejectWithValue}): Promise<IRoleData> => {
        try {
            const response: IRoleData = await http.post("/role/create-role",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateRole = createAsyncThunk(
    "role/updateRole",
    async (data: IUpdateRoleData, {rejectWithValue}): Promise<IRoleData> => {
        try {
            const response: IRoleData = await http.put("/role/update-role",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteRole = createAsyncThunk(
    "role/deleteRole",
    async (roleId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/role/delete-role/${roleId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateRolePermissions = createAsyncThunk(
    "role/updateRolePermissions",
    async (data:IUpdateRolePermission, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.post("/role/update-role-permissions",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)


const roleThunks = {
    getAllFunctions,
    getAllRoles,
    createRole,
    updateRole,
    deleteRole,
    updateRolePermissions
}
export default roleThunks;
