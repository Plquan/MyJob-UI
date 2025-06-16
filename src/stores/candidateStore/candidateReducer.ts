import { createSlice } from "@reduxjs/toolkit"
import candidateThunks from "./candidateThunk"
import type { ICandidateData } from "../../types/resume/ResumeType";
import toast from "react-hot-toast";

interface CandidateState{
    candidate?: ICandidateData;
    loading: boolean,
    error?: string,
}

const initialState: CandidateState = {
    loading: false,
    error: undefined,

}

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //update profile
        builder.addCase(candidateThunks.updateProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(candidateThunks.updateProfile.fulfilled, (state, action) => {
            state.candidate = action.payload.data
            state.loading = false;
            toast.success("Cập nhật thành công")
        })
        builder.addCase(candidateThunks.updateProfile.rejected, (state, action) => {
            state.loading = false;
        })

        //get profile
        builder.addCase(candidateThunks.getProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(candidateThunks.getProfile.fulfilled, (state, action) => {
            state.candidate = action.payload.data
            state.loading = false;
        })
        builder.addCase(candidateThunks.getProfile.rejected, (state, action) => {
            state.loading = false;
        })


    }
});

export const candidateActions = {
    ...candidateSlice.actions,
    ...candidateThunks,
}

export default candidateSlice.reducer;