import type { IResume, IUserInfo } from "../../types/resume/ResumeType";
import onlineResumeThunks from "./onlineResumeThunk";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICertificate } from "../../types/resume/CertificateType";
import type { IEducation } from "../../types/resume/EducationType";
import type { IExperience } from "../../types/resume/ExperienceType";
import type { ILanguage } from "../../types/resume/LanguageType";
import type { ISkill } from "../../types/resume/SkillType";
import type { ICandidate } from "../../types/candidate/CandidateType";
import { message } from "antd";

interface CandidateState{
    resume?: IResume    
    candidate?:ICandidate
    educations:IEducation[]
    certificates:ICertificate[]
    experiences:IExperience[]
    languages:ILanguage[]
    skills:ISkill[]
    error?: string,
    isSubmitting: {
        certificates: boolean;
        education: boolean;
        languages: boolean;
        skills: boolean;
        experiences: boolean;
        resume: boolean;
        candidate:boolean
    },
    loading: {
        certificates: boolean;
        education: boolean;
        languages: boolean;
        skills: boolean;
        experiences: boolean;
        resume: boolean;
        candidate:boolean
      }
}

const initialState: CandidateState = {
    error: undefined,
    isSubmitting: {
        certificates: false,
        education: false,
        languages: false,
        skills: false,
        experiences: false,
        resume: false,
        candidate:false
    },
    loading: {
        certificates: false,
        education: false,
        languages: false,
        skills: false,
        experiences: false,
        resume: false,
        candidate:false
    },
    educations: [],
    certificates: [],
    experiences: [],
    languages: [],
    skills: [],
}

