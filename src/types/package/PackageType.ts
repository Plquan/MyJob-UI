
export interface IPackage {
    id: number
    name: string
    description?: string
    price: number;
    durationInDays?: number;
    isActive?: boolean;
}

export interface IFeature {
    id: number;
    code: string;
    name: string;
    description?: string;
    allowLimit: boolean;
}


export interface IPackageFeature {
  featureId: number
  packageId: number
  name: string
  open: boolean
  quota?: number
  unlimited:boolean
  description?: string
}
