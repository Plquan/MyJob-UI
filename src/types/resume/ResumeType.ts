
import type { ICandidate } from "../candidate/CandidateType"
import type { ICertificate } from "./CertificateType"
import type { IEducation } from "./EducationType"
import type { IExperience } from "./ExperienceType"
import type { ILanguage } from "./LanguageType"
import type { IMyJobFile } from "./MyJobType"
import type { ISkill } from "./SkillType"

  export interface IResume {
    id: number
    provinceId:number
    careerId:number
    candidateId: number
    myJobFileId: number
    title: string;
    description: string
    salaryMin: number
    salaryMax: number
    position: number
    typeOfWorkPlace: number
    experience: number
    academicLevel: number
    jobType: number
    type: string
    isActive: boolean
    myJobFile: IMyJobFile
    createdAt:Date
    updatedAt:Date
  }

  export interface IUpdateAttachedResume {
    id:number
    provinceId:number
    careerId:number
    myJobFileId: number
    title: string;
    description: string
    salaryMin: number
    salaryMax: number
    position: number
    typeOfWorkPlace: number
    experience: number
    academicLevel: number
    jobType: number
    file: File
  }

  export interface IUserInfo {
    fullName: string,
    email: string,
    avatar: IMyJobFile,
  }

  export interface IOnlineResume {
    userInfo?: IUserInfo
    resume?: IResume
    candidate?: ICandidate
    educations: IEducation[]
    certificates: ICertificate[]  
    experiences: IExperience[]
    languages: ILanguage[] 
    skills: ISkill[]
  }
