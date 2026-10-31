export type TransactionType = 'DEBIT' | 'CREDIT';

export type PaymentChannel = 'UPI' | 'NEFT' | 'RTGS' | 'IMPS' | 'CARD' | 'NET_BANKING' | 'CASH';

export interface ReceiptItem {
  name: string;
  amount: number;
  category: string;
}

export interface Transaction {
  transaction_id: string;
  user_id: string;
  raw_text: string;
  amount: number;
  currency: string;
  type: TransactionType;
  merchant: string;
  category_primary: string;
  category_secondary: string;
  payment_channel: PaymentChannel;
  timestamp: string; // ISO date
  is_recurring: boolean;
  confidence_score: number;
  account_last4?: string;
  itemized_items?: ReceiptItem[];
  applied_rule_id?: string;
}

export interface CorrectionRule {
  rule_id: string;
  merchant_pattern: string;
  match_type: 'exact' | 'contains' | 'regex' | 'amount_range';
  min_amount?: number;
  max_amount?: number;
  time_pattern?: string;
  old_category: string;
  new_category: string;
  secondary_category?: string;
  created_at: string;
  applied_count: number;
}

export interface RecurringSubscription {
  id: string;
  merchant: string;
  category: string;
  amount_current: number;
  amount_baseline: number;
  frequency_days: number; // e.g. ~30 days
  last_billed_date: string;
  next_expected_date: string;
  is_price_creep: boolean;
  price_creep_pct: number;
  is_dormant: boolean;
  dormant_days: number;
  status: 'active' | 'flagged' | 'paused' | 'cancelled';
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT' | 'CREDIT_CARD' | 'LOAN';
  balance: number; // positive for assets, negative for credit/loan balance
  is_liquid: boolean;
  apy?: number;
  interest_rate?: number;
  account_number_mask: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string; // YYYY-MM
  priority: 'high' | 'medium' | 'low';
  category: 'EMERGENCY' | 'HOME' | 'RETIREMENT' | 'EDUCATION' | 'VACATION';
}

export interface IncomeStream {
  id: string;
  source: string;
  amount: number;
  frequency: 'MONTHLY' | 'BIWEEKLY' | 'IRREGULAR';
  payout_day_of_month: number;
}

export interface FixedLiability {
  id: string;
  name: string;
  amount: number;
  due_day_of_month: number;
  category: 'RENT' | 'EMI' | 'UTILITIES' | 'INSURANCE';
}

export interface UserFinancialProfile {
  user_id: string;
  name: string;
  currency: string;
  monthly_salary: number;
  other_income: number;
  fixed_monthly_costs: number;
  discretionary_spend_baseline: number;
  accounts: FinancialAccount[];
  goals: FinancialGoal[];
  subscriptions: RecurringSubscription[];
  income_streams: IncomeStream[];
  fixed_liabilities: FixedLiability[];
  emergency_cushion_target_months: number;
  sweep_threshold_multiplier: number; // e.g. 1.5x fixed costs
  liquid_overdraft_buffer_min: number; // e.g. 15,000 INR
}

export interface FinancialHealthMetrics {
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  liquid_assets: number;
  monthly_fixed_costs: number;
  monthly_discretionary_baseline: number;
  monthly_total_income: number;
  monthly_survival_burn_rate: number;
  survival_runway_months: number;
  liquidity_ratio: number;
  creeping_subscriptions_count: number;
  dormant_subscriptions_count: number;
}

export interface ScenarioDeltas {
  rent_hike_pct: number; // e.g. 15% -> 0.15
  salary_shift_pct: number; // e.g. 20% -> 0.20
  discretionary_cut_pct: number; // e.g. -30% -> -0.30
  emergency_shock_amount: number; // e.g. 1000000
  emergency_shock_month: number; // month index when shock occurs (e.g. month 3)
  discretionary_volatility: number; // sigma_S, default 0.20
  annual_inflation: number; // pi, default 0.06
  annual_liquid_yield: number; // r, default 0.075
}

export interface SimulationTrajectoryPoint {
  month: number;
  date_label: string;
  p10_conservative: number;
  p50_median: number;
  p90_optimistic: number;
  baseline_net_worth: number;
  monthly_surplus_median: number;
}

