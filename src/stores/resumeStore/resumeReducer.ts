import toast from "react-hot-toast";
import type { IResume } from "../../types/resume/ResumeType";
import resumeThunks from "./resumeThunk";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CandidateState{
    onlineResume?: IResume
    attachedResumes:IResume[]
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: CandidateState = {
    loading: false,
    error: undefined,
    isSubmitting: false,
    attachedResumes: []

}

export const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(resumeThunks.getOnlineResume.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resumeThunks.getOnlineResume.fulfilled, (state, action) => {
            state.onlineResume = action.payload.data
            state.loading = false;
        });
        builder.addCase(resumeThunks.getOnlineResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        });

        //update online resume
        builder.addCase(resumeThunks.updateOnlineResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resumeThunks.updateOnlineResume.fulfilled, (state, action:PayloadAction<any>) => {
            state.onlineResume = action.payload.data
            state.loading = false;
            toast.success("Cập nhật thành công")
        })
        builder.addCase(resumeThunks.updateOnlineResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

         //upload attached resume
        builder.addCase(resumeThunks.uploadAttachedResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resumeThunks.uploadAttachedResume.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.attachedResumes.push(action.payload.data)
            state.loading = false;
            toast.success("Thêm hồ sơ đính kèm thành công")
        })
        builder.addCase(resumeThunks.uploadAttachedResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

         // get all attached resumse
        builder.addCase(resumeThunks.getAllAttachedResumes.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resumeThunks.getAllAttachedResumes.fulfilled, (state, action) => {
            state.attachedResumes = action.payload.data
            state.loading = false;
        })
        builder.addCase(resumeThunks.getAllAttachedResumes.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

        //delete attached Resume 
         builder.addCase(resumeThunks.deleteAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(resumeThunks.deleteAttachedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes.filter(resume => resume.id !== action.meta.arg);
            state.isSubmitting = false;
        })
        builder.addCase(resumeThunks.deleteAttachedResume.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

    }
});

export const resumeActions = {
    ...resumeSlice.actions,
    ...resumeThunks,
}

export default resumeSlice.reducer;