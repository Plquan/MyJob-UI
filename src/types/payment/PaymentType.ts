export interface ICreateCheckoutSessionRequest {
  packageId: number;
  successUrl: string;
  cancelUrl: string;
}

export interface ICreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

