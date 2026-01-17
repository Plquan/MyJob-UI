
export interface IPackageDto {
  id: number;
  name: string;
  price: number;
  durationInDays: number;
  jobHotDurationInDays: number;
  highlightCompanyDurationInDays: number;
  candidateSearchLimit: number;
  cvSearchLimit: number;
  jobPostLimit: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface ICreatePackagedata {
  name: string;
  price: number;
  durationInDays: number;
  jobHotDurationInDays?: number;
  highlightCompanyDurationInDays?: number;
  candidateSearchLimit?: number;
  cvSearchLimit?: number;
  jobPostLimit?: number;
  description?: string;
}

export interface IUpdatePackageData extends Partial<ICreatePackagedata> {
  id: number;
  isActive: boolean;
}

export interface IPackageUsage {
  id: number;
  packageId: number;
  companyId: number;
  candidateSearchRemaining: number;
  jobPostRemaining: number;
  createdAt: Date;
  updatedAt: Date;
  package: IPackageDto;
  expiryDate: Date;
}