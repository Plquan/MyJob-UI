import { EJobPostActivityStatus } from "@/enums/job-post-activity/EJobPostActivity";
import type { IResume } from "../resume/ResumeType";
import type { IJobPost } from "../job-post/JobPostType";

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

export interface ISendEmailRequest {
    jobPostActivityId: number
    to: string
    subject: string
    content: string
}

export interface updateJobPostActivityStatusRequest {
    jobPostActivityId: number
    status: EJobPostActivityStatus
}

export interface IAppliedJob {
    id: number;
    jobPostId: number;
    candidateId: number;
    fullName?: string;
    email?: string;
    phone?: string;
    status: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    jobPost: IJobPost;
}

export interface IGetAppliedJobsRequest {
    page: number;
    limit: number;
    status?: number;
}

export interface IAppliedJobsResponse {
    items: IAppliedJob[];
    totalItems: number;
    totalPages: number;
}