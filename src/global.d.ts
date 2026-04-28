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
  unlocked_by: string; // Formatted currency string (e.g., "₦10,000")
  reward_options: RewardGroup[];
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
