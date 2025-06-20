import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import type { IEducationData } from "../../types/resume/EducationType";
import educationThunks from "./educationThunk";

interface EducationState{
    educations: IEducationData[];
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: EducationState = {
    loading: false,
    error: undefined,
    isSubmitting:false,
    educations: []

}

export const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all educations
        builder.addCase(educationThunks.getAllEducations.pending, (state) => {
            state.loading = true
        })
        builder.addCase(educationThunks.getAllEducations.fulfilled, (state, action) => {
            state.educations = action.payload.data
            state.loading = false
        })
        builder.addCase(educationThunks.getAllEducations.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

        //create Education
        builder.addCase(educationThunks.createEducation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(educationThunks.createEducation.fulfilled, (state, action) => {
            state.educations.push(action.payload.data)
            state.loading = false
            toast.success("Thêm học vấn thành công")
        })
        builder.addCase(educationThunks.createEducation.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

         //update Education
        builder.addCase(educationThunks.updateEducation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(educationThunks.updateEducation.fulfilled, (state, action) => {
            state.educations = state.educations?.map(
                (edu) => (edu.id === action.payload.data.id ? action.payload.data : edu)
            )
            state.loading = false
            toast.success("Cập nhật học vấn thành công")
        })
        builder.addCase(educationThunks.updateEducation.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(educationThunks.deleteEducation.pending, (state) => {
            state.isSubmitting = true
        })
        builder.addCase(educationThunks.deleteEducation.fulfilled, (state, action) => {
            state.educations = state.educations.filter(edu => edu.id !== action.meta.arg);
            state.isSubmitting = false
            toast.success("Xóa học vấn thành công")
        })
        builder.addCase(educationThunks.deleteEducation.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false
            toast.error(action.payload.errorMessage)
        })


    }
})

export const educationActions = {
    ...educationSlice.actions,
    ...educationThunks,
}

export default educationSlice.reducer;