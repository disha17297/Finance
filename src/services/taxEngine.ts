import {
  TaxPortfolioHolding,
  CapitalGainsSummary,
  TaxRegimeInputs,
  TaxRegimeBreakdown,
  TaxRegimeComparison,
} from '../types/finance';

// -----------------------------------------------------------------------------
// Initial Portfolio Holdings for Tax-Loss Harvesting Scanner
// -----------------------------------------------------------------------------
export const INITIAL_TAX_HOLDINGS: TaxPortfolioHolding[] = [
  {
    id: 'hold_tatamotors',
    name: 'Tata Motors Commercial Vehicles Ltd',
    ticker: 'TATAMOTORS',
    asset_class: 'EQUITY',
    quantity: 120,
    avg_buy_price: 980,
    current_price: 775,
    invested_value: 117600,
    current_value: 93000,
    holding_days: 142, // Short-term (< 365 days)
    gain_loss_amount: -24600,
    gain_loss_pct: -20.92,
    is_long_term: false,
    recommended_replacement: {
      name: 'Nifty Auto Index ETF (AUTOBEES)',
      ticker: 'AUTOBEES',
      correlation_score: 0.88,
      rationale: 'Retains automotive sector exposure while booking ₹24,600 STCL without single-stock drawdown risk.',
    },
    harvest_eligible: true,
    status: 'available',
  },
  {
    id: 'hold_techm',
    name: 'Tech Mahindra Ltd',
    ticker: 'TECHM',
    asset_class: 'EQUITY',
    quantity: 60,
    avg_buy_price: 1680,
    current_price: 1320,
    invested_value: 100800,
    current_value: 79200,
    holding_days: 210, // Short-term (< 365 days)
    gain_loss_amount: -21600,
    gain_loss_pct: -21.43,
    is_long_term: false,
    recommended_replacement: {
      name: 'Nifty IT Index ETF (ITBEES)',
      ticker: 'ITBEES',
      correlation_score: 0.91,
      rationale: 'Maintains IT export recovery upside; immediately offsets short-term capital gains at 20% slab.',
    },
    harvest_eligible: true,
    status: 'available',
  },
  {
    id: 'hold_midcap_fund',
    name: 'Kotak Emerging Midcap Equity Fund - Direct (G)',
    ticker: 'KOTAKMID',
    asset_class: 'MUTUAL_FUND',
    quantity: 850,
    avg_buy_price: 112,
    current_price: 94,
    invested_value: 95200,
    current_value: 79900,
    holding_days: 420, // Long-term (> 365 days)
    gain_loss_amount: -15300,
    gain_loss_pct: -16.07,
    is_long_term: true,
    recommended_replacement: {
      name: 'Nifty Midcap 150 Index Fund',
      ticker: 'MID150INDEX',
      correlation_score: 0.94,
      rationale: 'Offsets ₹15,300 against realized LTCG; lowers portfolio expense ratio from 1.7% to 0.25%.',
    },
    harvest_eligible: true,
    status: 'available',
  },
  {
    id: 'hold_reliance',
    name: 'Reliance Industries Ltd',
    ticker: 'RELIANCE',
    asset_class: 'EQUITY',
    quantity: 45,
    avg_buy_price: 2450,
    current_price: 2980,
    invested_value: 110250,
    current_value: 134100,
    holding_days: 480,
    gain_loss_amount: 23850,
    gain_loss_pct: 21.63,
    is_long_term: true,
    recommended_replacement: {
      name: 'Nifty 50 Equal Weight ETF',
      ticker: 'NIFTYEQUAL',
      correlation_score: 0.82,
      rationale: 'In profit position; holding qualifies for compound growth.',
    },
    harvest_eligible: false,
    status: 'available',
  },
  {
    id: 'hold_smallcap_etf',
    name: 'Nippon India Small Cap 250 ETF',
    ticker: 'SMALL250',
    asset_class: 'ETF',
    quantity: 300,
    avg_buy_price: 145,
    current_price: 118,
    invested_value: 43500,
    current_value: 35400,
    holding_days: 95,
    gain_loss_amount: -8100,
    gain_loss_pct: -18.62,
    is_long_term: false,
    recommended_replacement: {
      name: 'Nifty Microcap 250 Index Fund',
      ticker: 'MICRO250',
      correlation_score: 0.89,
      rationale: 'Captures high-beta small cap recovery while crystallizing ₹8,100 short term loss.',
    },
    harvest_eligible: true,
    status: 'available',
  },
  {
    id: 'hold_embassy_reit',
    name: 'Embassy Office Parks REIT',
    ticker: 'EMBASSY',
    asset_class: 'REIT',
    quantity: 150,
    avg_buy_price: 360,
    current_price: 395,
    invested_value: 54000,
    current_value: 59250,
    holding_days: 310,
    gain_loss_amount: 5250,
    gain_loss_pct: 9.72,
    is_long_term: false,
    recommended_replacement: {
      name: 'Nexus Select Trust REIT',
      ticker: 'NXST',
      correlation_score: 0.79,
      rationale: 'Yield asset producing quarterly dividend distributions.',
    },
    harvest_eligible: false,
    status: 'available',
  },
];

