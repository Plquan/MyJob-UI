// Deprecated: IApiResponse is no longer used. Backend now returns data directly.
// export interface IApiResponse<T> {
//   status: number;
//   message: string;
//   data: T;
//   error?: {
//     message: string;
//     details: string;
//   };
//   success: boolean;
// }

export interface IPaginationResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
}