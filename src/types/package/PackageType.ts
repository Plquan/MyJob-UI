export interface IPackageFeature {
    id: number
    packageId: number
    featureId: number
    limit: number
    hasLimit: boolean
    description: string
  }

export interface IPackageType {
    id: number;
    code: string;
    name: string;
    description?: string;
}

export interface IPackage {
    id: number
    name: string
    description?: string
    packageTypeId: number
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


export interface IFeatureOfPackage {
  featureId: number
  packageId: number
  name: string;
  open: boolean;
  limit?: number;
  description?: string;
}
