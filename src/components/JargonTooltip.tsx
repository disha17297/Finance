import React, { useState } from 'react';
import { HelpCircle, Sparkles, BookOpen } from 'lucide-react';
import { JARGON_DICTIONARY } from '../services/vernacularService';

interface JargonTooltipProps {
  termKey: string;
  children?: React.ReactNode;
  onOpenJargonBuster?: () => void;
  className?: string;
}

export const JargonTooltip: React.FC<JargonTooltipProps> = ({
  termKey,
  children,
  onOpenJargonBuster,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const jargon = JARGON_DICTIONARY.find(
    (j) =>
      j.term.toLowerCase().includes(termKey.toLowerCase()) ||
      (j.short_acronym && j.short_acronym.toLowerCase() === termKey.toLowerCase())
  );

  if (!jargon) {
    return <span className={className}>{children || termKey}</span>;
  }

  return (
    <span
      className="relative inline-flex items-center gap-1 group cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={`underline decoration-dotted decoration-emerald-400/60 underline-offset-4 hover:text-emerald-300 transition-colors ${className}`}>
        {children || jargon.short_acronym || jargon.term}
      </span>
      <HelpCircle className="h-3 w-3 text-emerald-400/70 inline-block shrink-0" />

      {isOpen && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-slate-900/98 backdrop-blur-md border border-emerald-500/30 rounded-xl shadow-2xl text-xs text-slate-200 pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>{jargon.term} {jargon.short_acronym ? `(${jargon.short_acronym})` : ''}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {jargon.category}
            </span>
          </div>

          {/* Everyday Analogy */}
          <div className="mb-2.5">
            <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider block mb-0.5">
              Everyday Analogy:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {jargon.simple_everyday_analogy}
            </p>
          </div>

          {/* Regulatory Context */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[10.5px] text-slate-400 leading-snug mb-2.5">
            <strong className="text-slate-200 font-medium">SEBI/RBI Context: </strong>
            {jargon.indian_regulatory_context}
          </div>

          {onOpenJargonBuster && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenJargonBuster();
              }}
              className="w-full py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              <span>Open Jargon Buster & Literacy Hub</span>
            </button>
          )}

          {/* Tooltip triangle */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
};
