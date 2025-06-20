
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
  