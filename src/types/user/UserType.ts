export interface IUserData {
    id: number;
    email: string;
    fullName: string;
    isVerifyEmail: boolean;
    isActive: boolean;
    roleName: string;
    createdAt: string;      
    updatedAt: string;      
    avatar?: string | null; 
    groupRoles?: number[]; 
    isSuperUser: boolean;
    isStaff: boolean;
}

export interface IPagingResponse{
  users: IUserData[];
  page: number;
  limit: number;
  totalItem: number;
}

export interface IUpdateUser{
    id: number
    email: string
    fullName: string
    password:string
    isVerifyEmail: boolean
    isActive: boolean
    groupRoles?: number[]
    isSuperUser: boolean
    isStaff: boolean
}

export interface ICreateUser{
    email: string
    fullName: string
    password:string
    isVerifyEmail: boolean
    isActive: boolean
    roleName?: string
    groupRoles?: number[]
    isSuperUser: boolean
    isStaff: boolean
}
export interface IUserFilter {
    searchKey?: string
    roleName?:string
    isActive?: boolean
    isVerifyEmail?:boolean
    page?:number
    limit?: number
 }