export interface SimulationResult {
  run_timestamp: string;
  iterations_count: number;
  parameters: ScenarioDeltas;
  trajectory_24m: SimulationTrajectoryPoint[];
  goal_success_rate: number; // 0 to 100%
  projected_completion_date: string;
  monthly_net_surplus: number;
  runway_months: number;
  key_risks: string[];
}

export type CoachPersona = 'analytical' | 'empathetic' | 'bootcamp';

export interface CoachMessage {
  id: string;
  sender: 'user' | 'coach' | 'system';
  persona?: CoachPersona;
  content: string;
  timestamp: string;
  compliance_checked?: boolean;
  flagged_security_terms?: string[];
  reframed_from_security?: boolean;
  suggested_actions?: string[];
}

export interface LiquiditySweepStatus {
  is_eligible: boolean;
  checking_balance: number;
  fixed_monthly_expenses: number;
  threshold_amount: number; // e.g. 1.5 * fixed_monthly_expenses
  excess_amount: number;
  suggested_destination: string;
  last_sweep_date?: string;
}

export interface OverdraftAlert {
  is_risk_detected: boolean;
  lowest_projected_balance: number;
  critical_date: string;
  deficit_amount: number;
  recommended_transfer_amount: number;
  source_account_name: string;
  target_account_name: string;
}

// -----------------------------------------------------------------------------
// Tax Loss Harvesting & FY Optimization Types
// -----------------------------------------------------------------------------
export type AssetClassType = 'EQUITY' | 'MUTUAL_FUND' | 'ETF' | 'REIT';

export interface TaxPortfolioHolding {
  id: string;
  name: string;
  ticker: string;
  asset_class: AssetClassType;
  quantity: number;
  avg_buy_price: number;
  current_price: number;
  invested_value: number;
  current_value: number;
  holding_days: number;
  gain_loss_amount: number;
  gain_loss_pct: number;
  is_long_term: boolean; // >= 365 days for listed equities in India
  recommended_replacement: {
    name: string;
    ticker: string;
    correlation_score: number;
    rationale: string;
  };
  harvest_eligible: boolean;
  status: 'available' | 'harvested';
}

export interface CapitalGainsSummary {
  financial_year: string;
  realized_stcg: number; // Short-term capital gains @ 20%
  realized_ltcg: number; // Long-term capital gains @ 12.5% (exemption ₹1.25L)
  realized_stcl: number; // Realized short-term capital loss
  realized_ltcl: number; // Realized long-term capital loss
  total_tax_before_harvest: number;
  potential_tax_savings: number;
  realized_tax_savings: number;
  days_until_fy_end: number;
}

// -----------------------------------------------------------------------------
// Old vs New Tax Regime Types (Indian Tax Slabs FY 2024-25 / 2025-26)
// -----------------------------------------------------------------------------
export interface TaxRegimeInputs {
  gross_annual_income: number;
  section_80c: number; // max 150000 (PPF, EPF, ELSS)
  section_80d: number; // health insurance (up to 75000 with parents)
  section_80ccd_1b: number; // NPS additional (up to 50000)
  annual_rent_paid: number;
  is_metro: boolean;
  section_24b_home_loan_interest: number; // max 200000
  other_deductions_chapter_via: number;
}

export interface TaxRegimeBreakdown {
  regime: 'OLD' | 'NEW';
  gross_income: number;
  standard_deduction: number;
  total_exemptions_deductions: number;
  net_taxable_income: number;
  base_tax: number;
  rebate_87a: number;
  surcharge: number;
  health_education_cess: number;
  total_tax_payable: number;
  effective_tax_rate: number;
  slab_breakdown: { slab: string; rate: string; tax: number }[];
}

export interface TaxRegimeComparison {
  old_regime: TaxRegimeBreakdown;
  new_regime: TaxRegimeBreakdown;
  recommended_regime: 'OLD' | 'NEW';
  tax_delta: number; // positive = amount saved by picking recommendation
  break_even_deductions: number;
  actionable_recommendations: string[];
}

