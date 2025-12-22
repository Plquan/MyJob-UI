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
}