export const INITIAL_CAPITAL_GAINS_SUMMARY: CapitalGainsSummary = {
  financial_year: 'FY 2024-25',
  realized_stcg: 145000, // Short-term capital gains @ 20%
  realized_ltcg: 210000, // Long-term capital gains @ 12.5% (exemption ₹1.25L applied)
  realized_stcl: 0,
  realized_ltcl: 0,
  total_tax_before_harvest: 39625, // (145000 * 0.20) + ((210000 - 125000) * 0.125) = 29000 + 10625 = 39625
  potential_tax_savings: 14193, // STCL: (24600+21600+8100)*0.20 + LTCL: 15300*0.125 = 10860 + 1912.5 = 12772.5 (+ 4% cess = ~13283)
  realized_tax_savings: 0,
  days_until_fy_end: 151,
};

// -----------------------------------------------------------------------------
// Indian Tax Regime Simulator (FY 2024-25 / FY 2025-26 Budget Slabs)
// -----------------------------------------------------------------------------
export const DEFAULT_TAX_INPUTS: TaxRegimeInputs = {
  gross_annual_income: 2520000, // Devin's salary + advisory
  section_80c: 150000, // PPF/EPF/ELSS max
  section_80d: 50000, // Health insurance (self ₹25k + parents ₹25k)
  section_80ccd_1b: 50000, // NPS additional deduction
  annual_rent_paid: 504000, // ₹42,000/mo * 12
  is_metro: true, // Bangalore is metro for HRA 50%
  section_24b_home_loan_interest: 0, // No active home loan currently
  other_deductions_chapter_via: 10000, // 80TTA savings interest
};

/**
 * Calculates HRA exemption under Section 10(13A)
 */
export function calculateHraExemption(
  grossIncome: number,
  annualRentPaid: number,
  isMetro: boolean
): number {
  if (annualRentPaid <= 0) return 0;
  const estimatedBasic = grossIncome * 0.5; // ~50% of gross
  const estimatedHraReceived = estimatedBasic * 0.4; // standard 40% of basic

  const condition1 = estimatedHraReceived;
  const condition2 = isMetro ? estimatedBasic * 0.5 : estimatedBasic * 0.4;
  const condition3 = Math.max(0, annualRentPaid - estimatedBasic * 0.1);

  return Math.min(condition1, condition2, condition3);
}

/**
 * Computes Old Tax Regime liabilities under standard Indian Income Tax Act
 */
