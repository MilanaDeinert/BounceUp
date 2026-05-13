export interface Availability {
  date: string;       // ISO date string
  productId: string;
  available: boolean;
}

export interface AvailabilityQuery {
  productId?: string;
  from: string;
  to: string;
}
