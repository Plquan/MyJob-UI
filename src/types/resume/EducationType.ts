export interface IEducation {
    id: number
    resumeId: number
    degreeName: string
    major: string
    trainingPlace: string
    startDate: Date 
    completedDate?: Date 
    description?: string
}