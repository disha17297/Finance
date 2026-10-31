import React, { useState } from 'react';
import {
  Calculator,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  IndianRupee,
  RefreshCw,
  SlidersHorizontal,
  Info,
  Check,
  Building,
  Heart,
  Briefcase,
  Home,
} from 'lucide-react';
import {
  TaxPortfolioHolding,
  CapitalGainsSummary,
  TaxRegimeInputs,
} from '../types/finance';
import {
  INITIAL_TAX_HOLDINGS,
  INITIAL_CAPITAL_GAINS_SUMMARY,
  DEFAULT_TAX_INPUTS,
  calculateTaxHarvesting,
  compareTaxRegimes,
} from '../services/taxEngine';
import { JargonTooltip } from './JargonTooltip';

interface TaxOptimizerViewProps {
  onNotify: (msg: string, type: 'success' | 'info' | 'error') => void;
  onOpenJargonBuster?: () => void;
}

export const TaxOptimizerView: React.FC<TaxOptimizerViewProps> = ({
  onNotify,
  onOpenJargonBuster,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'harvesting' | 'regime'>('harvesting');

  // ---------------------------------------------------------------------------
  // Tax Loss Harvesting State
  // ---------------------------------------------------------------------------
  const [holdings, setHoldings] = useState<TaxPortfolioHolding[]>(INITIAL_TAX_HOLDINGS);
  const [capitalGains, setCapitalGains] = useState<CapitalGainsSummary>(INITIAL_CAPITAL_GAINS_SUMMARY);
  const [isHarvestingAll, setIsHarvestingAll] = useState(false);
  const [lastHarvestedHolding, setLastHarvestedHolding] = useState<string | null>(null);

  const {
    harvestable_holdings,
    total_stcl_harvestable,
    total_ltcl_harvestable,
    total_potential_savings,
  } = calculateTaxHarvesting(holdings, capitalGains);

  const handleHarvestSingle = (holdingId: string) => {
    const target = holdings.find((h) => h.id === holdingId);
    if (!target) return;

    const lossAmount = Math.abs(target.gain_loss_amount);
    const taxRate = target.is_long_term ? 0.13 : 0.208; // including 4% cess
    const saving = Math.round(lossAmount * taxRate);

    setHoldings((prev) =>
      prev.map((h) =>
        h.id === holdingId ? { ...h, status: 'harvested', harvest_eligible: false } : h
      )
    );

    setCapitalGains((prev) => ({
      ...prev,
      realized_stcl: target.is_long_term ? prev.realized_stcl : prev.realized_stcl + lossAmount,
      realized_ltcl: target.is_long_term ? prev.realized_ltcl + lossAmount : prev.realized_ltcl,
      realized_tax_savings: prev.realized_tax_savings + saving,
      potential_tax_savings: Math.max(0, prev.potential_tax_savings - saving),
    }));

    setLastHarvestedHolding(target.name);
    onNotify(
      `Harvested ${target.ticker}: Booked ₹${lossAmount.toLocaleString('en-IN')} loss, saving ₹${saving.toLocaleString('en-IN')} in tax. Recommended replacement: ${target.recommended_replacement.ticker}`,
      'success'
    );
  };

  const handleHarvestAll = () => {
    setIsHarvestingAll(true);
    setTimeout(() => {
      setHoldings((prev) =>
        prev.map((h) =>
          h.harvest_eligible && h.gain_loss_amount < 0
            ? { ...h, status: 'harvested', harvest_eligible: false }
            : h
        )
      );

      const stclTotal = total_stcl_harvestable;
      const ltclTotal = total_ltcl_harvestable;
      const savingsTotal = total_potential_savings;

      setCapitalGains((prev) => ({
        ...prev,
        realized_stcl: prev.realized_stcl + stclTotal,
        realized_ltcl: prev.realized_ltcl + ltclTotal,
        realized_tax_savings: prev.realized_tax_savings + savingsTotal,
        potential_tax_savings: 0,
      }));

      setIsHarvestingAll(false);
      onNotify(
        `Smart Tax Loss Harvesting completed! Saved ₹${savingsTotal.toLocaleString('en-IN')} in capital gains tax across all underwater positions.`,
        'success'
      );
    }, 600);
  };

  // ---------------------------------------------------------------------------
  // Old vs New Regime Simulator State
  // ---------------------------------------------------------------------------
  const [taxInputs, setTaxInputs] = useState<TaxRegimeInputs>(DEFAULT_TAX_INPUTS);
  const regimeComparison = compareTaxRegimes(taxInputs);

  const handleInputChange = (field: keyof TaxRegimeInputs, value: number | boolean) => {
    setTaxInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Top Module Subnav */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('harvesting')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'harvesting'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TrendingDown className="h-4 w-4" />
            <span>Tax-Loss Harvesting (FY Opt)</span>
            {harvestable_holdings.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-300 font-bold">
                {harvestable_holdings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('regime')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'regime'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>Old vs New Regime Simulator</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 text-xs text-slate-400 font-mono w-full sm:w-auto justify-end">
          <Calendar className="h-3.5 w-3.5 text-amber-400" />
          <span>FY 2024-25 Deadline:</span>
          <span className="text-amber-400 font-bold bg-amber-950/60 border border-amber-600/30 px-2 py-0.5 rounded">
            {capitalGains.days_until_fy_end} Days Left (March 31)
          </span>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* SUBTAB 1: TAX-LOSS HARVESTING                                           */}
      {/* ======================================================================= */}
      {activeSubTab === 'harvesting' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
              <span className="text-xs text-slate-400 font-medium">Realized Capital Gains (Current FY)</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  ₹{(capitalGains.realized_stcg + capitalGains.realized_ltcg).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                STCG: ₹{capitalGains.realized_stcg.toLocaleString('en-IN')} (20%) · LTCG: ₹{capitalGains.realized_ltcg.toLocaleString('en-IN')} (12.5%)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Tax Liability Before Harvest</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-rose-400">
                  ₹{capitalGains.total_tax_before_harvest.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-rose-400/80 font-mono">(incl. 4% cess)</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Calculated under Indian Budget tax rules
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Harvestable Tax Savings
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  ₹{capitalGains.potential_tax_savings.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-500 font-medium">Potential</span>
              </div>
              <p className="mt-1 text-[11px] text-emerald-300/80">
                STCL: ₹{total_stcl_harvestable.toLocaleString('en-IN')} · LTCL: ₹{total_ltcl_harvestable.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Realized Tax Saved Till Date</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  ₹{capitalGains.realized_tax_savings.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-cyan-300/80">
                Direct cash tax saved in your pockets
              </p>
            </div>
          </div>

          {/* Action Header Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-slate-900/90 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  Portfolio Tax Loss Harvesting Engine
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SEBI Compliant · Zero Wash-Sale Risk
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
                Scan all underwater equity, ETF, and mutual fund positions. Lock in capital losses before 31 March to cancel out taxable capital gains, and seamlessly reinvest in correlated index ETFs to maintain identical market exposure.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                disabled={harvestable_holdings.length === 0 || isHarvestingAll}
                onClick={handleHarvestAll}
                className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  harvestable_holdings.length > 0 && !isHarvestingAll
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isHarvestingAll ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    <span>Executing Smart Re-balance...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Harvest All (Save ₹{capitalGains.potential_tax_savings.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Holdings Scanner Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">Portfolio Holdings Scanner</h4>
                <span className="text-xs text-slate-400 font-mono">
                  ({holdings.length} assets audited)
                </span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Indian tax rules: STCG &lt; 365 days (20%) · LTCG &gt;= 365 days (12.5%)
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                    <th className="py-3 px-4">Asset / Holding</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Holding Period</th>
                    <th className="py-3 px-3">Invested Value</th>
                    <th className="py-3 px-3">Unrealized P&L</th>
                    <th className="py-3 px-4">Recommended Replacement</th>
                    <th className="py-3 px-4 text-right">Tax Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {holdings.map((h) => {
                    const isLoss = h.gain_loss_amount < 0;
                    const taxSaving = isLoss
                      ? Math.round(Math.abs(h.gain_loss_amount) * (h.is_long_term ? 0.13 : 0.208))
                      : 0;

                    return (
                      <tr
                        key={h.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          h.status === 'harvested' ? 'opacity-60 bg-emerald-950/10' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{h.name}</div>
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{h.ticker}</span>
                            <span>·</span>
                            <span>Qty: {h.quantity}</span>
                            <span>·</span>
                            <span>Avg ₹{h.avg_buy_price} → CMP ₹{h.current_price}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                            {h.asset_class}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-mono">
                          <div className="text-slate-300">{h.holding_days} days</div>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              h.is_long_term
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/40'
                                : 'bg-amber-950 text-amber-300 border border-amber-700/40'
                            }`}
                          >
                            {h.is_long_term ? 'LTCG (12.5%)' : 'STCG (20%)'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-300">
                          ₹{h.invested_value.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3.5 px-3 font-mono">
                          <div
                            className={`font-bold flex items-center gap-1 ${
                              isLoss ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                          >
                            {isLoss ? '▼' : '▲'} ₹{Math.abs(h.gain_loss_amount).toLocaleString('en-IN')}
                          </div>
                          <span
                            className={`text-[10px] ${
                              isLoss ? 'text-rose-400/80' : 'text-emerald-400/80'
                            }`}
                          >
                            ({h.gain_loss_pct > 0 ? '+' : ''}{h.gain_loss_pct}%)
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          {isLoss ? (
                            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                              <div className="font-semibold text-emerald-400 flex items-center gap-1">
                                <ArrowRight className="h-3 w-3" />
                                {h.recommended_replacement.name}
                              </div>
                              <p className="text-[10.5px] text-slate-400 mt-0.5 line-clamp-2">
                                {h.recommended_replacement.rationale}
                              </p>
                              <div className="mt-1 text-[10px] text-emerald-400/80 font-mono">
                                Beta Correlation: {h.recommended_replacement.correlation_score * 100}%
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic text-[11px]">No replacement needed (Profitable)</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {h.status === 'harvested' ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Harvested</span>
                            </div>
                          ) : isLoss ? (
                            <button
                              onClick={() => handleHarvestSingle(h.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition-all font-semibold text-xs whitespace-nowrap inline-flex items-center gap-1 cursor-pointer"
                              title={`Harvest loss to save ₹${taxSaving}`}
                            >
                              <Sparkles className="h-3 w-3" />
                              <span>Harvest (Save ₹{taxSaving})</span>
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[11px]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Callout */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
            <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-white">Smart Capital Gains Re-investment Rule:</strong>
              <p>
                Unlike the US IRS 30-day Wash-Sale Rule, Indian tax authorities permit immediate redeployment into index or broad market instruments. By swapping single-stock losers for index ETFs (e.g. Tata Motors into Auto BeES), your core exposure remains unbroken while capturing instant tax credits.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* SUBTAB 2: OLD VS NEW REGIME SIMULATOR                                   */}
      {/* ======================================================================= */}
      {activeSubTab === 'regime' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Tax Parameters & Deductions</h3>
              </div>
              <button
                onClick={() => setTaxInputs(DEFAULT_TAX_INPUTS)}
                className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Reset Defaults
              </button>
            </div>

            {/* Gross Annual Income */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gross Annual Income (Salary + Consulting/Advisory)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">₹</span>
                <input
                  type="number"
                  step="50000"
                  value={taxInputs.gross_annual_income}
                  onChange={(e) =>
                    handleInputChange('gross_annual_income', Math.max(0, Number(e.target.value)))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pl-7 pr-3 text-sm font-mono text-white"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                ₹{(taxInputs.gross_annual_income / 100000).toFixed(2)} Lakhs per annum
              </span>
            </div>

            {/* Section 80C */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-emerald-400" />
                  Section 80C (EPF, PPF, ELSS, Insurance)
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  ₹{taxInputs.section_80c.toLocaleString('en-IN')} / ₹1.5L
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={taxInputs.section_80c}
                onChange={(e) => handleInputChange('section_80c', Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Section 80D */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-400" />
                  Section 80D (Health Insurance: Self + Parents)
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  ₹{taxInputs.section_80d.toLocaleString('en-IN')} / ₹75k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="75000"
                step="5000"
                value={taxInputs.section_80d}
                onChange={(e) => handleInputChange('section_80d', Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Section 80CCD(1B) NPS */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                  Section 80CCD(1B) (National Pension System NPS)
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  ₹{taxInputs.section_80ccd_1b.toLocaleString('en-IN')} / ₹50k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="5000"
                value={taxInputs.section_80ccd_1b}
                onChange={(e) => handleInputChange('section_80ccd_1b', Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* House Rent Paid (HRA Section 10(13A)) */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-amber-400" />
                  Annual House Rent Paid (for HRA exemption)
                </label>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className={taxInputs.is_metro ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                    Metro (50%)
                  </span>
                  <input
                    type="checkbox"
                    checked={taxInputs.is_metro}
                    onChange={(e) => handleInputChange('is_metro', e.target.checked)}
                    className="accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">₹</span>
                <input
                  type="number"
                  step="12000"
                  value={taxInputs.annual_rent_paid}
                  onChange={(e) =>
                    handleInputChange('annual_rent_paid', Math.max(0, Number(e.target.value)))
                  }
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg py-1.5 pl-7 pr-3 text-xs font-mono text-white"
                />
              </div>
              <p className="text-[10.5px] text-slate-400">
                Current rent: ₹{(taxInputs.annual_rent_paid / 12).toLocaleString('en-IN')}/month
              </p>
            </div>

            {/* Section 24(b) Home Loan Interest */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">
                  Section 24(b) (Home Loan Interest, max ₹2L)
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  ₹{taxInputs.section_24b_home_loan_interest.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={taxInputs.section_24b_home_loan_interest}
                onChange={(e) =>
                  handleInputChange('section_24b_home_loan_interest', Number(e.target.value))
                }
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Comparative Simulator Output */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dynamic Recommendation Banner */}
            <div
              className={`p-5 rounded-2xl border shadow-xl flex items-start gap-4 ${
                regimeComparison.recommended_regime === 'NEW'
                  ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 border-emerald-500/40 text-emerald-200'
                  : 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500/40 text-indigo-200'
              }`}
            >
              <div className="p-3 rounded-xl bg-slate-950/60 shrink-0">
                <Sparkles className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-white border border-slate-700">
                    Optimal Recommendation
                  </span>
                  <span className="text-sm font-bold text-white">
                    Choose {regimeComparison.recommended_regime === 'NEW' ? 'NEW TAX REGIME' : 'OLD TAX REGIME'}
                  </span>
                </div>
                <h4 className="mt-1 text-lg font-extrabold text-white">
                  Save ₹{regimeComparison.tax_delta.toLocaleString('en-IN')} in Tax Every Year
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  {regimeComparison.actionable_recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OLD REGIME CARD */}
              <div
                className={`p-5 rounded-2xl bg-slate-900/80 border transition-all ${
                  regimeComparison.recommended_regime === 'OLD'
                    ? 'border-indigo-500/50 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Option A</span>
                    <h4 className="font-bold text-white text-base">Old Tax Regime</h4>
                  </div>
                  {regimeComparison.recommended_regime === 'OLD' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Best Value
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Gross Income:</span>
                    <span className="font-mono text-white">
                      ₹{regimeComparison.old_regime.gross_income.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Total Deductions & Exemptions:</span>
                    <span className="font-mono text-emerald-400">
                      -₹{regimeComparison.old_regime.total_exemptions_deductions.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Net Taxable Income:</span>
                    <span className="font-mono font-bold text-white">
                      ₹{regimeComparison.old_regime.net_taxable_income.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Base Income Tax:</span>
                    <span className="font-mono text-white">
                      ₹{Math.round(regimeComparison.old_regime.base_tax).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Health & Education Cess (4%):</span>
                    <span className="font-mono text-white">
                      ₹{Math.round(regimeComparison.old_regime.health_education_cess).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-slate-200">Total Tax Payable:</span>
                    <span className="text-xl font-mono font-extrabold text-white">
                      ₹{regimeComparison.old_regime.total_tax_payable.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 font-mono">
                    Effective Rate: {regimeComparison.old_regime.effective_tax_rate}%
                  </div>
                </div>
              </div>

              {/* NEW REGIME CARD */}
              <div
                className={`p-5 rounded-2xl bg-slate-900/80 border transition-all ${
                  regimeComparison.recommended_regime === 'NEW'
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Option B</span>
                    <h4 className="font-bold text-white text-base">New Tax Regime (Sec 115BAC)</h4>
                  </div>
                  {regimeComparison.recommended_regime === 'NEW' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Gross Income:</span>
                    <span className="font-mono text-white">
                      ₹{regimeComparison.new_regime.gross_income.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Standard Deduction (Enhanced):</span>
                    <span className="font-mono text-emerald-400">
                      -₹{regimeComparison.new_regime.standard_deduction.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Net Taxable Income:</span>
                    <span className="font-mono font-bold text-white">
                      ₹{regimeComparison.new_regime.net_taxable_income.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Base Income Tax:</span>
                    <span className="font-mono text-white">
                      ₹{Math.round(regimeComparison.new_regime.base_tax).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Health & Education Cess (4%):</span>
                    <span className="font-mono text-white">
                      ₹{Math.round(regimeComparison.new_regime.health_education_cess).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-slate-200">Total Tax Payable:</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400">
                      ₹{regimeComparison.new_regime.total_tax_payable.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-emerald-400 font-mono">
                    Effective Rate: {regimeComparison.new_regime.effective_tax_rate}%
                  </div>
                </div>
              </div>
            </div>

            {/* Break-even Indicator */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Break-Even Deduction Threshold:</span>
                <p className="font-semibold text-white mt-0.5">
                  Deductions must exceed ₹{regimeComparison.break_even_deductions.toLocaleString('en-IN')} for Old Regime to win.
                </p>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Your Current Deductions:</span>
                <p className="font-mono font-bold text-emerald-400 mt-0.5">
                  ₹{regimeComparison.old_regime.total_exemptions_deductions.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