export function calculateOldRegime(inputs: TaxRegimeInputs): TaxRegimeBreakdown {
  const standardDeduction = 50000;
  const hraExemption = calculateHraExemption(
    inputs.gross_annual_income,
    inputs.annual_rent_paid,
    inputs.is_metro
  );

  const totalDeductions =
    standardDeduction +
    Math.min(150000, Math.max(0, inputs.section_80c)) +
    Math.min(75000, Math.max(0, inputs.section_80d)) +
    Math.min(50000, Math.max(0, inputs.section_80ccd_1b)) +
    hraExemption +
    Math.min(200000, Math.max(0, inputs.section_24b_home_loan_interest)) +
    Math.max(0, inputs.other_deductions_chapter_via);

  const netTaxableIncome = Math.max(0, inputs.gross_annual_income - totalDeductions);

  let baseTax = 0;
  const slabBreakdown: { slab: string; rate: string; tax: number }[] = [];

  // Slab 1: Up to 2.5L
  slabBreakdown.push({ slab: '₹0 to ₹2.5 Lakh', rate: 'Nil (0%)', tax: 0 });

  // Slab 2: 2.5L to 5L (5%)
  if (netTaxableIncome > 250000) {
    const taxableInSlab = Math.min(netTaxableIncome - 250000, 250000);
    const taxInSlab = taxableInSlab * 0.05;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹2.5 Lakh to ₹5 Lakh', rate: '5%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹2.5 Lakh to ₹5 Lakh', rate: '5%', tax: 0 });
  }

  // Slab 3: 5L to 10L (20%)
  if (netTaxableIncome > 500000) {
    const taxableInSlab = Math.min(netTaxableIncome - 500000, 500000);
    const taxInSlab = taxableInSlab * 0.2;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹5 Lakh to ₹10 Lakh', rate: '20%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹5 Lakh to ₹10 Lakh', rate: '20%', tax: 0 });
  }

  // Slab 4: Above 10L (30%)
  if (netTaxableIncome > 1000000) {
    const taxableInSlab = netTaxableIncome - 1000000;
    const taxInSlab = taxableInSlab * 0.3;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: 'Above ₹10 Lakh', rate: '30%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: 'Above ₹10 Lakh', rate: '30%', tax: 0 });
  }

  // Section 87A rebate (if taxable income <= 5L in Old Regime)
  let rebate87a = 0;
  if (netTaxableIncome <= 500000) {
    rebate87a = Math.min(baseTax, 12500);
    baseTax = Math.max(0, baseTax - rebate87a);
  }

  // Surcharge (nil if < 50L)
  let surcharge = 0;
  if (inputs.gross_annual_income > 5000000) {
    surcharge = baseTax * 0.1;
  }

  // Health and Education Cess: 4%
  const cess = (baseTax + surcharge) * 0.04;
  const totalTaxPayable = Math.round(baseTax + surcharge + cess);
  const effectiveTaxRate = inputs.gross_annual_income > 0
    ? (totalTaxPayable / inputs.gross_annual_income) * 100
    : 0;

  return {
    regime: 'OLD',
    gross_income: inputs.gross_annual_income,
    standard_deduction: standardDeduction,
    total_exemptions_deductions: totalDeductions,
    net_taxable_income: netTaxableIncome,
    base_tax: baseTax,
    rebate_87a: rebate87a,
    surcharge,
    health_education_cess: cess,
    total_tax_payable: totalTaxPayable,
    effective_tax_rate: Number(effectiveTaxRate.toFixed(2)),
    slab_breakdown: slabBreakdown,
  };
}

/**
 * Computes New Tax Regime (Section 115BAC, FY 2024-25 / FY 2025-26 Budget Slabs)
 */
export function calculateNewRegime(inputs: TaxRegimeInputs): TaxRegimeBreakdown {
  const standardDeduction = 75000;
  const totalDeductions = standardDeduction;
  const netTaxableIncome = Math.max(0, inputs.gross_annual_income - totalDeductions);

  let baseTax = 0;
  const slabBreakdown: { slab: string; rate: string; tax: number }[] = [];

  // Slab 1: Up to 3L
  slabBreakdown.push({ slab: '₹0 to ₹3 Lakh', rate: 'Nil (0%)', tax: 0 });

  // Slab 2: 3L to 7L (5%)
  if (netTaxableIncome > 300000) {
    const taxableInSlab = Math.min(netTaxableIncome - 300000, 400000);
    const taxInSlab = taxableInSlab * 0.05;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹3 Lakh to ₹7 Lakh', rate: '5%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹3 Lakh to ₹7 Lakh', rate: '5%', tax: 0 });
  }

  // Slab 3: 7L to 10L (10%)
  if (netTaxableIncome > 700000) {
    const taxableInSlab = Math.min(netTaxableIncome - 700000, 300000);
    const taxInSlab = taxableInSlab * 0.1;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹7 Lakh to ₹10 Lakh', rate: '10%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹7 Lakh to ₹10 Lakh', rate: '10%', tax: 0 });
  }

  // Slab 4: 10L to 12L (15%)
  if (netTaxableIncome > 1000000) {
    const taxableInSlab = Math.min(netTaxableIncome - 1000000, 200000);
    const taxInSlab = taxableInSlab * 0.15;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹10 Lakh to ₹12 Lakh', rate: '15%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹10 Lakh to ₹12 Lakh', rate: '15%', tax: 0 });
  }

  // Slab 5: 12L to 15L (20%)
  if (netTaxableIncome > 1200000) {
    const taxableInSlab = Math.min(netTaxableIncome - 1200000, 300000);
    const taxInSlab = taxableInSlab * 0.2;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: '₹12 Lakh to ₹15 Lakh', rate: '20%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: '₹12 Lakh to ₹15 Lakh', rate: '20%', tax: 0 });
  }

  // Slab 6: Above 15L (30%)
  if (netTaxableIncome > 1500000) {
    const taxableInSlab = netTaxableIncome - 1500000;
    const taxInSlab = taxableInSlab * 0.3;
    baseTax += taxInSlab;
    slabBreakdown.push({ slab: 'Above ₹15 Lakh', rate: '30%', tax: taxInSlab });
  } else {
    slabBreakdown.push({ slab: 'Above ₹15 Lakh', rate: '30%', tax: 0 });
  }

  // Section 87A rebate in New Regime
  let rebate87a = 0;
  if (netTaxableIncome <= 700000) {
    rebate87a = baseTax;
    baseTax = 0;
  }

  let surcharge = 0;
  if (inputs.gross_annual_income > 5000000) {
    surcharge = baseTax * 0.1;
  }

  const cess = (baseTax + surcharge) * 0.04;
  const totalTaxPayable = Math.round(baseTax + surcharge + cess);
  const effectiveTaxRate = inputs.gross_annual_income > 0
    ? (totalTaxPayable / inputs.gross_annual_income) * 100
    : 0;

  return {
    regime: 'NEW',
    gross_income: inputs.gross_annual_income,
    standard_deduction: standardDeduction,
    total_exemptions_deductions: totalDeductions,
    net_taxable_income: netTaxableIncome,
    base_tax: baseTax,
    rebate_87a: rebate87a,
    surcharge,
    health_education_cess: cess,
    total_tax_payable: totalTaxPayable,
    effective_tax_rate: Number(effectiveTaxRate.toFixed(2)),
    slab_breakdown: slabBreakdown,
  };
}

