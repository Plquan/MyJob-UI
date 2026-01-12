import { IMyJobFile } from "../myJobFile/myJobFileType";
import { IUser } from "../user/UserType";

export interface ICandidate {
  id: number;
  userId: number;
  provinceId?: number;
  fullName: string;
  phone?: string;
  birthday?: Date;
  gender?: number;
  maritalStatus?: number;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: IMyJobFile
  user?: IUser
}

export interface IMonthlyActivity {
  month: string;
  appliedJobs: number;
  savedJobs: number;
  followedCompanies: number;
}

export interface IUserActivityStatistics {
  appliedJobs: number;
  savedJobs: number;
  followedCompanies: number;
  monthlyActivity: IMonthlyActivity[];
}
