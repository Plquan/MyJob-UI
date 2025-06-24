import { createAsyncThunk } from "@reduxjs/toolkit"
import type { IApiResponse } from "../../types/AppType"
import http from "../../ultils/axios/axiosCustom"
import type { ISkill } from "../../types/resume/SkillType"

const getAllSkills = createAsyncThunk (
    "skill/getAllSkills",
    async (_, {rejectWithValue}): Promise<IApiResponse<ISkill[]>> => {
        try {
            const response: IApiResponse<ISkill[]> = await http.get("/skill/get-skills");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const createSkill = createAsyncThunk (
    "skill/createSkill",
    async (data: ISkill, {rejectWithValue}): Promise<IApiResponse<ISkill>> => {
        try {
            const response: IApiResponse<ISkill> = await http.post("/skill/create-skill",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateSkill = createAsyncThunk (
    "skill/updateSkill",
    async (data: ISkill, {rejectWithValue}): Promise<IApiResponse<ISkill>> => {
        try {
            const response: IApiResponse<ISkill> = await http.put("/skill/update-skill",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteSkill = createAsyncThunk (
    "skill/deleteSkill",
    async (skillId: number, {rejectWithValue}): Promise<IApiResponse<any>> => {
        try {
            const response: IApiResponse<any> = await http.delete(`/skill/delete-skill/${skillId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const skillThunks = {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill
}
export default skillThunks