export const onlineResumeSlice = createSlice({
    name: "onlineResume",
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
        builder.addCase(onlineResumeThunks.getOnlineResume.pending, (state) => {
            state.loading.candidate = true;
            state.loading.education = true;
            state.loading.certificates = true;
            state.loading.languages = true;
            state.loading.resume = true;
            state.loading.skills = true;
        })
        builder.addCase(onlineResumeThunks.getOnlineResume.fulfilled, (state, action) => {
            state.resume = action.payload.resume
            state.educations = action.payload.educations
            state.certificates = action.payload.certificates
            state.experiences = action.payload.experiences
            state.languages = action.payload.languages
            state.skills = action.payload.skills
            state.candidate = action.payload.candidate

            state.loading.candidate = false;
            state.loading.education = false;
            state.loading.certificates = false;
            state.loading.languages = false;
            state.loading.resume = false;
            state.loading.skills = false;
        })
        builder.addCase(onlineResumeThunks.getOnlineResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading.candidate = false;
            state.loading.education = false;
            state.loading.certificates = false;
            state.loading.languages = false;
            state.loading.resume = false;
            state.loading.skills = false;
            message.error(action.payload.errorMessage)
        })

        //update resume
        builder.addCase(onlineResumeThunks.updateOnlineResume.pending, (state) => {
            state.loading.resume = true;
        })
        builder.addCase(onlineResumeThunks.updateOnlineResume.fulfilled, (state, action:PayloadAction<any>) => {
            state.resume = action.payload
            state.loading.resume = false;
            message.success("Cập nhật thành công")
        })
        builder.addCase(onlineResumeThunks.updateOnlineResume.rejected, (state, action:PayloadAction<any>) => {
            state.loading.resume = false;
            message.error(action.payload.errorMessage)
        })

         //update profile
         builder.addCase(onlineResumeThunks.updateProfile.pending, (state) => {
            state.loading.candidate = true;
        })
        builder.addCase(onlineResumeThunks.updateProfile.fulfilled, (state, action) => {
            state.candidate = action.payload
            state.loading.candidate = false;
            message.success("Cập nhật thành công")
        })
        builder.addCase(onlineResumeThunks.updateProfile.rejected, (state, action) => {
            state.loading.candidate = false;
        })

        //get profile
        builder.addCase(onlineResumeThunks.getProfile.pending, (state) => {
            state.loading.candidate = true;
        })
        builder.addCase(onlineResumeThunks.getProfile.fulfilled, (state, action) => {
            state.candidate = action.payload
            state.loading.candidate = false;
        })
        builder.addCase(onlineResumeThunks.getProfile.rejected, (state, action) => {
            state.loading.candidate = false;
        })

         //create certificate
         builder.addCase(onlineResumeThunks.createCertificate.pending, (state) => {
            state.loading.certificates = true;
        })
        builder.addCase(onlineResumeThunks.createCertificate.fulfilled, (state, action) => {
            state.certificates.push(action.payload)
            state.loading.certificates = false;
            message.success("Thêm chứng chỉ thành công")
        })
        builder.addCase(onlineResumeThunks.createCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.loading.certificates = false;
            message.error(action.payload.errorMessage)
        })

        //update certificate
        builder.addCase(onlineResumeThunks.updateCertificate.pending, (state) => {
            state.loading.certificates = true;
        })
        builder.addCase(onlineResumeThunks.updateCertificate.fulfilled, (state, action) => {
            state.certificates = state.certificates?.map(
                (cert) => (cert.id === action.payload.id ? action.payload : cert)
            )
            state.loading.certificates = false;
            message.success("Cập nhật chứng chỉ thành công")
        })
        builder.addCase(onlineResumeThunks.updateCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.loading.certificates = false;
            message.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(onlineResumeThunks.deleteCertificate.pending, (state) => {
            state.isSubmitting.certificates = true;
        })
        builder.addCase(onlineResumeThunks.deleteCertificate.fulfilled, (state, action) => {
            state.certificates = state.certificates.filter(cert => cert.id !== action.meta.arg)
            state.isSubmitting.certificates = false;
            message.success("Xóa chứng chỉ thành công")
        })
        builder.addCase(onlineResumeThunks.deleteCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.certificates = false;
            message.error(action.payload.errorMessage)
        })

         //create Education
         builder.addCase(onlineResumeThunks.createEducation.pending, (state) => {
            state.loading.education = true;
        })
        builder.addCase(onlineResumeThunks.createEducation.fulfilled, (state, action) => {
            state.educations.push(action.payload)
            state.loading.education = false;
            message.success("Thêm học vấn thành công")
        })
        builder.addCase(onlineResumeThunks.createEducation.rejected, (state, action:PayloadAction<any>) => {
            state.loading.education = false;
            message.error(action.payload.errorMessage)
        })

         //update Education
        builder.addCase(onlineResumeThunks.updateEducation.pending, (state) => {
            state.loading.education = true;
        })
        builder.addCase(onlineResumeThunks.updateEducation.fulfilled, (state, action) => {
            state.educations = state.educations?.map(
                (edu) => (edu.id === action.payload.id ? action.payload : edu)
            )
            state.loading.education = false;
            message.success("Cập nhật học vấn thành công")
        })
        builder.addCase(onlineResumeThunks.updateEducation.rejected, (state, action:PayloadAction<any>) => {
            state.loading.education = false;
            message.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(onlineResumeThunks.deleteEducation.pending, (state) => {
            state.isSubmitting.education = true;
        })
        builder.addCase(onlineResumeThunks.deleteEducation.fulfilled, (state, action) => {
            state.educations = state.educations.filter(edu => edu.id !== action.meta.arg);
            state.isSubmitting.education = false;
            message.success("Xóa học vấn thành công")
        })
        builder.addCase(onlineResumeThunks.deleteEducation.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.education = false;
            message.error(action.payload.errorMessage)
        })

        //create experience
        builder.addCase(onlineResumeThunks.createExperience.pending, (state) => {
            state.loading.experiences = true;
        })
        builder.addCase(onlineResumeThunks.createExperience.fulfilled, (state, action) => {
            state.experiences.push(action.payload)
            state.loading.experiences = false;
        })
        builder.addCase(onlineResumeThunks.createExperience.rejected, (state, action) => {
            state.loading.experiences = false;
        })

        //update experience
        builder.addCase(onlineResumeThunks.updateExperience.pending, (state) => {
            state.loading.experiences = true;
        })
        builder.addCase(onlineResumeThunks.updateExperience.fulfilled, (state, action) => {
            state.experiences = state.experiences?.map(
                (cert) => (cert.id === action.payload.id ? action.payload : cert)
            )
            state.loading.experiences = false;
        })
        builder.addCase(onlineResumeThunks.updateExperience.rejected, (state, action) => {
            state.loading.experiences = false;
        })

         //delete
        builder.addCase(onlineResumeThunks.deleteExperience.pending, (state) => {
            state.isSubmitting.experiences = true;
        })
        builder.addCase(onlineResumeThunks.deleteExperience.fulfilled, (state, action) => {
            state.experiences = state.experiences.filter(cert => cert.id !== action.meta.arg);
            state.isSubmitting.experiences = false;
        })
        builder.addCase(onlineResumeThunks.deleteExperience.rejected, (state, action) => {
            state.isSubmitting.experiences = false;
        })

         //create Language
         builder.addCase(onlineResumeThunks.createLanguage.pending, (state) => {
            state.loading.languages = true;
        })
        builder.addCase(onlineResumeThunks.createLanguage.fulfilled, (state, action) => {
            state.languages.push(action.payload)
            state.loading.languages = false;
            message.success("Thêm ngôn ngữ thành công")
        })
        builder.addCase(onlineResumeThunks.createLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.loading.languages = false;
            message.error(action.payload.errorMessage)
        })

         //update Language
        builder.addCase(onlineResumeThunks.updateLanguage.pending, (state) => {
            state.isSubmitting.languages = true;
        })
        builder.addCase(onlineResumeThunks.updateLanguage.fulfilled, (state, action) => {
            state.languages = state.languages?.map(
                (lang) => (lang.id === action.payload.id ? action.payload : lang)
            )
            state.isSubmitting.languages = false;
            message.success("Cập nhật ngôn ngữ thành công")
        })
        builder.addCase(onlineResumeThunks.updateLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.languages = false;
            message.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(onlineResumeThunks.deleteLanguage.pending, (state) => {
            state.isSubmitting.languages = true;
        })
        builder.addCase(onlineResumeThunks.deleteLanguage.fulfilled, (state, action) => {
            state.languages = state.languages.filter(lang => lang.id !== action.meta.arg);
            state.isSubmitting.languages = false;
            message.success("Xóa ngôn ngữ thành công")
        })
        builder.addCase(onlineResumeThunks.deleteLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.languages = false;
            message.error(action.payload.errorMessage)
        })

         //create skill
         builder.addCase(onlineResumeThunks.createSkill.pending, (state) => {
            state.loading.skills = true;
        })
        builder.addCase(onlineResumeThunks.createSkill.fulfilled, (state, action) => {
            state.skills.push(action.payload)
            state.loading.skills = false;
            message.success("Thêm kĩ thành công")
        })
        builder.addCase(onlineResumeThunks.createSkill.rejected, (state, action:PayloadAction<any>) => {
            state.loading.skills = false;
            message.error(action.payload.errorMessage)
        })

         //update skill
        builder.addCase(onlineResumeThunks.updateSkill.pending, (state) => {
            state.isSubmitting.skills = true;
        })
        builder.addCase(onlineResumeThunks.updateSkill.fulfilled, (state, action) => {
            state.skills = state.skills?.map(
                (lang) => (lang.id === action.payload.id ? action.payload : lang)
            )
            state.isSubmitting.skills = false;
            message.success("Cập nhật kĩ năng thành công")
        })
        builder.addCase(onlineResumeThunks.updateSkill.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.skills = false;
            message.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(onlineResumeThunks.deleteSkill.pending, (state) => {
            state.isSubmitting.skills = true;
        })
        builder.addCase(onlineResumeThunks.deleteSkill.fulfilled, (state, action) => {
            state.skills = state.skills.filter(lang => lang.id !== action.meta.arg);
            state.isSubmitting.skills = false;
            message.success("Xóa kĩ năng thành công")
        })
        builder.addCase(onlineResumeThunks.deleteSkill.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting.skills = false;
            message.error(action.payload.errorMessage)
        })


    }
})

export const onlineResumeActions = {
    ...onlineResumeSlice.actions,
    ...onlineResumeThunks,
}

export default onlineResumeSlice.reducer;