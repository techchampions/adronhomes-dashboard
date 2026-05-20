declare module "*.css";
// src/global.d.ts

//  {};

// declare global {
//   interface Window {
//     Tawk_API?: {
//       showWidget: () => void;
//       hideWidget: () => void;
//       maximize: () => void;
//       minimize: () => void;
//       toggle: () => void;
//       popup: () => void;
//       onLoad: (callback: () => void) => void;
//       // Add other methods you plan to use
//     };
//     Tawk_LoadStart?: Date;
//   }
// }

interface UserAccount {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
}
interface MutipleAccountResponse {
  success: boolean;
  accounts: UserAccount[];
}
interface SwitchAccountResponse {
  success: boolean;
  token: string;
  account: UserAccount;
}
interface SwitchAccountPayload {
  customer_code: string;
  email?: string;
  password?: string;
}
interface LoginSelectAccountPayload {
  customer_code: string;
  email: string;
  password: string;
}

// Item within a reward group
interface RewardItem {
  item_id: string;
  name: string;
  qty: number;
}

// Reward group containing multiple items with logic
interface RewardGroup {
  id: number;
  logic: "AND" | "OR"; // Logic operator for combining items
  items: RewardItem[];
}

// Individual gift/promo tier
interface EligibleGift {
  promo_id: number;
  promo_name: string;
  tier_id: number;
  is_claimed: boolean;
  gift_request: GiftRequest;
  unlocked_by: string; // Formatted currency string (e.g., "₦10,000")
  reward_groups: RewardGroup[];
}

// Main type for the eligible_gifts array
type EligibleGifts = EligibleGift[];

// Or if it's part of a larger response object
type TransactionStatus = 0 | 1 | 2;

interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
}

interface Transaction {
  id: number;
  property_id: number;
  user_id: number;
  plan_id: number;
  amount: number;
  amount_paid: number;
  description: string;
  transaction_type: string;
  payment_type: string;
  transaction_method: string;
  reference: string;
  created_at: string | null;
  updated_at: string | null;
  status: TransactionStatus | null;
  property: Property;
  bank_name: string;
  beneficiary_name: string;
  purpose: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface UserTransactions {
  current_page: number;
  data: Transaction[];
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

interface UserTransactionResponse {
  success: boolean;
  wallet_balance: number;
  total_invoice: number;
  total_amount_paid: number;
  user_transactions: UserTransactions;
}

interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
  has_gifts: boolean;
  promotions: Promotion;
}

interface UserProperty {
  id: number;
  property_id: number;
  user_id: number;
  property_type: number;
  total_amount: number;
  paid_amount: number;
  remaining_balance: number;
  status: number;
  type: number;

  payment_percentage: number;
  payment_completed_at: string | null;
  created_at: string;
  updated_at: string;
  monthly_duration: string;
  payment_type: string;
  end_date: string;
  start_date: string;
  payment_method: string | null;
  repayment_schedule: string;
  next_payment_date: string;
  property: Property;
  property_plan: null;
  eligible_gifts: EligibleGifts;
}

interface PropertyBreakdown {
  type_id: number;
  type_name: string;
  count: number;
}

interface TotalProperty {
  total: number;
  breakdown: PropertyBreakdown[];
}

interface UserDashboardResponseData {
  success: boolean;
  wallet_balance: number;
  total_property: TotalProperty;
  total_invoice: number;
  total_amount_paid: number;
  user_properties: UserProperty[];
  user_transactions: Transaction[];
}

// Pivot relationship between property and promotion
interface PromotionPivot {
  property_id: number;
  promotion_id: number;
}

// Individual reward item
interface RewardItem {
  id: number;
  reward_group_id: number;
  item_name: string;
  qty: number;
  item_id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Reward group containing multiple items with logic
interface RewardGroup {
  id: number;
  promo_tier_id: number;
  logic: "AND" | "OR";
  created_at: string;
  updated_at: string;
  items: RewardItem[];
}

// Promotion tier (reward level)
interface PromotionTier {
  id: number;
  name: string;
  trigger_amount: number | null;
  percentage: number | null;
  created_at: string;
  updated_at: string;
  promotion_id: number;
  reward_groups: RewardGroup[];
}

// Main promotion object
interface Promotion {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_active: number; // 1 for active, 0 for inactive (could be boolean)
  pivot: PromotionPivot;
  tiers: PromotionTier[];
}

// Array of promotions
type Promotions = Promotion[];

// If part of a larger response object
interface GiftRequest {
  id: number;
  user_id: number;
  promo_id: number;
  property_id: number;
  user_note: string;
  status: "pending" | "approved" | "rejected"; // Add other statuses as needed
  processed_at: string | null;
  created_at: string;
  updated_at: string;
  reward_group_id: number;
  items: GiftRequestItem[];
  logic: "AND" | "OR";
}

interface GiftRequestItem {
  item_id: string;
  name: string;
  qty: number;
}

interface VerifyMarketerResponse {
  success: boolean;
  user: {
    first_name: string;
  };
}
interface UserExistsResponse {
  success: boolean;
  message: string;
}

interface subscribePayload {
  marketID: string;
  property_id?: number;
  plan_id?: number;
  payment_type?: number;
  monthly_duration?: number;
  repayment_schedule?: string | number;
  start_date?: string;
  end_date?: string;
  paid_amount?: number;
  payment_method?: string;
  marketer_code?: string;
  purpose?: string;
  number_of_unit?: number;
  proof_of_payment?: File;
  bank_name?: string;
  fdf: string;
  // Add contract details fields
  contract_business_type?: string;
  contract_subscriber_name_1?: string;
  contract_subscriber_name_2?: string;
  contract_subscriber_name_3?: string;
  contract_additional_name?: string;
  contract_marital_status?: string;
  contract_gender?: string;
  contract_date_of_birth?: string;
  contract_nationality?: string;
  contract_residential_address?: string;
  contract_town?: string;
  contract_state?: string;
  contract_country?: string;
  contract_email?: string;
  contract_sms?: string;
  contract_employer_address?: string;
  contract_occupation?: string;
  contract_employer?: string;
  contract_next_of_kin_phone?: string;
  contract_next_of_kin_address?: string;
  contract_next_of_kin?: string;
  contract_next_of_kin_relationship?: string;
  contract_profile_picture?: File | null;
  contract_profile_picture_2?: File | null;
  means_of_ids?: File[] | null;
}

interface RealEstatePayload {
  marketID: string;
  contract_business_type: string;

  contract_title: string;

  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name?: string;

  contract_marital_status: string;
  contract_gender: string;
  contract_date_of_birth: string; // YYYY-MM-DD
  contract_nationality: string;

  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;

  contract_email: string;
  contract_sms: string; // phone with country code

  contract_employer_address: string;
  contract_occupation: string;
  contract_employer_phone: string;
  contract_employer: string;

  contract_next_of_kin_phone: string;
  contract_next_of_kin_name: string;
  contract_next_of_kin_relationship: string;

  contract_branch_name: string;
  contract_branch_code: string;

  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  contract_id_files: File[] | null;

  land_size: string; // e.g., "600 sqm"

  payment_duration: string; // e.g., "12 months"
  payment_schedule: string; // e.g., "Monthly"
  payable_amount: number;
  payment_method: string; // e.g., "interswitch"
  payment_type: number; // e.g., 1
  paid_amount: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD

  property_purpose: string; // e.g., "Residential"
  longitude: number;
  latitude: number;
  property_id: string;
  reference: string;
  number_of_unit: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
interface BusinessType {
  pCode: string;
  pName: string;
}
