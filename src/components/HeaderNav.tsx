import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Calculator,
  Coins,
  Building2,
  Languages,
  Sliders,
  FileText,
  Network,
  TrendingUp,
} from 'lucide-react';

export type AppNavTab =
  | 'dashboard'
  | 'tax'
  | 'upi'
  | 'alternative'
  | 'literacy'
  | 'simulator';

interface HeaderNavProps {
  onOpenGraph: () => void;
  onOpenReview: () => void;
  activeTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenGraph,
  onOpenReview,
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="sticky top-0 z-40 w-full flex flex-col">
      {/* Top Guardrail Compliance Banner */}
      <aside
        aria-label="Compliance disclaimer"
        className="bg-amber-950/90 border-b border-amber-600/30 text-amber-200 px-4 py-1.5 text-xs flex items-center justify-between shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-center sm:text-left">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="font-semibold text-amber-300">Educational & Scenario Modeling Tool Only:</strong>{' '}
            Nivesha provides behavioral coaching, pattern analysis, and projection models; it does <em>not</em> provide financial advice or recommend specific securities.
          </span>
        </div>
      </aside>

      {/* Main Header Navigation Bar */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo Lockup */}
            <div
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 text-slate-950 font-black group-hover:scale-105 transition-transform">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-white">NIVESHA</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap hidden sm:inline-block">
                    v2.5 Smart Model
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 hidden md:block">
                  Your Money Your Way · Living Financial Model
                </p>
              </div>
            </div>

            {/* Navigation Tab Links */}
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              <button
                type="button"
                onClick={() => onSelectTab('dashboard')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('tax')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'tax'
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                <span>Tax & Harvesting</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('upi')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'upi'
                    ? 'text-amber-400 bg-amber-950/60 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Coins className="h-3.5 w-3.5" />
                <span>UPI Spare Change</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('alternative')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'alternative'
                    ? 'text-blue-400 bg-blue-950/60 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Alt Assets</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('literacy')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'literacy'
                    ? 'text-purple-400 bg-purple-950/60 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Languages className="h-3.5 w-3.5" />
                <span>Vernacular Hub</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('simulator')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'simulator'
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>What-If Lab</span>
              </button>
            </nav>

            {/* Quick Action Modal Triggers */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenGraph}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                title="View living knowledge graph"
              >
                <Network className="h-3.5 w-3.5 text-emerald-400" />
                <span>Knowledge Graph</span>
              </button>

              <button
                type="button"
                onClick={onOpenReview}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Monthly Review</span>
                <span className="sm:hidden">Review</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
