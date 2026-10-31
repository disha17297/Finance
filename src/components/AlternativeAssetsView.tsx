import React, { useState } from 'react';
import {
  Building2,
  FileCheck,
  Shield,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Filter,
  X,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import {
  AlternativeAsset,
  UserAltInvestment,
  AltAssetCategory,
} from '../types/finance';
import {
  CURATED_ALTERNATIVE_ASSETS,
  INITIAL_USER_ALT_INVESTMENTS,
} from '../services/alternativeAssetsService';
import { JargonTooltip } from './JargonTooltip';

interface AlternativeAssetsViewProps {
  onNotify: (msg: string, type: 'success' | 'info' | 'error') => void;
  onOpenJargonBuster?: () => void;
  onUpdateLivingModel?: (amount: number, assetTitle: string) => void;
}

export const AlternativeAssetsView: React.FC<AlternativeAssetsViewProps> = ({
  onNotify,
  onOpenJargonBuster,
  onUpdateLivingModel,
}) => {
  const [assets] = useState<AlternativeAsset[]>(CURATED_ALTERNATIVE_ASSETS);
  const [userInvestments, setUserInvestments] = useState<UserAltInvestment[]>(INITIAL_USER_ALT_INVESTMENTS);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | AltAssetCategory>('ALL');

  // Invest Modal State
  const [investModalAsset, setInvestModalAsset] = useState<AlternativeAsset | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(5000);
  const [isInvesting, setIsInvesting] = useState<boolean>(false);

  const filteredAssets = selectedCategory === 'ALL'
    ? assets
    : assets.filter((a) => a.category === selectedCategory);

  const totalAltInvested = userInvestments.reduce((sum, i) => sum + i.invested_amount, 0);
  const totalAltValuation = userInvestments.reduce((sum, i) => sum + i.current_valuation, 0);
  const totalAccruedPayouts = userInvestments.reduce((sum, i) => sum + i.accrued_payouts, 0);

  const handleOpenInvest = (asset: AlternativeAsset) => {
    setInvestModalAsset(asset);
    setInvestAmount(asset.min_ticket_size);
  };

  const handleConfirmInvestment = () => {
    if (!investModalAsset) return;

    if (investAmount < investModalAsset.min_ticket_size) {
      onNotify(`Minimum ticket size is ₹${investModalAsset.min_ticket_size.toLocaleString('en-IN')}`, 'error');
      return;
    }

    setIsInvesting(true);

    setTimeout(() => {
      const newInv: UserAltInvestment = {
        id: `inv_user_${Date.now()}`,
        asset_id: investModalAsset.id,
        asset_title: investModalAsset.title,
        invested_amount: investAmount,
        invested_date: new Date().toISOString().split('T')[0],
        expected_annual_return: investModalAsset.target_pre_tax_irr,
        accrued_payouts: 0,
        next_payout_date: '2026-11-20',
        current_valuation: investAmount,
      };

      setUserInvestments((prev) => [newInv, ...prev]);

      if (onUpdateLivingModel) {
        onUpdateLivingModel(investAmount, investModalAsset.title);
      }

      setIsInvesting(false);
      const assetName = investModalAsset.title;
      setInvestModalAsset(null);

      onNotify(
        `Successfully allocated ₹${investAmount.toLocaleString('en-IN')} to "${assetName}". Your portfolio balance sheet and passive cash flow model have been updated!`,
        'success'
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-bold text-white">
              Alternative Asset Micro-Investing (Fractional Ownership)
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              SEBI SM-REIT & RBI Escrow Compliant
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
            Diversify beyond low-yield fixed deposits (6%) and volatile equity markets. Own institutional-grade Commercial Real Estate, Invoice Discounting, and Senior Secured Green Bonds starting from accessible ticket sizes of just ₹1,000 to ₹10,000.
          </p>
        </div>

        {/* Portfolio Mini Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Your Alt Assets:</span>
            <span className="text-base font-bold font-mono text-emerald-400">
              ₹{totalAltValuation.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Monthly Passive Yield:</span>
            <span className="text-base font-bold font-mono text-cyan-400">
              11.2% Avg IRR
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Opportunities ({assets.length})
          </button>
          <button
            onClick={() => setSelectedCategory('COMMERCIAL_REAL_ESTATE')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCategory === 'COMMERCIAL_REAL_ESTATE'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Commercial Real Estate
          </button>
          <button
            onClick={() => setSelectedCategory('INVOICE_DISCOUNTING')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCategory === 'INVOICE_DISCOUNTING'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Invoice Discounting
          </button>
          <button
            onClick={() => setSelectedCategory('CORPORATE_BOND')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCategory === 'CORPORATE_BOND'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Corporate Green Bonds
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Need jargon breakdown?</span>
          <JargonTooltip termKey="AIF" onOpenJargonBuster={onOpenJargonBuster}>
            What is an AIF / Fractional asset?
          </JargonTooltip>
        </div>
      </div>

      {/* Opportunities Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => {
          const isCRE = asset.category === 'COMMERCIAL_REAL_ESTATE';
          const isInv = asset.category === 'INVOICE_DISCOUNTING';
          const isBond = asset.category === 'CORPORATE_BOND';

          return (
            <div
              key={asset.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all group hover:-translate-y-0.5"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      isCRE
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : isInv
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    }`}
                  >
                    {asset.category_label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {asset.days_left}d left
                  </span>
                </div>

                {/* Title */}
                <h4 className="mt-3 text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {asset.title}
                </h4>

                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {asset.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Target Pre-Tax IRR</span>
                    <span className="text-base font-extrabold text-emerald-400">
                      {asset.target_pre_tax_irr}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      {isCRE ? 'Entry Rental Yield' : isInv ? 'Discount Rate' : 'Annual Coupon'}
                    </span>
                    <span className="text-base font-extrabold text-white">
                      {asset.rental_or_interest_yield}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Min Ticket Size</span>
                    <span className="text-xs font-bold text-amber-300">
                      ₹{asset.min_ticket_size.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Payout Frequency</span>
                    <span className="text-xs font-semibold text-slate-200">
                      {asset.payout_frequency}
                    </span>
                  </div>
                </div>

                {/* Location / Anchor Tenant */}
                <div className="mt-3 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-start gap-1">
                    <strong className="text-slate-400 shrink-0">Anchor / Tenant:</strong>
                    <span className="truncate">{asset.tenant_or_anchor}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Shield className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="truncate">{asset.regulatory_status}</span>
                  </div>
                </div>

                {/* Funding Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Funded: {asset.funded_percentage}%</span>
                    <span>Rating: {asset.credit_or_asset_rating}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${asset.funded_percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleOpenInvest(asset)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-900/30 cursor-pointer"
                >
                  <span>Invest from ₹{asset.min_ticket_size.toLocaleString('en-IN')}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* User's Active Alternative Assets Ledger */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-white">Your Alternative Asset Holdings</h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {userInvestments.length} active positions
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 overflow-x-auto">
          {userInvestments.map((inv) => (
            <div
              key={inv.id}
              className="p-4 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-semibold text-white text-sm">{inv.asset_title}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>Invested on {inv.invested_date}</span>
                  <span>·</span>
                  <span>Next Payout: {inv.next_payout_date}</span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-right font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Invested Principal</span>
                  <span className="font-bold text-white text-xs">
                    ₹{inv.invested_amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Expected Return</span>
                  <span className="font-bold text-emerald-400 text-xs">
                    {inv.expected_annual_return}% IRR
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Accrued Yields</span>
                  <span className="font-bold text-cyan-400 text-xs">
                    ₹{inv.accrued_payouts.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invest Simulation Modal */}
      {investModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setInvestModalAsset(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Building2 className="h-5 w-5" />
              <span className="text-xs font-mono font-semibold uppercase">
                {investModalAsset.category_label}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {investModalAsset.title}
            </h3>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Target Annual Yield (IRR):</span>
                <span className="font-bold text-emerald-400">{investModalAsset.target_pre_tax_irr}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payout Frequency:</span>
                <span className="text-white">{investModalAsset.payout_frequency}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Regulatory Structure:</span>
                <span className="text-blue-300">{investModalAsset.regulatory_status}</span>
              </div>
            </div>

            {/* Input Ticket Size */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Enter Allocation Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">₹</span>
                <input
                  type="number"
                  min={investModalAsset.min_ticket_size}
                  step={1000}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-7 pr-3 text-sm font-mono text-white focus:border-blue-500"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Minimum ticket: ₹{investModalAsset.min_ticket_size.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Projected Annual Passive Income */}
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
              <span className="text-emerald-300">Projected Annual Cash Payout:</span>
              <span className="font-mono font-extrabold text-emerald-400 text-sm">
                +₹{Math.round((investAmount * investModalAsset.target_pre_tax_irr) / 100).toLocaleString('en-IN')}/year
              </span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setInvestModalAsset(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmInvestment}
                disabled={isInvesting || investAmount < investModalAsset.min_ticket_size}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 cursor-pointer"
              >
                {isInvesting ? (
                  <span>Allocating...</span>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirm Allocation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
