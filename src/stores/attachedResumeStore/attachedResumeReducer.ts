import toast from "react-hot-toast";
import type { IResume } from "../../types/resume/ResumeType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import attachedResumeThunks from "./attachedResumeThunk";
import { EResumeType } from "../../enums/resume/EResumeType";

interface AttachedResumeState {
    attachedResumes: IResume[]
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: AttachedResumeState = {
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
        builder.addCase(attachedResumeThunks.getResumes.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(attachedResumeThunks.getResumes.fulfilled, (state, action) => {
            state.attachedResumes = action.payload
            state.loading = false;
        })
        builder.addCase(attachedResumeThunks.getResumes.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.message)
        })

        //upload attached resume
        builder.addCase(attachedResumeThunks.uploadAttachedResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.fulfilled, (state, action) => {
            console.log(action.payload)
            state.attachedResumes.push(action.payload)
            state.loading = false;
            toast.success("Thêm hồ sơ đính kèm thành công")
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.message)
        })

        //delete attached Resume 
        builder.addCase(attachedResumeThunks.deleteAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(
            attachedResumeThunks.deleteAttachedResume.fulfilled,
            (state, action) => {
                const deletedResumeId = action.meta.arg;

                const deletedResume = state.attachedResumes.find(
                    resume => resume.id === deletedResumeId
                );

                state.attachedResumes = state.attachedResumes.filter(
                    resume => resume.id !== deletedResumeId
                );

                if (deletedResume?.selected) {
                    const onlineResume = state.attachedResumes.find(
                        resume => resume.type === EResumeType.ONLINE
                    );

                    if (onlineResume) {
                        onlineResume.selected = true;
                    }
                }

                state.isSubmitting = false;
                toast.success("Xóa hồ sơ thành công");
            }
        );
        builder.addCase(attachedResumeThunks.deleteAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.message)
        })

        //update attached Resume 
        builder.addCase(attachedResumeThunks.updateAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes?.map(
                (resume) => (resume.id === action.payload.id ? action.payload : resume)
            )
            state.isSubmitting = false
            toast.success("Cập nhật hồ sơ thành công")
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

        //set selected Resume 
        builder.addCase(attachedResumeThunks.setSelectedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.setSelectedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes?.map(
                (resume) =>
                    resume.id === action.meta.arg
                        ? { ...resume, selected: true }
                        : { ...resume, selected: false }
            );
            state.isSubmitting = false;
        })
        builder.addCase(attachedResumeThunks.setSelectedResume.rejected, (state, action: PayloadAction<any>) => {
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