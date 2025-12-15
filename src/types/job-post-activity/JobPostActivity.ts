import type { IResume } from "../resume/ResumeType";

export interface IJobPostActivityDto {
    id: number
    jobPostId: number
    resumeId?: number
    candidateId: number
    fullName?: string
    email?: string
    phone?: string
    status: number
    isSentMail: boolean
    createdAt: Date
    updatedAt: Date
    resume?: IResume
}
export interface IGetJobPostActivityRequest {
    page: number
    limit: number
    search?: string
    status?: number
}