/**
 * Calculates comparative recommendation between Old vs New Regime
 */
export function compareTaxRegimes(inputs: TaxRegimeInputs): TaxRegimeComparison {
  const oldRegime = calculateOldRegime(inputs);
  const newRegime = calculateNewRegime(inputs);

  const diff = oldRegime.total_tax_payable - newRegime.total_tax_payable;
  const recommendedRegime: 'OLD' | 'NEW' = diff > 0 ? 'NEW' : 'OLD';
  const taxDelta = Math.abs(diff);

  const breakEvenDeductions = 375000;
  const actionableRecommendations: string[] = [];

  if (recommendedRegime === 'NEW') {
    actionableRecommendations.push(
      `Opt for the New Tax Regime to save ₹${taxDelta.toLocaleString('en-IN')} annually with zero mandatory lock-ins.`
    );
    actionableRecommendations.push(
      `Your current deductions total ₹${oldRegime.total_exemptions_deductions.toLocaleString('en-IN')}, which falls below the break-even threshold (~₹${breakEvenDeductions.toLocaleString('en-IN')}).`
    );
    actionableRecommendations.push(
      `Freedom from 3-year lock-in ELSS and PPF allows allocating capital to liquid high-yield assets and alternative opportunities.`
    );
  } else {
    actionableRecommendations.push(
      `Stay in the Old Tax Regime to save ₹${taxDelta.toLocaleString('en-IN')} thanks to your active HRA and Section 80 deductions.`
    );
    if (inputs.section_80ccd_1b < 50000) {
      const remainingNps = 50000 - inputs.section_80ccd_1b;
      const potentialExtraSaving = Math.round(remainingNps * 0.312);
      actionableRecommendations.push(
        `Invest an additional ₹${remainingNps.toLocaleString('en-IN')} into NPS Tier-1 before March 31 to unlock an extra ₹${potentialExtraSaving.toLocaleString('en-IN')} in tax refunds.`
      );
    }
  }

  return {
    old_regime: oldRegime,
    new_regime: newRegime,
    recommended_regime: recommendedRegime,
    tax_delta: taxDelta,
    break_even_deductions: breakEvenDeductions,
    actionable_recommendations: actionableRecommendations,
  };
}

/**
 * Calculates harvest opportunities and potential tax offset
 */
export function calculateTaxHarvesting(
  holdings: TaxPortfolioHolding[],
  capitalGains: CapitalGainsSummary
): {
  harvestable_holdings: TaxPortfolioHolding[];
  total_stcl_harvestable: number;
  total_ltcl_harvestable: number;
  total_potential_savings: number;
} {
  const harvestable = holdings.filter(
    (h) => h.harvest_eligible && h.status === 'available' && h.gain_loss_amount < 0
  );

  let stcl = 0;
  let ltcl = 0;

  harvestable.forEach((h) => {
    if (h.is_long_term) {
      ltcl += Math.abs(h.gain_loss_amount);
    } else {
      stcl += Math.abs(h.gain_loss_amount);
    }
  });

  const stclEffectiveOffset = Math.min(stcl, capitalGains.realized_stcg);
  const ltclEffectiveOffset = Math.min(ltcl, Math.max(0, capitalGains.realized_ltcg - 125000));

  const totalPotentialSavings = Math.round(
    stclEffectiveOffset * 0.208 + ltclEffectiveOffset * 0.13
  );

  return {
    harvestable_holdings: harvestable,
    total_stcl_harvestable: stcl,
    total_ltcl_harvestable: ltcl,
    total_potential_savings: totalPotentialSavings,
  };
}
