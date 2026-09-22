import React, { useState } from 'react';
import {
  toNepaliNumber,
  LADDERS,
  SNAKES,
  SPECIAL_SQUARES,
  VICTORY_MESSAGE_100,
} from '../data/pseaData';
import { X, Award, ShieldCheck, AlertTriangle, HelpCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SquareDetailModalProps {
  squareNumber: number | null;
  onClose: () => void;
}

export const SquareDetailModal: React.FC<SquareDetailModalProps> = ({
  squareNumber,
  onClose,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (squareNumber === null) return null;

  const nepaliNum = toNepaliNumber(squareNumber);
  const ladderStart = LADDERS.find((l) => l.start === squareNumber);
  const ladderEnd = LADDERS.find((l) => l.end === squareNumber);
  const snakeHead = SNAKES.find((s) => s.head === squareNumber);
  const snakeTail = SNAKES.find((s) => s.tail === squareNumber);
  const special = SPECIAL_SQUARES.find((sq) => sq.square === squareNumber);
  const is100 = squareNumber === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
        {/* Header */}
        <div
          className={`px-5 py-4 text-white flex items-center justify-between ${
            is100
              ? 'bg-gradient-to-r from-amber-600 to-yellow-600'
              : ladderStart
              ? 'bg-gradient-to-r from-emerald-700 to-teal-700'
              : snakeHead
              ? 'bg-gradient-to-r from-rose-700 to-red-800'
              : special
              ? 'bg-gradient-to-r from-indigo-700 to-purple-800'
              : 'bg-gradient-to-r from-slate-700 to-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl font-black">
              {nepaliNum}
            </span>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">
                {is100
                  ? 'गन्तव्य घर १०० - विजय!'
                  : ladderStart
                  ? `सिँढी घर (४ बाट ${toNepaliNumber(ladderStart.end)} मा उक्लिन्छ)`
                  : snakeHead
                  ? `सर्पको मुख (झरेर ${toNepaliNumber(snakeHead.tail)} मा पुग्छ)`
                  : special
                  ? 'विशेष सिकाइ तथा छलफल घर'
                  : `घर नं. ${nepaliNum}`}
              </h3>
              <p className="text-xs opacity-90">PSEA बालबालिका संरक्षण सिकाइ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Square 100 Victory */}
          {is100 && (
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl text-center">
                <div className="text-3xl mb-1">🏆</div>
                <h4 className="text-xl font-extrabold text-amber-900">
                  {VICTORY_MESSAGE_100.title}
                </h4>
                <p className="text-sm font-semibold text-amber-800">
                  {VICTORY_MESSAGE_100.subtitle}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm text-slate-900">
                  गन्तव्यमा पुगेपछि मनन गर्नुपर्ने मुख्य बुँदाहरू:
                </h5>
                <ul className="space-y-1.5 text-sm text-slate-800">
                  {VICTORY_MESSAGE_100.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-emerald-600 font-bold shrink-0">✅</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Ladder Message */}
          {ladderStart && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl flex items-start gap-3">
                <ArrowUpRight className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-emerald-950">
                    सुरक्षित आचरण: तपाईं सिँढी उक्लिनुभयो!
                  </h4>
                  <p className="text-base font-medium text-emerald-900 mt-1 leading-relaxed">
                    "{ladderStart.message}"
                  </p>
                  <p className="text-xs text-emerald-700 mt-2 font-semibold">
                    सिँढी {nepaliNum} बाट सुरु भई {toNepaliNumber(ladderStart.end)} मा पुग्यो।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Snake Message */}
          {snakeHead && (
            <div className="space-y-3">
              <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-start gap-3">
                <ArrowDownRight className="w-7 h-7 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-rose-950">
                    जोखिम वा असुरक्षित व्यवहार: सर्पले डस्यो!
                  </h4>
                  <p className="text-base font-medium text-rose-900 mt-1 leading-relaxed">
                    "{snakeHead.message}"
                  </p>
                  <p className="text-xs text-rose-700 mt-2 font-semibold">
                    सर्पको मुख {nepaliNum} बाट पुच्छर {toNepaliNumber(snakeHead.tail)} मा झर्‍यो।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Special Square Question */}
          {special && (
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 border-2 border-indigo-300 rounded-xl">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                  {special.icon} सोच्नुहोस् र उत्तर दिनुहोस्:
                </span>
                <p className="text-lg font-bold text-indigo-950 mt-1">
                  {special.question}
                </p>

                {special.hint && (
                  <div className="mt-2 text-xs text-indigo-800 bg-white/70 p-2 rounded border border-indigo-200">
                    💡 <strong>संकेत:</strong> {special.hint}
                  </div>
                )}

                {special.answer && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      {showAnswer ? 'उत्तर लुकाउनुहोस्' : 'उत्तर हेर्नुहोस्'}
                    </button>
                    {showAnswer && (
                      <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-sm text-emerald-950 font-bold">
                        {special.answer}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* General Square */}
          {!is100 && !ladderStart && !snakeHead && !special && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-base font-medium text-slate-700">
                घर नं. {nepaliNum} - अगाडि बढ्नुहोस्!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                सुरक्षित समुदायतर्फको तपाईंको यात्रा निरन्तर अघि बढिरहेको छ।
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm rounded-lg transition-colors"
          >
            बन्द गर्नुहोस् (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
