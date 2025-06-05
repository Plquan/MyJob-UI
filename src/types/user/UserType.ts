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
    avatar?: string | null; 
    groupRoles?: number[]; 
    isSuperUser: boolean;
    isStaff: boolean;
}
