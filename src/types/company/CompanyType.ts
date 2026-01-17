import type { ICompanyJobPost } from "../job-post/JobPostType";
import type { IMyJobFile } from "../myJobFile/myJobFileType";

export interface ICompanyData {
  id: number;
  provinceId?: number;
  userId: number;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  websiteUrl?: string;
  youtubeUrl?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
  taxCode: string;
  since?: Date;
  fieldOperation?: string;
  description?: string;
  employeeSize?: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyWithImagesData {
  company: ICompanyData
  images?: IMyJobFile[]
  isFollowed: boolean
}

export interface IUpdateCompanyRequest {
  id: number;
  provinceId: number;
  userId: number;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  websiteUrl?: string;
  youtubeUrl?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
  taxCode: string;
  since?: Date;
  fieldOperation?: string;
  description?: string;
  employeeSize?: number;
  address: string;
}

export interface ICompanyDetail extends ICompanyWithImagesData {
  jobPosts?: ICompanyJobPost[];
}

export interface IGetCompaniesReqParams {
  page: number;
  limit: number;
  companyName?: string;
  provinceId?: number;
}

export interface IUpdateCompanyInfoRequest {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  taxCode: string;
  provinceId: number;
  address: string;
  description?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  linkedInUrl?: string;
  since?: string;
  fieldOperation?: string;
  employeeSize?: number;
}

export interface ICompanyStatistics {
  totalJobPosts: number;
  pendingJobPosts: number;
  expiredJobPosts: number;
  totalApplications: number;
  applicationsByStatus: IApplicationByStatus[];
  applicationsMonthly: IApplicationMonthly[];
}

export interface IApplicationByStatus {
  status: number;
  statusName: string;
  count: number;
}

export interface IApplicationMonthly {
  month: string;
  year2024: number;
  year2023: number;
}

export interface IGetEmployerStatisticsRequest {
  startDate?: string;
  endDate?: string;
}
