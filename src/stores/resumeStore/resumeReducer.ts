import toast from "react-hot-toast";
import type { IResumeData } from "../../types/resume/ResumeType";
import resumeThunks from "./resumeThunk";
import { createSlice } from "@reduxjs/toolkit";

interface CandidateState{
    resume?: IResumeData;
    loading: boolean,
    error?: string,
}

const initialState: CandidateState = {
    loading: false,
    error: undefined,

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
            state.resume = action.payload.data
            state.loading = false;
        });
        builder.addCase(resumeThunks.getOnlineResume.rejected, (state, action) => {
            state.loading = false;
        });

        //update online resume
        builder.addCase(resumeThunks.updateOnlineResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resumeThunks.updateOnlineResume.fulfilled, (state, action) => {
            state.resume = action.payload.data
            state.loading = false;
            toast.success("Cập nhật thành công")
        })
        builder.addCase(resumeThunks.updateOnlineResume.rejected, (state, action) => {
            state.loading = false;
        })

    }
});

export const resumeActions = {
    ...resumeSlice.actions,
    ...resumeThunks,
}

export default resumeSlice.reducer;