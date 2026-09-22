import React from 'react';
import { PhoneCall, ShieldCheck, Trophy, Lock, Dices } from 'lucide-react';

interface BoardRulesAndEmergencyProps {
  showGameRules?: boolean;
}

export const BoardRulesAndEmergency: React.FC<BoardRulesAndEmergencyProps> = ({
  showGameRules = false,
}) => {
  return (
    <div className="w-full mx-auto select-none">
      {/* 1. TOP BOX: GAME RULES CARD (Optional / Removed by default as requested) */}
      {showGameRules && (
        <div className="w-full mb-1.5 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-1.5 sm:border-2 border-blue-400 rounded-xl p-2 sm:p-2.5 shadow-xs flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-blue-200 pb-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-blue-700 text-white rounded-md shadow-2xs">
                <Dices className="w-3.5 h-3.5" />
              </span>
              <h3 className="text-xs sm:text-sm font-black text-blue-950">
                खेलका नियमहरू <span className="text-blue-700 font-semibold text-[11px] sm:text-xs">(Game Rules)</span>
              </h3>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-300">
              २ देखि ४ जना खेलाडी
            </span>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 text-left">
            <div className="bg-white/95 border border-slate-200 rounded-lg p-1.5 sm:p-2 flex items-start gap-1.5 sm:gap-2 shadow-2xs">
              <span className="w-5 h-5 shrink-0 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-[11px] mt-0.5 shadow-2xs">
                १
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs font-black text-slate-900 leading-snug">
                  पासा गुडाउनुहोस्
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-600 leading-snug mt-0.5 font-medium">
                  पासामा आएको अंक अनुसार गोटी अगाडि सार्नुहोस्।
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/90 border border-emerald-300 rounded-lg p-1.5 sm:p-2 flex items-start gap-1.5 sm:gap-2 shadow-2xs">
              <span className="w-5 h-5 shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-[11px] mt-0.5 shadow-2xs">
                २
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs font-black text-emerald-950 leading-snug flex items-center gap-1">
                  🪜 भर्‍याङ चढ्नुहोस्
                </div>
                <div className="text-[9px] sm:text-[10px] text-emerald-800 leading-snug mt-0.5 font-medium">
                  सुरक्षित तथा असल व्यवहारमा सिधै माथि पुगिन्छ।
                </div>
              </div>
            </div>

            <div className="bg-rose-50/90 border border-rose-300 rounded-lg p-1.5 sm:p-2 flex items-start gap-1.5 sm:gap-2 shadow-2xs">
              <span className="w-5 h-5 shrink-0 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-[11px] mt-0.5 shadow-2xs">
                ३
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs font-black text-rose-950 leading-snug flex items-center gap-1">
                  🐍 सर्पबाट जोगिनुहोस्
                </div>
                <div className="text-[9px] sm:text-[10px] text-rose-800 leading-snug mt-0.5 font-medium">
                  असुरक्षित वा गलत कार्यमा परेमा पुच्छरतर्फ झरिन्छ।
                </div>
              </div>
            </div>

            <div className="bg-amber-50/90 border border-amber-300 rounded-lg p-1.5 sm:p-2 flex items-start gap-1.5 sm:gap-2 shadow-2xs">
              <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[11px] mt-0.5 shadow-2xs">
                ४
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs font-black text-amber-950 leading-snug flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-600 shrink-0" /> १०० मा विजय
                </div>
                <div className="text-[9px] sm:text-[10px] text-amber-900 leading-snug mt-0.5 font-medium">
                  सबैभन्दा पहिले १०० मा पुग्ने खेलाडी विजेता बन्नेछ!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EMERGENCY HELPLINES BAR: Sleek, high-visibility, compact */}
      <div className="w-full bg-gradient-to-r from-red-700 via-rose-600 to-red-700 text-white border-2 border-red-800 rounded-xl px-2 sm:px-2.5 py-1.5 shadow-sm flex flex-col gap-1">
        {/* Header line with Confidentiality & Free Service Guarantee */}
        <div className="flex items-center justify-between px-0.5 text-[10px] sm:text-[11px] font-black">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span className="text-white font-extrabold">
              आपतकालीन तथा सहायता नम्बरहरू <span className="text-yellow-200 text-[9.5px] sm:text-[10.5px]">(Emergency Helplines):</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold">
            <span className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded text-emerald-200">
              <Lock className="w-2.5 h-2.5 text-emerald-300" /> पूर्ण गोप्य (Confidential)
            </span>
            <span className="bg-yellow-400 text-red-950 font-black px-2 py-0.5 rounded shadow-2xs">
              <ShieldCheck className="w-2.5 h-2.5 inline mr-0.5" />
              १००% निःशुल्क (Toll-Free)
            </span>
          </div>
        </div>

        {/* 4 Hotlines Grid - Single sleek horizontal strip */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-slate-900">
          {/* Hotline 1: 1098 */}
          <div className="bg-white rounded-lg px-2 py-1 flex items-center gap-2 shadow-2xs border border-red-200">
            <div className="bg-red-700 text-white font-black text-xs sm:text-sm px-1.5 py-0.5 rounded tracking-wider shrink-0 text-center">
              १०९८
            </div>
            <div className="flex flex-col justify-center min-w-0 leading-tight">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 truncate">
                बाल हेल्पलाइन
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] text-red-700 font-bold truncate">
                Child Helpline
              </span>
            </div>
          </div>

          {/* Hotline 2: 100 */}
          <div className="bg-white rounded-lg px-2 py-1 flex items-center gap-2 shadow-2xs border border-blue-200">
            <div className="bg-blue-800 text-white font-black text-xs sm:text-sm px-1.5 py-0.5 rounded tracking-wider shrink-0 text-center">
              १००
            </div>
            <div className="flex flex-col justify-center min-w-0 leading-tight">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 truncate">
                नेपाल प्रहरी
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] text-blue-800 font-bold truncate">
                Nepal Police
              </span>
            </div>
          </div>

          {/* Hotline 3: 104 */}
          <div className="bg-white rounded-lg px-2 py-1 flex items-center gap-2 shadow-2xs border border-amber-200">
            <div className="bg-amber-600 text-white font-black text-xs sm:text-sm px-1.5 py-0.5 rounded tracking-wider shrink-0 text-center">
              १०४
            </div>
            <div className="flex flex-col justify-center min-w-0 leading-tight">
              <span className="text-[11px] sm:text-xs font-black text-slate-900">
                बालबालिका खोजतलास
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] text-amber-800 font-bold truncate">
                Missing Child
              </span>
            </div>
          </div>

          {/* Hotline 4: 1145 */}
          <div className="bg-white rounded-lg px-2 py-1 flex items-center gap-2 shadow-2xs border border-purple-200">
            <div className="bg-purple-700 text-white font-black text-xs sm:text-sm px-1.5 py-0.5 rounded tracking-wider shrink-0 text-center">
              ११४५
            </div>
            <div className="flex flex-col justify-center min-w-0 leading-tight">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 truncate">
                महिला आयोग
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] text-purple-800 font-bold truncate">
                Women Helpline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
