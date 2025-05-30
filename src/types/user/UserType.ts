export interface IUserData {
    id: number;
    email: string;
    fullName: string;
    isVerifyEmail: boolean;
    isActive: boolean;
    isDeleted: boolean;
    roleName: string;
    createdAt: string;      
    updatedAt: string;      
    avatarId?: number;
    avatar?: string | null; 
    groupRoles: string[]; 
    isSuperUser: boolean;
    isStaff: boolean;
}

export interface IUpdateUserData extends IUserData {
    password:string,
    avatar: any
}