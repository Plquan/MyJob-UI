
export interface IPackage {
    id: number
    name: string
    price: number;
    durationInDays: number;
    isActive?: boolean;
}

export interface IFeature {
    id: number;
    name: string;
}
export interface IPackagesWithFeatures extends IPackage {
   features: string[]
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
