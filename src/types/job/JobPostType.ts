export interface IJobPost {
  id: string;
  title: string;
  companyName: string;
  companyId: string;
  description: string;
  requirements: string;
  benefits: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  experienceLevel: 'ENTRY' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';
  postedDate: string;
  deadline: string;
  applicationCount: number;
  viewCount: number;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'DRAFT';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  skills: string[];
  categories: string[];
  isUrgent: boolean;
  isRemote: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface IJobPostCreate {
  title: string;
  companyId: string;
  description: string;
  requirements: string;
  benefits: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  jobType: string;
  experienceLevel: string;
  deadline: string;
  skills: string[];
  categories: string[];
  isUrgent: boolean;
  isRemote: boolean;
}

export interface IJobPostUpdate extends Partial<IJobPostCreate> {
  id: string;
}
