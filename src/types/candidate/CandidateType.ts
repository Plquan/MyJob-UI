import type { IDistrict, IProvince } from "../province/ProvinceType"

export interface ICandidate {
  id: number
  userId: number
  provinceId?: number 
  districtId?: number
  phone?: string 
  birthday?: Date
  gender?: number
  maritalStatus?: number
  address?: string 

  province?: IProvince
  district?: IDistrict
}
