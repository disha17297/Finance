import React, { useState } from 'react';
import {
  Coins,
  Sparkles,
  Smartphone,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  History,
  CheckCircle2,
  Sliders,
  DollarSign,
  Coffee,
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Layers,
} from 'lucide-react';
import {
  UpiRoundUpRule,
  UpiMicroTransaction,
  SpareChangeDestination,
  RoundUpTarget,
} from '../types/finance';
import {
  DEFAULT_UPI_RULE,
  INITIAL_UPI_TRANSACTIONS,
  INITIAL_POOL_SUMMARIES,
  computeRoundUp,
} from '../services/upiSpareChangeService';
import { JargonTooltip } from './JargonTooltip';

interface UpiSpareChangeViewProps {
  onNotify: (msg: string, type: 'success' | 'info' | 'error') => void;
  onOpenJargonBuster?: () => void;
}

export const UpiSpareChangeView: React.FC<UpiSpareChangeViewProps> = ({
  onNotify,
  onOpenJargonBuster,
}) => {
  const [rule, setRule] = useState<UpiRoundUpRule>(DEFAULT_UPI_RULE);
  const [transactions, setTransactions] = useState<UpiMicroTransaction[]>(INITIAL_UPI_TRANSACTIONS);
  const [poolSummaries, setPoolSummaries] = useState(INITIAL_POOL_SUMMARIES);

  // Live Simulator state
  const [customMerchant, setCustomMerchant] = useState('Swiggy Gourmet');
  const [customCategory, setCustomCategory] = useState('Food & Dining');
  const [customAmount, setCustomAmount] = useState<number>(342);
  const [isSimulatingSweep, setIsSimulatingSweep] = useState(false);
  const [lastSweptTx, setLastSweptTx] = useState<UpiMicroTransaction | null>(null);

  const previewCalc = computeRoundUp(customAmount, rule);

  const handleSimulatePayment = (merchantName?: string, amountVal?: number, catName?: string) => {
    const finalMerchant = merchantName || customMerchant;
    const finalAmount = amountVal || customAmount;
    const finalCat = catName || customCategory;

    if (finalAmount <= 0) {
      onNotify('Please enter a valid transaction amount', 'error');
      return;
    }

    const { rounded_amount, spare_change, total_swept } = computeRoundUp(finalAmount, rule);

    setIsSimulatingSweep(true);

    const newTx: UpiMicroTransaction = {
      id: `upi_tx_${Date.now()}`,
      merchant: finalMerchant,
      category: finalCat,
      actual_amount: finalAmount,
      rounded_amount,
      spare_change,
      multiplier: rule.accelerator_multiplier,
      total_swept,
      destination: rule.destination,
      timestamp: new Date().toISOString(),
      status: 'swept',
    };

    setTimeout(() => {
      setTransactions((prev) => [newTx, ...prev]);
      setLastSweptTx(newTx);

      // Update pool stats
      setPoolSummaries((prev) => {
        const dest = rule.destination;
        const currentPool = prev[dest];
        const newTotalSwept = currentPool.total_swept_all_time + total_swept;
        const newPortfolioVal = currentPool.current_portfolio_value + total_swept * 1.02; // slight appreciation

        let newUnits = currentPool.accumulated_units;
        if (dest === 'DIGITAL_GOLD') {
          const addedGrams = Number((total_swept / 7500).toFixed(4));
          const existingGrams = parseFloat(currentPool.accumulated_units);
          newUnits = `${(existingGrams + addedGrams).toFixed(4)} grams`;
        } else if (dest === 'LIQUID_FUND') {
          const addedUnits = Number((total_swept / 120).toFixed(2));
          const existing = parseFloat(currentPool.accumulated_units);
          newUnits = `${(existing + addedUnits).toFixed(2)} units`;
        } else {
          newUnits = `₹${newPortfolioVal.toLocaleString('en-IN')} principal`;
        }

        return {
          ...prev,
          [dest]: {
            ...currentPool,
            total_swept_all_time: newTotalSwept,
            current_portfolio_value: Math.round(newPortfolioVal),
            accumulated_units: newUnits,
          },
        };
      });

      setIsSimulatingSweep(false);
      onNotify(
        `UPI Transaction of ₹${finalAmount} on ${finalMerchant} rounded to ₹${rounded_amount}. ₹${total_swept} swept to ${
          rule.destination === 'DIGITAL_GOLD' ? '24K Digital Gold' : rule.destination === 'LIQUID_FUND' ? 'Liquid Fund' : 'High-Yield Reserve'
        }!`,
        'success'
      );
    }, 450);
  };

  const activePool = poolSummaries[rule.destination];

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              UPI Spare Change Auto-Investment & Micro-Rounding
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Zero Effort · Daily Micro-Wealth
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
            Every daily transaction via UPI, Swiggy, Zomato, or Uber automatically rounds up to the nearest ₹10 or ₹50. The spare difference is instantly swept into your high-yield destination pool.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <span className="text-[11px] text-slate-400 block font-mono">Current Pool Value:</span>
            <span className="text-lg font-bold font-mono text-amber-400">
              ₹{activePool.current_portfolio_value.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Rules Config + Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Smart Round-Up Rules Config */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Round-Up Engine Settings</h4>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">Active</span>
                <input
                  type="checkbox"
                  checked={rule.is_enabled}
                  onChange={(e) => setRule((prev) => ({ ...prev, is_enabled: e.target.checked }))}
                  className="accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Target Round-Up */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Round-Up Target Amount
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRule((prev) => ({ ...prev, round_to_nearest: 10 }))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    rule.round_to_nearest === 10
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Nearest ₹10 (Micro)
                </button>
                <button
                  type="button"
                  onClick={() => setRule((prev) => ({ ...prev, round_to_nearest: 50 }))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    rule.round_to_nearest === 50
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Nearest ₹50 (Recommended)
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                E.g. A ₹34 coffee rounds to ₹{rule.round_to_nearest === 10 ? '40' : '50'} (sweeping ₹{rule.round_to_nearest === 10 ? '6' : '16'}).
              </p>
            </div>

            {/* Accelerator Multiplier */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  Accelerator Multiplier Boost
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {rule.accelerator_multiplier}x Turbo
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {([1, 2, 3] as const).map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => setRule((prev) => ({ ...prev, accelerator_multiplier: mult }))}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      rule.accelerator_multiplier === mult
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {mult}x {mult === 1 ? 'Standard' : mult === 2 ? 'Double' : 'Triple'}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Pool */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Auto-Sweep Destination Pool
              </label>
              <div className="space-y-2">
                {(
                  [
                    {
                      id: 'DIGITAL_GOLD',
                      label: '24K 99.9% Digital Gold',
                      desc: 'Augmont/MMTC-PAMP backed gold with real-time vault storage',
                      badge: '9.2% CAGR',
                    },
                    {
                      id: 'LIQUID_FUND',
                      label: 'Overnight Liquid Debt Fund',
                      desc: 'Instant redemption T+0 mutual fund with zero exit loads',
                      badge: '6.85% APY',
                    },
                    {
                      id: 'HIGH_YIELD_SAVINGS',
                      label: 'High-Yield Reserve Vault',
                      desc: 'Scheduled automated transfer to high-yield 7.2% bank reserve',
                      badge: '7.2% APY',
                    },
                  ] as const
                ).map((pool) => (
                  <div
                    key={pool.id}
                    onClick={() =>
                      setRule((prev) => ({ ...prev, destination: pool.id as SpareChangeDestination }))
                    }
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      rule.destination === pool.id
                        ? 'bg-amber-950/30 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{pool.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {pool.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-snug">{pool.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sweep Frequency */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Sweep Frequency
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(
                  [
                    { id: 'INSTANT', label: 'Instant' },
                    { id: 'DAILY_MIDNIGHT', label: 'Daily Midnight' },
                    { id: 'WEEKLY_SUNDAY', label: 'Weekly Sun' },
                  ] as const
                ).map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setRule((prev) => ({ ...prev, sweep_frequency: freq.id }))}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                      rule.sweep_frequency === freq.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Year Micro-Compound Projection Widget */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              The Magic of Spare Change Compounding
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              At an average round-up of <strong className="text-white">₹42 per day</strong> invested at 9% annualized yield:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">1 Year</span>
                <span className="text-xs font-bold text-white">₹16,050</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">3 Years</span>
                <span className="text-xs font-bold text-white">₹54,200</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 bg-emerald-950/20">
                <span className="text-[10px] text-emerald-400 block font-bold">5 Years</span>
                <span className="text-xs font-extrabold text-emerald-400">₹1,02,400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive UPI Transaction Simulator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulator Console Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Interactive Live UPI Simulator</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Webhook Stream Listening
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-xs text-slate-400 font-medium block mb-2">
                Test with Real-Life UPI Merchant Triggers:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('Zomato Delivery', 382, 'Food & Dining')}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
                    <UtensilsCrossed className="h-3 w-3" />
                    <span>Zomato</span>
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">₹382</div>
                  <span className="text-[10px] text-slate-400 block font-mono">rounds to ₹400</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('Uber Cab Ride', 164, 'Travel')}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold">
                    <Car className="h-3 w-3" />
                    <span>Uber</span>
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">₹164</div>
                  <span className="text-[10px] text-slate-400 block font-mono">rounds to ₹200</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('Blinkit Quick Mart', 428, 'Groceries')}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                    <ShoppingBag className="h-3 w-3" />
                    <span>Blinkit</span>
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">₹428</div>
                  <span className="text-[10px] text-slate-400 block font-mono">rounds to ₹450</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('Chai Point Indiranagar', 35, 'Food & Dining')}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                    <Coffee className="h-3 w-3" />
                    <span>Chai Point</span>
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">₹35</div>
                  <span className="text-[10px] text-slate-400 block font-mono">rounds to ₹50</span>
                </button>
              </div>
            </div>

            {/* Custom Input Form */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                Or Simulate Custom Transaction:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Merchant Name</label>
                  <input
                    type="text"
                    value={customMerchant}
                    onChange={(e) => setCustomMerchant(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Amount Spent (₹)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Dynamic Preview Pill */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Debit:</span>
                  <span className="font-mono font-bold text-white">₹{customAmount}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-400">Rounded:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ₹{previewCalc.rounded_amount}
                  </span>
                </div>
                <div className="font-mono text-xs">
                  <span className="text-slate-400">Auto-Sweep: </span>
                  <span className="font-extrabold text-amber-400">
                    ₹{previewCalc.total_swept}
                  </span>
                  {rule.accelerator_multiplier > 1 && (
                    <span className="text-[10px] text-amber-300 ml-1">
                      ({rule.accelerator_multiplier}x)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSimulatePayment()}
                disabled={isSimulatingSweep}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isSimulatingSweep ? (
                  <>
                    <Zap className="h-4 w-4 animate-bounce text-slate-950" />
                    <span>Executing Instant UPI Round-Up & Sweep...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    <span>Simulate UPI Payment (Sweep ₹{previewCalc.total_swept})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Micro-Transactions Ledger */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-white">Recent UPI Spare Change Sweeps</h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {transactions.length} sweeps recorded
              </span>
            </div>

            <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 sm:px-5 hover:bg-slate-800/30 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{tx.merchant}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {tx.category}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Debited: ₹{tx.actual_amount} · Rounded: ₹{tx.rounded_amount} · {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-amber-400 flex items-center gap-1 justify-end">
                      <span>+₹{tx.total_swept}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      → {tx.destination === 'DIGITAL_GOLD' ? 'Digital Gold' : tx.destination === 'LIQUID_FUND' ? 'Liquid Fund' : 'High-Yield Reserve'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
