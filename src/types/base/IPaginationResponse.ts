export interface IPaginationResponse<T> {
    items: T[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }