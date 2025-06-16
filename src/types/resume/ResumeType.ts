import type { IDistrict, IProvince } from "../province/ProvinceType"

export interface ICandidateData {
    id: number
    userId: number
    provinceId?: number 
    districtId?: number
    phone?: string 
    birthday?: Date
    gender?: number
    maritalStatus?: number
    address?: string 

    province?: IProvince
    district?: IDistrict
  }
  
  export interface IEducationData {
    id: number
    resumeId: number
    degreeName: string
    major: string
    trainingPlace: string
    startDate: Date 
    completedDate?: Date 
    description?: string
    createdAt: Date 
    updatedAt: Date 
  }
  
  export interface IExperienceData {
    id: number
    jobName: string
    companyName: string
    startDate: Date
    endDate: Date
    description?: string
    createdAt: Date
    updatedAt: Date 
  }
  
  export interface ICertificateData {
    id: number
    resumeId: number
    name: string
    trainingPlace: string
    startDate: Date | string
    expirationDate?: Date 
    createdAt: Date 
    updatedAt: Date 
  }
  
  export interface ILanguageData {
    id: number
    resumeId: number
    language: number
    level: number
    createdAt: Date
    updatedAt: Date
  }
  
  export interface IAdvancedSkillData {
    id: number
    resumeId: number
    name: string
    level: number
    createdAt: Date
    updatedAt: Date 
  }
  
  export interface IResumeData {
    id: number
    provinceId:number
    careerId:number
    candidateId: number
    myJobFileId?: number
    title?: string;
    description?: string
    salaryMin?: number
    salaryMax?: number
    position?: number
    typeOfWorkPlace?: number
    experience?: number
    academicLevel?: number
    jobType?: number
    type?: string
    isActive: boolean
    createdAt:Date
    updatedAt:Date
  }
  
  export interface IResumeResponseData {
    resume: IResumeData
    candidate: ICandidateData
    educations: IEducationData[]
    certificates: ICertificateData[]
    experiences: IExperienceData[]
    languages: ILanguageData[]
    advancedSkills: IAdvancedSkillData[]
  }
  