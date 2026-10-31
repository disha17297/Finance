import {
  UpiRoundUpRule,
  UpiMicroTransaction,
  MicroInvestmentPoolSummary,
  SpareChangeDestination,
} from '../types/finance';

export const DEFAULT_UPI_RULE: UpiRoundUpRule = {
  is_enabled: true,
  round_to_nearest: 50, // default round up to nearest ₹50
  accelerator_multiplier: 1, // 1x baseline
  destination: 'DIGITAL_GOLD',
  sweep_frequency: 'INSTANT',
  daily_cap: 1000,
};

export const INITIAL_UPI_TRANSACTIONS: UpiMicroTransaction[] = [
  {
    id: 'upi_tx_1',
    merchant: 'Zomato Food Delivery',
    category: 'Food & Dining',
    actual_amount: 382,
    rounded_amount: 400,
    spare_change: 18,
    multiplier: 1,
    total_swept: 18,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-31T08:24:00Z',
    status: 'swept',
  },
  {
    id: 'upi_tx_2',
    merchant: 'Uber India (Commute to Tech Park)',
    category: 'Travel & Mobility',
    actual_amount: 214,
    rounded_amount: 250,
    spare_change: 36,
    multiplier: 1,
    total_swept: 36,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-31T07:15:00Z',
    status: 'swept',
  },
  {
    id: 'upi_tx_3',
    merchant: 'Blinkit Instant Groceries',
    category: 'Groceries',
    actual_amount: 673,
    rounded_amount: 700,
    spare_change: 27,
    multiplier: 1,
    total_swept: 27,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-30T19:42:00Z',
    status: 'swept',
  },
  {
    id: 'upi_tx_4',
    merchant: 'Third Wave Coffee Roasters',
    category: 'Cafes',
    actual_amount: 265,
    rounded_amount: 300,
    spare_change: 35,
    multiplier: 1,
    total_swept: 35,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-30T11:20:00Z',
    status: 'swept',
  },
  {
    id: 'upi_tx_5',
    merchant: 'Swiggy Instamart',
    category: 'Groceries',
    actual_amount: 142,
    rounded_amount: 150,
    spare_change: 8,
    multiplier: 1,
    total_swept: 8,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-29T21:10:00Z',
    status: 'swept',
  },
  {
    id: 'upi_tx_6',
    merchant: 'Chaayos Indiranagar',
    category: 'Food & Dining',
    actual_amount: 135,
    rounded_amount: 150,
    spare_change: 15,
    multiplier: 1,
    total_swept: 15,
    destination: 'DIGITAL_GOLD',
    timestamp: '2026-10-29T16:05:00Z',
    status: 'swept',
  },
];

export const INITIAL_POOL_SUMMARIES: Record<SpareChangeDestination, MicroInvestmentPoolSummary> = {
  DIGITAL_GOLD: {
    destination: 'DIGITAL_GOLD',
    title: '24K 99.9% Digital Gold (MMTC-PAMP / Augmont)',
    total_swept_all_time: 14850,
    current_portfolio_value: 16120,
    unrealized_return_pct: 8.55,
    accumulated_units: '2.085 grams',
    yield_apr: 9.2, // historical 5-yr CAGR
  },
  LIQUID_FUND: {
    destination: 'LIQUID_FUND',
    title: 'Overnight Liquid Debt Fund (T+0 Instant Redemption)',
    total_swept_all_time: 22400,
    current_portfolio_value: 23680,
    unrealized_return_pct: 5.71,
    accumulated_units: '184.21 units',
    yield_apr: 6.85,
  },
  HIGH_YIELD_SAVINGS: {
    destination: 'HIGH_YIELD_SAVINGS',
    title: 'High-Yield Reserve Vault (7.2% APY)',
    total_swept_all_time: 31200,
    current_portfolio_value: 32940,
    unrealized_return_pct: 5.58,
    accumulated_units: '₹32,940 principal',
    yield_apr: 7.2,
  },
};

/**
 * Calculates round-up amount given a transaction amount and rule
 */
export function computeRoundUp(
  amount: number,
  rule: UpiRoundUpRule
): { rounded_amount: number; spare_change: number; total_swept: number } {
  if (amount <= 0) return { rounded_amount: 0, spare_change: 0, total_swept: 0 };
  const target = rule.round_to_nearest;
  const remainder = amount % target;
  const spareChange = remainder === 0 ? target : target - remainder;
  const roundedAmount = amount + spareChange;
  const totalSwept = spareChange * rule.accelerator_multiplier;

  return {
    rounded_amount: roundedAmount,
    spare_change: spareChange,
    total_swept: totalSwept,
  };
}
