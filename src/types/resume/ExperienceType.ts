export interface IExperience {
    id: number
    resumeId: number
    jobName: string
    companyName: string
    startDate: Date
    endDate: Date
    description?: string
    createdAt: Date
    updatedAt: Date
}