export interface IProvince {
    id: number;
    code: number;
    name: string;
}


export interface IDistrict {
    id: number;
    provinceId: number;
    name: string;
  }
  