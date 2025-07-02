import toast from "react-hot-toast";
import type { IResume } from "../../types/resume/ResumeType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import attachedResumeThunks from "./attachedResumeThunk";

interface CandidateState{
    attachedResumes:IResume[]
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: CandidateState = {
    loading: false,
    error: undefined,
    isSubmitting: false,
    attachedResumes: [],
}

export const attachedResumeSlice = createSlice({
    name: "attachedResume",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get all attached resumse
        builder.addCase(attachedResumeThunks.getAllAttachedResumes.pending, (state) => {
        state.loading = true;
        })
        builder.addCase(attachedResumeThunks.getAllAttachedResumes.fulfilled, (state, action) => {
            state.attachedResumes = action.payload.data
            state.loading = false;
        })
        builder.addCase(attachedResumeThunks.getAllAttachedResumes.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

         //upload attached resume
        builder.addCase(attachedResumeThunks.uploadAttachedResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.attachedResumes.push(action.payload.data)
            state.loading = false;
            toast.success("Thêm hồ sơ đính kèm thành công")
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

        //delete attached Resume 
         builder.addCase(attachedResumeThunks.deleteAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.deleteAttachedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes.filter(resume => resume.id !== action.meta.arg);
            state.isSubmitting = false;
            toast.success("Xóa hồ sơ thành công")
        })
        builder.addCase(attachedResumeThunks.deleteAttachedResume.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

        //update attached Resume 
        builder.addCase(attachedResumeThunks.updateAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes?.map(
                (resume) => (resume.id === action.payload.data.id ? action.payload.data : resume)
            )
            state.isSubmitting = false
            toast.success("Cập nhật hồ sơ thành công")
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

    }
});

export const attachedResumeActions = {
    ...attachedResumeSlice.actions,
    ...attachedResumeThunks,
}

export default attachedResumeSlice.reducer;