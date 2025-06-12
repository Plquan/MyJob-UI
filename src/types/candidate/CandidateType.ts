export interface Candidate {
    id: number;
    userId: number;
    provinceId?: number;
    phone?: string;
    birthday?: Date | null;
    gender?: string;
    maritalStatus?: string;
    address?: string;
  }
  
  export interface Education {
    id: number;
    resumeId: number;
    degreeName: string;
    major: string;
    trainingPlace: string;
    startDate: Date;
    completedDate?: Date;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Experience {
    id: number;
    jobName: string;
    companyName: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Certificate {
    id: number;
    resumeId: number;
    name: string;
    trainingPlace: string;
    startDate: Date;
    expirationDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Language {
    id: number;
    resumeId: number;
    language: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AdvancedSkill {
    id: number;
    resumeId: number;
    name: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IResumeData {
    id: number;
    candidateId: number;
    myJobFileId?: number;
    title?: string;
    description?: string;
    salary_min?: number;
    salary_max?: number;
    position?: number;
    typeOfWorkPlace?: number;
    experience?: number;
    academicLevel?: number;
    jobType?: number;
    type?: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
    candidate: Candidate;
    educations: Education[];
    certificates: Certificate[];
    experiences: Experience[];
    languages: Language[];
    advancedSkills: AdvancedSkill[];
  }
  