// -----------------------------------------------------------------------------
// UPI Spare Change & Micro-Rounding Types
// -----------------------------------------------------------------------------
export type RoundUpTarget = 10 | 50;
export type SpareChangeDestination = 'DIGITAL_GOLD' | 'LIQUID_FUND' | 'HIGH_YIELD_SAVINGS';
export type SweepFrequency = 'INSTANT' | 'DAILY_MIDNIGHT' | 'WEEKLY_SUNDAY';

export interface UpiRoundUpRule {
  is_enabled: boolean;
  round_to_nearest: RoundUpTarget;
  accelerator_multiplier: 1 | 2 | 3; // e.g. 2x spare change
  destination: SpareChangeDestination;
  sweep_frequency: SweepFrequency;
  daily_cap: number; // max sweep per day (e.g. ₹500)
}

export interface UpiMicroTransaction {
  id: string;
  merchant: string;
  category: string;
  actual_amount: number;
  rounded_amount: number;
  spare_change: number;
  multiplier: number;
  total_swept: number;
  destination: SpareChangeDestination;
  timestamp: string;
  status: 'swept' | 'pending';
}

export interface MicroInvestmentPoolSummary {
  destination: SpareChangeDestination;
  title: string;
  total_swept_all_time: number;
  current_portfolio_value: number;
  unrealized_return_pct: number;
  accumulated_units: string; // e.g. "0.412 grams" or "128.4 units"
  yield_apr: number;
}

// -----------------------------------------------------------------------------
// Alternative Asset Micro-Investing (Fractional Ownership)
// -----------------------------------------------------------------------------
export type AltAssetCategory = 'COMMERCIAL_REAL_ESTATE' | 'INVOICE_DISCOUNTING' | 'CORPORATE_BOND';

export interface AlternativeAsset {
  id: string;
  title: string;
  category: AltAssetCategory;
  category_label: string;
  min_ticket_size: number;
  target_pre_tax_irr: number;
  rental_or_interest_yield: number;
  tenure_months: number;
  credit_or_asset_rating: string;
  rating_agency?: string;
  location_or_borrower: string;
  tenant_or_anchor: string;
  payout_frequency: 'MONTHLY' | 'QUARTERLY' | 'AT_MATURITY';
  regulatory_status: string; // e.g., "SEBI Regulated SM-REIT / RBI Regulated Escrow"
  funded_percentage: number;
  days_left: number;
  description: string;
  risk_level: 'LOW_MODERATE' | 'MODERATE' | 'MODERATE_HIGH';
  key_highlights: string[];
}

export interface UserAltInvestment {
  id: string;
  asset_id: string;
  asset_title: string;
  invested_amount: number;
  invested_date: string;
  expected_annual_return: number;
  accrued_payouts: number;
  next_payout_date: string;
  current_valuation: number;
}

// -----------------------------------------------------------------------------
// Vernacular Financial Literacy & Jargon Breakdown
// -----------------------------------------------------------------------------
export type RegionalLanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'kn';

export interface VernacularLanguage {
  code: RegionalLanguageCode;
  label: string;
  native_name: string;
  flag_or_badge: string;
}

export interface VernacularModule {
  id: string;
  title: Record<RegionalLanguageCode, string>;
  topic: string;
  duration_seconds: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: Record<RegionalLanguageCode, string>;
  script_transcript: Record<RegionalLanguageCode, string>;
  key_takeaways: Record<RegionalLanguageCode, string[]>;
  audio_narrative_text: Record<RegionalLanguageCode, string>;
  quiz: {
    question: Record<RegionalLanguageCode, string>;
    options: Record<RegionalLanguageCode, string[]>;
    correct_option_index: number;
    explanation: Record<RegionalLanguageCode, string>;
  };
}

export interface JargonTerm {
  term: string;
  short_acronym?: string;
  category: 'INVESTMENT' | 'DEBT' | 'TAX' | 'WEALTH';
  simple_everyday_analogy: string;
  technical_definition: string;
  indian_regulatory_context: string;
  who_is_it_for: string;
  risk_reward_summary: string;
  tags: string[];
}
