export interface IFunctionData {
    id:number
    name: string;
}

export interface IRoleData {
    id:number,
    name:string,
    description:string,
    functionId:number[]
}

export interface ICreateRoleData {
name: string;
description?: string;
}

export interface IUpdateRoleData {
id:number
name: string;
description?: string;
}

export interface IUpdateRolePermission{
    roleId: number;
    functionIds: number[];
  }