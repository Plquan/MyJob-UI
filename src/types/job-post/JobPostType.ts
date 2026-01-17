export interface ICompanyJobPost {
  id: number;
  careerId: number;
  companyId: number;
  provinceId: number;
  jobName: string;
  deadline?: Date;
  quantity?: number;
  jobDescription?: string;
  jobRequirement?: string;
  benefitsEnjoyed?: string;
  salaryMin: number;
  salaryMax: number;
  position: number;
  typeOfWorkPlace: number;
  experience: number;
  academicLevel: number;
  jobType: number;
  isHot: boolean;
  isUrgent: boolean;
  isActive: boolean;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  views: number;
  applications: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

export interface IJobPostFilter {
  searchKey?: string;
  status?: string;
  approvalStatus?: string;
  jobType?: string;
  experienceLevel?: string;
  location?: string;
  page: number;
  limit: number;
}

export interface ICreateJobPostReq {
  careerId: number;
  provinceId: number;
  jobName: string;
  deadline: Date;
  quantity: number;
  jobDescription: string;
  jobRequirement: string;
  benefitsEnjoyed: string;
  salaryMin: number;
  salaryMax: number;
  position: number;
  typeOfWorkPlace: number;
  experience: number;
  academicLevel: number;
  genderRequirement: number;
  jobType: number;
  isHot: boolean;
  isUrgent: boolean;
  isActive: boolean;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
}

export interface IJobPostUpdate extends Partial<ICreateJobPostReq> {
  id: number;
}

export interface IGetJobPostsReqParams {
  page: number;
  limit: number;
  search?: string;
  jobPostStatus?: number;
}

export interface IJobPost {
  id: number
  jobName: string
  provinceId: number
  company?: {
    companyName: string
    logo?: string
    coverImage?: string
    images: string[]
  }
  isSaved: boolean
  isApplied: boolean
  isNew: boolean
  deadline?: Date;
  quantity?: number;
  jobDescription?: string;
  jobRequirement?: string;
  benefitsEnjoyed?: string;
  salaryMin: number;
  salaryMax: number;
  position: number;
  typeOfWorkPlace: number;
  experience: number;
  academicLevel: number;
  genderRequirement: number;
  jobType: number;
  isHot: boolean;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  views: number;
  applications: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

export interface IApplyJobRequest {
  jobPostId: number;
  resumeId: number;
  fullName: string;
  email: string;
  phone: string;
}
