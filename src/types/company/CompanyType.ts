import type { ICompanyJobPost } from "../job-post/JobPostType";
import type { IMyJobFile } from "../myJobFile/myJobFileType";

export interface ICompanyData {
  id: number;
  provinceId?: number;
  districtId?: number;
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
  districtId: number;
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

