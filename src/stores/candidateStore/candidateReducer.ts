import { createSlice } from "@reduxjs/toolkit"
import type { IResumeData } from "../../types/candidate/CandidateType"
import candidateThunks from "./candidateThunk"

interface CandidateState{
    onLineResume?:IResumeData,
    loading: boolean,
    error?: string,
}

const initialState: CandidateState = {
    onLineResume:undefined,
    loading: false,
    error: undefined,
}

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(candidateThunks.getCandidateOnlineResume.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(candidateThunks.getCandidateOnlineResume.fulfilled, (state, action) => {
            state.onLineResume = action.payload.data;
            state.loading = false;
        });
        builder.addCase(candidateThunks.getCandidateOnlineResume.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export const candidateActions = {
    ...candidateSlice.actions,
    ...candidateThunks,
}

export default candidateSlice.reducer;