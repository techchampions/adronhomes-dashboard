export interface ERPContractsSyncState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: {
    status: boolean;
    message: string;
    contract_ids: {
      linkedContracts: string[];
      erpContracts: Array<{
        id: number;
        customerName: string;
        customerCode: string;
        dateOfBirth: string;
        userId: number;
        propertyId: number | null;
        contractId: string;
        customerAddress: string;
        contractDate: string;
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
        fullPayment: string;
        fullPaymentDate: string | null;
        quantity: string;
        propertyCost: string;
        propertyDiscount: string;
        propertyNetValue: string;
        propertyTenor: number;
        firstPaymentDate: string;
        lastPaymentDate: string;
        propertyBranch: string;
        currentbalance: string;
        created_at: string;
        updated_at: string;
      }>;
      query: Record<string, unknown>;
    };
  } | null;
}