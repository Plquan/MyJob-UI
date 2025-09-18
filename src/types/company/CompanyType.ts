import type { IMyJobFile } from "../myJobFile/myJobFileType";

export interface ICompanyData {
    id: number;
    provinceId: number;
    userId: number;
    companyName: string;
    slug: string;
    companyEmail: string;
    companyPhone: string;
    websiteUrl?: string;
    taxCode: string;
    since?: Date;
    fieldOperation?: string;
    description?: string;
    employeeSize?: number;
    address:string
  }

  export interface ICompanyDetail {
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
    images?: IMyJobFile[];
  }