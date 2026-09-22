import React from 'react';
import { FACILITATOR_CORNER, SPECIAL_SQUARES, toNepaliNumber } from '../data/pseaData';
import { AlertOctagon, HelpCircle, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';

export const FacilitatorGuide: React.FC = () => {
  return (
    <div className="space-y-4 avoid-break">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 to-red-800 text-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <AlertOctagon className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-rose-200 font-semibold">
              सहजकर्ता कुना (Facilitator Reference Guide)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {FACILITATOR_CORNER.title}
            </h2>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-rose-100 leading-relaxed">
          मानवीय सहायता, राहत वा विकास गतिविधिहरूमा संलग्न कुनै पनि कर्मचारी, स्वयंसेवक वा प्रतिनिधिहरूले बालबालिका तथा समुदायमाथि कुनै प्रकारको शोषण, दुर्व्यवहार वा उत्पीडन गर्न पूर्णतया निषेध छ।
        </p>
      </div>

      {/* 3 Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {FACILITATOR_CORNER.categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-rose-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-sm sm:text-base text-rose-950">
                  {cat.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-1.5 text-xs text-slate-800 leading-snug">
                    <span className="text-rose-600 font-bold shrink-0">🚫</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-rose-800 font-medium bg-rose-50/50 p-1.5 rounded">
              ⚠️ यस्तो अवस्था देखिएमा तत्काल सुरक्षित रिपोर्टिङ संयन्त्रमा उजुरी गर्नुहोस्।
            </div>
          </div>
        ))}
      </div>

      {/* Special Squares Q&A Reference Guide for Facilitator */}
      <div className="bg-white border border-indigo-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-100">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-indigo-950">
            विशेष सिकाइ घरहरू: छलफल निर्देशिका (Discussion Prompts)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SPECIAL_SQUARES.map((sq) => (
            <div
              key={sq.square}
              className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs flex flex-col justify-between"
            >
              <div>
                <span className="inline-block font-bold text-indigo-900 mb-1 px-1.5 py-0.5 bg-indigo-200/80 rounded text-[11px]">
                  घर नं. {toNepaliNumber(sq.square)}
                </span>
                <p className="font-semibold text-slate-900 mb-1.5 leading-snug">
                  {sq.icon} {sq.question}
                </p>
              </div>
              {sq.answer ? (
                <div className="mt-1 text-emerald-800 font-bold bg-emerald-100/80 p-1.5 rounded border border-emerald-300">
                  ✅ उत्तर: {sq.answer}
                </div>
              ) : sq.hint ? (
                <div className="mt-1 text-indigo-800 text-[11px] bg-white/80 p-1.5 rounded border border-indigo-100">
                  💡 छलफल बुँदा: {sq.hint}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
