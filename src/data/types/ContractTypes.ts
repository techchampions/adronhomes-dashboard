export interface ContractApiResponse {
  success: boolean;
  data: PaginatedContractsResponse;
}

// Paginated Contracts Response
export interface PaginatedContractsResponse {
  current_page: number;
  data: Contract[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Individual Contract Type
export interface Contract {
  id: number;
  customerName: string;
  customerCode: string;
  dateOfBirth: string; // Format: "DD/MM/YYYY"
  userId: number;
  propertyId: number;
  contractId: string;
  customerAddress: string;
  contractDate: string | null;
  propertyEstate: string;
  propertyName: string;
  customerTown: string;
  customerState: string;
  customerEmail: string;
  customerPhone: string;
  customerSMSPhone: string;
  customerTitle: string;
  customerGender: string;
  customerMarital: string;
  fullPayment: "Y" | "N";
  fullPaymentDate: string | null;
  quantity: string;
  propertyCost: string;
  propertyDiscount: string;
  propertyNetValue: string;
  propertyTenor: number;
  firstPaymentDate: string | null;
  lastPaymentDate: string | null;
  propertyBranch: string;
  currentbalance: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

// Pagination Link Type
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
