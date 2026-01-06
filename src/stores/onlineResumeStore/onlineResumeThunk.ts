import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../ultils/axios/axiosCustom";
import type { IOnlineResume, IResume } from "../../types/resume/ResumeType";
import type { ICertificate } from "../../types/resume/CertificateType";
import type { IEducation } from "../../types/resume/EducationType";
import type { IExperience } from "../../types/resume/ExperienceType";
import type { ILanguage } from "../../types/resume/LanguageType";
import type { ISkill } from "../../types/resume/SkillType";
import type { ICandidate } from "../../types/candidate/CandidateType";


const getOnlineResume = createAsyncThunk (
    "resume/getOnlineResume",
    async (_, {rejectWithValue}): Promise<IOnlineResume> => {
        try {
            const response: IOnlineResume = await http.get("/resume/get-online-resume");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateOnlineResume = createAsyncThunk (
    "resume/updateOnlineResume",
    async (data: IResume, {rejectWithValue}): Promise<IResume> => {
        try {
            const response: IResume = await http.put("/resume/update-online-resume",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

//candidate
const updateProfile = createAsyncThunk (
    "candidate/updateProfile",
    async (data: ICandidate, {rejectWithValue}): Promise<ICandidate> => {
        try {
            const response: ICandidate = await http.put("/candidate/update-profile",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const getProfile = createAsyncThunk (
    "candidate/getProfile",
    async (_, {rejectWithValue}): Promise<ICandidate> => {
        try {
            const response: ICandidate = await http.get("/candidate/get-profile");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

//certificate 
const createCertificate = createAsyncThunk (
    "certificate/createCertificate",
    async (data: ICertificate, {rejectWithValue}): Promise<ICertificate> => {
        try {
            const response: ICertificate = await http.post("/certificate/create-certificate",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateCertificate = createAsyncThunk (
    "certificate/updateCertificate",
    async (data: ICertificate, {rejectWithValue}): Promise<ICertificate> => {
        try {
            const response: ICertificate = await http.put("/certificate/update-certificate",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteCertificate = createAsyncThunk (
    "certificate/deleteCertificate",
    async (id: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/certificate/delete-certificate/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

//education
const createEducation = createAsyncThunk (
    "education/createEducation",
    async (data: IEducation, {rejectWithValue}): Promise<IEducation> => {
        try {
            const response: IEducation = await http.post("/education/create-education",data);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const updateEducation = createAsyncThunk (
    "education/updateEducation",
    async (data: IEducation, {rejectWithValue}): Promise<IEducation> => {
        try {
            const response: IEducation = await http.put("/education/update-education",data);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const deleteEducation = createAsyncThunk (
    "education/deleteEducation",
    async (id: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/education/delete-education/${id}`);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

// experience
const createExperience = createAsyncThunk (
    "experience/createExperience",
    async (data: IExperience, {rejectWithValue}): Promise<IExperience> => {
        try {
            const response: IExperience = await http.post("/experience/create-experience",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const updateExperience = createAsyncThunk (
    "experience/updateExperience",
    async (data: IExperience, {rejectWithValue}): Promise<IExperience> => {
        try {
            const response: IExperience = await http.put("/experience/update-experience",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteExperience = createAsyncThunk (
    "experience/deleteExperience",
    async (id: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/experience/delete-experience/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

// language
const createLanguage = createAsyncThunk (
    "language/createLanguage",
    async (data: ILanguage, {rejectWithValue}): Promise<ILanguage> => {
        try {
            const response: ILanguage = await http.post("/language/create-language",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const updateLanguage = createAsyncThunk (
    "language/updateLanguage",
    async (data: ILanguage, {rejectWithValue}): Promise<ILanguage> => {
        try {
            const response: ILanguage = await http.put("/language/update-language",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteLanguage = createAsyncThunk (
    "language/deleteLanguage",
    async (id: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/language/delete-language/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

// skill
const createSkill = createAsyncThunk (
    "skill/createSkill",
    async (data: ISkill, {rejectWithValue}): Promise<ISkill> => {
        try {
            const response: ISkill = await http.post("/skill/create-skill",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const updateSkill = createAsyncThunk (
    "skill/updateSkill",
    async (data: ISkill, {rejectWithValue}): Promise<ISkill> => {
        try {
            const response: ISkill = await http.put("/skill/update-skill",data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)
const deleteSkill = createAsyncThunk (
    "skill/deleteSkill",
    async (skillId: number, {rejectWithValue}): Promise<boolean> => {
        try {
            const response: boolean = await http.delete(`/skill/delete-skill/${skillId}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
    }
)

const onlineResumeThunks = {
    getOnlineResume,
    updateOnlineResume,

    updateProfile,
    getProfile,

    createCertificate,
    updateCertificate,
    deleteCertificate,

    createEducation,
    updateEducation,
    deleteEducation,

    createExperience,
    updateExperience,
    deleteExperience,

    createLanguage,
    updateLanguage,
    deleteLanguage,

    createSkill,
    updateSkill,
    deleteSkill,
}
export default onlineResumeThunks;