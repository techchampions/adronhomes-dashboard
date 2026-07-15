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

interface BuyPropertyPayload {
  marketer_code: string;
  citta_id: string;
  contract_business_type: string;
  contract_business_type_code: string;

  contract_title: string;

  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name?: string;

  contract_marital_status: string;
  contract_marital_status_code: string;
  contract_gender: string;
  contract_gender_code: string;
  contract_date_of_birth: string; // YYYY-MM-DD
  contract_nationality: string;

  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;
  contract_country_code: string;

  contract_email: string;
  contract_sms: string; // phone with country code

  contract_employer_address: string;
  contract_occupation: string;
  contract_employer_phone: string;
  contract_employer: string;

  contract_next_of_kin_phone: string;
  contract_next_of_kin: string;
  contract_next_of_kin_relationship: string;
  contract_next_of_kin_address: string;

  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  contract_id_files: File[] | null;
  means_of_ids: File[] | null;

  property_size: string; // e.g., "600 sqm"

  monthly_duration: string; // e.g., "12 months"
  repayment_schedule: string; // e.g., "Monthly"
  payable_amount: number;
  payment_method: string; // e.g., "interswitch"
  payment_type: number; // e.g., 1
  paid_amount: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD

  purpose: string; // e.g., "Residential"
  contract_purpose_code: string;
  contract_purpose_name: string;
  contract_purpose: string;
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

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface SectionRouteType {
  id: string;
  label: string;
  helper: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}
interface CommunityOutletContext {
  data?: EstateDashboardData;
}
interface CommunityEstate {
  id: number;
  estate_name: string;
  property_slug: string;
  is_operating: number;
  total_member: number;
  created_at: string;
}

// types/estate-dashboard.types.ts

// ============ Estate Info ============
interface EstateInfo {
  id: number;
  name: string;
  slug: string;
  group_unread: number;
  total_unread: number;
  total_members: number;
  is_operating: number; // 0 or 1
}

// ============ User Info ============
interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
}

// ============ Ownership and Balances ============
interface OwnershipAndBalances {
  property_type: number;
  payment_type: string; // "1", "2", etc.
  remaining_balance: number;
  paid_amount: number;
}

// ============ Payment ============
interface EstatePayment {
  id: number;
  user_id: number;
  estate_id: number;
  description: string;
  payment_method: string;
  payment_type: string;
  reference: string;
  status: number; // 0 = pending, 1 = success, etc.
  purpose: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  chargeable_id: number;
  user_first_name: string;
  user_last_name: string;
  user_profile_picture: string | null;
}

// ============ Pagination Links ============
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// ============ Paginated Response ============
interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

// ============ Access Code ============
interface AccessCode {
  id: number;
  estate_id: number;
  name: string;
  code: string;
  expired_at: string; // ISO datetime string
  limit: number;
  total_used: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  user_id: number;
}

// ============ Conversation ============
interface Conversation {
  id: number;
  type: string; // "admin", "user", etc.
  estate_id: number;
  last_message: string;
  channel: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  sender: number;
  receiver: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}
interface Message {
  id: number;
  type: string; // "admin", "user", etc.
  estate_id: number;
  message: string;
  channel: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  sender: number;
  receiver: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}

// ============ Utility ============
interface Utility {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

// ============ Maintenance Request ============
interface MaintenanceRequest {
  id: number;
  title?: string;
  content?: string;
  priority?: "High" | "Medium" | "Low";
  status?: "Pending" | "Assigned" | "Resolved";
  created_at?: string;
  updated_at?: string;
}
interface GroupConversation {
  channel: string;
  created_at: string;
  estate_id: string;
  id: number;
  last_message: string;
  updated_at: string;
}
// ============ Complete Dashboard Data ============
interface EstateDashboardData {
  estate_info: EstateInfo;
  user_info: UserInfo;
  ownership_and_balances: OwnershipAndBalances;
  recent_payments: PaginatedResponse<EstatePayment>;
  active_access_codes: PaginatedResponse<AccessCode>;
  maintenance_requests: PaginatedResponse<MaintenanceRequest>;
  conversations: PaginatedResponse<Conversation>;
  group_conversation: GroupConversation;
  utilities: Utility[];
}

// ============ Complete API Response ============
type EstateDashboardResponse = ApiResponse<EstateDashboardData>;

// ============ For use in components ============
interface EstateDashboardProps {
  estateId: number;
  data?: EstateDashboardData;
  isLoading?: boolean;
  error?: string | null;
}

// ============ Helper Types for Filters ============
interface DashboardFilters {
  page?: number;
  per_page?: number;
  payment_type?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// ============ Statistics Summary ============
interface DashboardStatistics {
  totalMembers: number;
  totalPaid: number;
  remainingBalance: number;
  totalAccessCodes: number;
  activeAccessCodes: number;
  totalConversations: number;
  unreadConversations: number;
  totalMaintenanceRequests: number;
  pendingMaintenanceRequests: number;
}

// ============ Chart/Graph Data ============
interface PaymentChartData {
  labels: string[]; // months or dates
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

interface PaymentSummary {
  total_paid: number;
  total_remaining: number;
  payment_status: {
    completed: number;
    pending: number;
    failed: number;
  };
  recent_payments: Payment[];
}
interface RequestPaylaod {
  estate_id?: number;
  title: string;
  content: string;
  priority: string;
  attached: File | null;
}
interface UtitlityPayload {
  estate_id: number;
  amount: number;
  payment_type: string;
  payment_method: string;
  chargeable_id: string;
}
interface AccessCodePayload {
  estate_id: number;
  name: string;
  access_type: string;
  expiry_date: string;
}

interface UtilityPaymentResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    estate_id: number;
    description: string;
    payment_method: string;
    payment_type: string;
    reference: string;
    status: number;
    purpose: string;
    created_at: string;
    updated_at: string;
    chargeable_id: number;
    user_first_name: string;
    user_last_name: string;
    user_profile_picture: string;
  };
}

interface SendMessagePayload {
  receiver_id: number;
  estate_id: number;
  message: string;
}
interface SendGroupMessagePayload {
  estate_id: number;
  message: string;
}
interface GroupMessage {
  channel: string;
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  message: string;
  user_id: number;
  profile_picture: string;
}
interface GroupMessageResponse {
  conversation: GroupConversation;
  messages: PaginatedResponse<GroupMessage>;
}
interface Slides {
  image: string;
  text?: string;
}
