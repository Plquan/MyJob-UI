import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import skillThunks from "./skillThunk";
import type { ISkillData } from "../../types/resume/SkillType";

interface SkillState{
    skills: ISkillData[];
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: SkillState = {
    loading: false,
    error: undefined,
    isSubmitting:false,
    skills: []

}

export const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all skills
        builder.addCase(skillThunks.getAllSkills.pending, (state) => {
            state.loading = true
        })
        builder.addCase(skillThunks.getAllSkills.fulfilled, (state, action) => {
            state.skills = action.payload.data
            state.loading = false
        })
        builder.addCase(skillThunks.getAllSkills.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

        //create skill
        builder.addCase(skillThunks.createSkill.pending, (state) => {
            state.loading = true
        })
        builder.addCase(skillThunks.createSkill.fulfilled, (state, action) => {
            state.skills.push(action.payload.data)
            state.loading = false
            toast.success("Thêm kĩ thành công")
        })
        builder.addCase(skillThunks.createSkill.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

         //update skill
        builder.addCase(skillThunks.updateSkill.pending, (state) => {
            state.isSubmitting = true
        })
        builder.addCase(skillThunks.updateSkill.fulfilled, (state, action) => {
            state.skills = state.skills?.map(
                (lang) => (lang.id === action.payload.data.id ? action.payload.data : lang)
            )
            state.isSubmitting = false
            toast.success("Cập nhật kĩ năng thành công")
        })
        builder.addCase(skillThunks.updateSkill.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false
            toast.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(skillThunks.deleteSkill.pending, (state) => {
            state.isSubmitting = true
        })
        builder.addCase(skillThunks.deleteSkill.fulfilled, (state, action) => {
            state.skills = state.skills.filter(lang => lang.id !== action.meta.arg);
            state.isSubmitting = false
            toast.success("Xóa kĩ năng thành công")
        })
        builder.addCase(skillThunks.deleteSkill.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false
            toast.error(action.payload.errorMessage)
        })


    }
})

export const skillActions = {
    ...skillSlice.actions,
    ...skillThunks,
}

export default skillSlice.reducer;