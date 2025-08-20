export interface IFunctions {
    name: string;
    displayName: string;
    checked: boolean;
  }
  
  export interface IGroupRoles{
    id: number;
    name: string;
    displayName: string;
    functions: IFunctions[];
  }
  