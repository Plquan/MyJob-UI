export interface ICertificate {
  id: number
  resumeId: number
  name: string
  trainingPlace: string
  startDate: Date
  expirationDate?: Date
  createdAt: Date
  updatedAt: Date
}
