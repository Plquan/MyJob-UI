export interface ICreateCheckoutSessionRequest {
  packageId: number;
  successUrl: string;
  cancelUrl: string;
}

export interface ICreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface IPaymentHistoryDto {
  id: number;
  companyId: number;
  packageId: number;
  price: number;
  paymentMethod?: string;
  paymentDate?: Date;
  startDate?: Date;
  endDate: Date;
  company: {
    id: number;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    taxCode: string;
    address: string;
  };
  package: {
    id: number;
    name: string;
    description?: string;
  };
}

