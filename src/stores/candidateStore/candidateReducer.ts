import { createSlice } from "@reduxjs/toolkit"
import candidateThunks from "./candidateThunk"
import type { IAdvancedSkillData, ICandidateData, ICertificateData, IEducationData, IExperienceData, ILanguageData, IResumeData } from "../../types/candidate/ResumeType";
import toast from "react-hot-toast";

interface CandidateState{
    resume?: IResumeData;
    candidate?: ICandidateData;
    educations: IEducationData[];
    certificates: ICertificateData[];
    experiences: IExperienceData[];
    languages: ILanguageData[];
    advancedSkills: IAdvancedSkillData[];
    loading: boolean,
    error?: string,
}

const initialState: CandidateState = {
    loading: false,
    error: undefined,

    educations: [],
    certificates: [],
    experiences: [],
    languages: [],
    advancedSkills: []
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
            state.resume = action.payload.data.resume
            state.candidate = action.payload.data.candidate
            state.educations = action.payload.data.educations
            state.certificates = action.payload.data.certificates
            state.experiences = action.payload.data.experiences
            state.languages = action.payload.data.languages
            state.advancedSkills = action.payload.data.advancedSkills
            state.loading = false;
        });
        builder.addCase(candidateThunks.getCandidateOnlineResume.rejected, (state, action) => {
            state.loading = false;
        });

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

        //update online resume
        builder.addCase(candidateThunks.updateOnlineResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(candidateThunks.updateOnlineResume.fulfilled, (state, action) => {
            state.resume = action.payload.data
            state.loading = false;
            toast.success("Cập nhật thành công")
        })
        builder.addCase(candidateThunks.updateOnlineResume.rejected, (state, action) => {
            state.loading = false;
        })

    }
});

export const candidateActions = {
    ...candidateSlice.actions,
    ...candidateThunks,
}

export default candidateSlice.reducer;