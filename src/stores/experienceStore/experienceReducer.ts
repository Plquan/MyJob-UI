import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import experienceThunks from "./experienceThunk";
import type { IExperience } from "../../types/resume/ExperienceType";


interface ExperienceState{
    experiences: IExperience[];
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: ExperienceState = {
    loading: false,
    error: undefined,
    isSubmitting:false,

    experiences: []

}

export const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all certifiactes
        builder.addCase(experienceThunks.getAllExperiences.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(experienceThunks.getAllExperiences.fulfilled, (state, action) => {
            state.experiences = action.payload.data
            state.loading = false;
        })
        builder.addCase(experienceThunks.getAllExperiences.rejected, (state, action) => {
            state.loading = false
        })

        //create experience
        builder.addCase(experienceThunks.createExperience.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(experienceThunks.createExperience.fulfilled, (state, action) => {
            state.experiences.push(action.payload.data)
            state.loading = false
        })
        builder.addCase(experienceThunks.createExperience.rejected, (state, action) => {
            state.loading = false
        })

        //update experience
        builder.addCase(experienceThunks.updateExperience.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(experienceThunks.updateExperience.fulfilled, (state, action) => {
            state.experiences = state.experiences?.map(
                (cert) => (cert.id === action.payload.data.id ? action.payload.data : cert)
            )
            state.loading = false;
        })
        builder.addCase(experienceThunks.updateExperience.rejected, (state, action) => {
            state.loading = false;
        })

         //delete
        builder.addCase(experienceThunks.deleteExperience.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(experienceThunks.deleteExperience.fulfilled, (state, action) => {
            state.experiences = state.experiences.filter(cert => cert.id !== action.meta.arg);
            state.isSubmitting = false;
        })
        builder.addCase(experienceThunks.deleteExperience.rejected, (state, action) => {
            state.isSubmitting = false;
        })


    }
});

export const experienceActions = {
    ...experienceSlice.actions,
    ...experienceThunks,
}

export default experienceSlice.reducer;