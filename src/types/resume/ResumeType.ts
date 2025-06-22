import type { IMyJobFile } from "./MyJobType"




  export interface IResume {
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
    myJobFile: IMyJobFile
    createdAt:Date
    updatedAt:Date
  }
  
  
  export interface IUploadAttachedResume {
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
    file: File
  }
  