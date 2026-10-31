import React, { useState } from 'react';
import {
  Languages,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  HelpCircle,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Share2,
  Tv,
  Award,
  ArrowRight,
} from 'lucide-react';
import {
  RegionalLanguageCode,
  VernacularModule,
  JargonTerm,
} from '../types/finance';
import {
  SUPPORTED_LANGUAGES,
  VERNACULAR_MODULES,
  JARGON_DICTIONARY,
  speakRegionalText,
  stopRegionalSpeech,
} from '../services/vernacularService';

interface VernacularLiteracyViewProps {
  onNotify: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const VernacularLiteracyView: React.FC<VernacularLiteracyViewProps> = ({
  onNotify,
}) => {
  const [selectedLang, setSelectedLang] = useState<RegionalLanguageCode>('hi'); // Default Hindi
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [literacyMode, setLiteracyMode] = useState<'ANALOGY' | 'PRO'>('ANALOGY');
  const [jargonSearchQuery, setJargonSearchQuery] = useState<string>('');

  // Quiz state for active module
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const activeModule = VERNACULAR_MODULES[activeModuleIndex];

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      stopRegionalSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToSpeak = activeModule.audio_narrative_text[selectedLang] || activeModule.audio_narrative_text['en'];
      speakRegionalText(textToSpeak, selectedLang, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleSelectModule = (index: number) => {
    stopRegionalSpeech();
    setIsPlayingAudio(false);
    setActiveModuleIndex(index);
    setSelectedQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null) return;
    setIsQuizSubmitted(true);
    const isCorrect = selectedQuizAnswer === activeModule.quiz.correct_option_index;
    if (isCorrect) {
      onNotify('Correct! You earned +50 Financial Literacy XP!', 'success');
    } else {
      onNotify('Review the explanation to reinforce your learning.', 'info');
    }
  };

  const filteredJargon = JARGON_DICTIONARY.filter((j) => {
    const q = jargonSearchQuery.toLowerCase();
    return (
      j.term.toLowerCase().includes(q) ||
      (j.short_acronym && j.short_acronym.toLowerCase().includes(q)) ||
      j.simple_everyday_analogy.toLowerCase().includes(q) ||
      j.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Language Bar & Welcome */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Vernacular Financial Literacy Hub</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  7 Indian Languages
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Bite-sized regional audio/video reels breaking down complex Indian financial instruments in your mother tongue.
              </p>
            </div>
          </div>

          {/* Language Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  stopRegionalSpeech();
                  setIsPlayingAudio(false);
                  setSelectedLang(lang.code);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLang === lang.code
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/30">
                  {lang.flag_or_badge}
                </span>
                <span>{lang.native_name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Reel Player + Module List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Reel & Audio Narration Card */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Reel Header / Topic */}
            <div className="p-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tv className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold font-mono text-purple-300 uppercase tracking-wider">
                  {activeModule.topic} Reel · {activeModule.level}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                ⏱ {activeModule.duration_seconds}s Bite-Sized
              </span>
            </div>

            {/* Simulated Reel Screen */}
            <div className="p-6 bg-slate-950 relative overflow-hidden flex flex-col justify-between min-h-[260px] border-b border-slate-800">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Regional Audio Narration
                </span>
                <h4 className="mt-3 text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {activeModule.title[selectedLang] || activeModule.title['en']}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-xl">
                  {activeModule.summary[selectedLang] || activeModule.summary['en']}
                </p>
              </div>

              {/* Audio Waveform & Player Controls */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-4 w-4 text-white" />
                      <span>Pause Narration</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 text-white fill-white" />
                      <span>Listen in {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.native_name}</span>
                    </>
                  )}
                </button>

                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-1">
                  {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlayingAudio ? 'bg-purple-400 animate-pulse' : 'bg-slate-700'
                      }`}
                      style={{
                        height: isPlayingAudio ? `${h * 0.35}px` : '10px',
                        animationDelay: `${i * 80}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Vernacular Transcript Box */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block mb-1">
                  Audio Script Transcript ({SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.native_name}):
                </span>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                  "{activeModule.script_transcript[selectedLang] || activeModule.script_transcript['en']}"
                </div>
              </div>

              {/* Key Takeaways */}
              <div>
                <span className="text-[11px] font-semibold uppercase text-emerald-400 tracking-wider block mb-2">
                  Key Takeaways:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(activeModule.key_takeaways[selectedLang] || activeModule.key_takeaways['en']).map(
                    (takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Interactive Regional Quiz */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-400" />
                    Quick Knowledge Check
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">+50 XP</span>
                </div>

                <p className="text-xs font-semibold text-white">
                  {activeModule.quiz.question[selectedLang] || activeModule.quiz.question['en']}
                </p>

                <div className="space-y-2">
                  {(activeModule.quiz.options[selectedLang] || activeModule.quiz.options['en']).map(
                    (optionText, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = idx === activeModule.quiz.correct_option_index;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (!isQuizSubmitted) setSelectedQuizAnswer(idx);
                          }}
                          disabled={isQuizSubmitted}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border flex items-center justify-between cursor-pointer ${
                            isQuizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                                : isSelected
                                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                              : isSelected
                              ? 'bg-purple-950/50 border-purple-500 text-white font-semibold'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <span>{optionText}</span>
                          {isQuizSubmitted && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                          {isQuizSubmitted && isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                {!isQuizSubmitted ? (
                  <button
                    type="button"
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizAnswer === null}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedQuizAnswer !== null
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-white">Explanation: </strong>
                    {activeModule.quiz.explanation[selectedLang] || activeModule.quiz.explanation['en']}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Module Playlist + Searchable Jargon Buster */}
        <div className="lg:col-span-5 space-y-6">
          {/* Playlist Selector */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Tv className="h-4 w-4 text-purple-400" />
              <span>Available Vernacular Modules</span>
            </h4>

            <div className="space-y-2">
              {VERNACULAR_MODULES.map((mod, idx) => (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeModuleIndex === idx
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-md ring-1 ring-purple-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white line-clamp-1">
                      {mod.title[selectedLang] || mod.title['en']}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 shrink-0 ml-2">
                      {mod.duration_seconds}s
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.summary[selectedLang] || mod.summary['en']}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Jargon Buster Dictionary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Financial Jargon Buster</h4>
              </div>

              {/* Mode Toggle: Everyday Analogy vs CFA Pro */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setLiteracyMode('ANALOGY')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    literacyMode === 'ANALOGY'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  Everyday Analogy
                </button>
                <button
                  type="button"
                  onClick={() => setLiteracyMode('PRO')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    literacyMode === 'PRO'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  CFA Pro
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search AIF, PMS, MLD, REIT, STCL..."
                value={jargonSearchQuery}
                onChange={(e) => setJargonSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500"
              />
            </div>

            {/* Jargon List */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredJargon.map((term, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      {term.term} {term.short_acronym ? `(${term.short_acronym})` : ''}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {term.category}
                    </span>
                  </div>

                  {literacyMode === 'ANALOGY' ? (
                    <div>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                        Simple Everyday Analogy:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                        {term.simple_everyday_analogy}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block">
                        Technical Definition:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                        {term.technical_definition}
                      </p>
                    </div>
                  )}

                  <div className="pt-1.5 border-t border-slate-900 text-[10px] text-slate-400">
                    <strong className="text-slate-300">SEBI / Regulatory Rule: </strong>
                    {term.indian_regulatory_context}
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
