import React from 'react';
import { BoardSquare } from './BoardSquare';
import { SnakeLadderSvg } from './SnakeLadderSvg';
import { getGridSquaresInDisplayOrder } from '../utils/boardCoordinates';
import { Player } from '../types';
import { ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface BoardProps {
  players?: Player[];
  onSquareClick?: (squareNumber: number) => void;
  showLadders?: boolean;
  showSnakes?: boolean;
  textSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  players = [],
  onSquareClick,
  showLadders = true,
  showSnakes = true,
  textSize = 'medium',
  highContrast = false,
}) => {
  const displaySquares = getGridSquaresInDisplayOrder();

  return (
    <div className="printable-board-container w-full bg-white rounded-2xl shadow-md border-4 border-emerald-700 p-2 sm:p-4 text-slate-800">
      {/* Board Top Header */}
      <div className="mb-2 sm:mb-3 pb-2 border-b-2 border-emerald-600 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl sm:text-3xl">🐍🪜</span>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-950 tracking-tight leading-none">
              सुरक्षित बालबालिका, सुरक्षित समुदाय
            </h1>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
              PSEA सर्प र सिँढी खेल • "सहायता निःशुल्क हो (HELP IS FREE)"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-emerald-900">
            "केही गलत लागेमा विश्वसनीय व्यक्त्तिलाई भन्नुहोस्"
          </span>
        </div>
      </div>

      {/* 10x10 Board Grid with SVG Overlay */}
      <div className="relative w-full aspect-square border-2 border-slate-700 rounded-lg overflow-hidden bg-slate-100 shadow-inner">
        {/* The 10x10 HTML/CSS Grid */}
        <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
          {displaySquares.map((sqNum) => {
            const squarePlayers = players.filter((p) => p.position === sqNum);
            return (
              <BoardSquare
                key={sqNum}
                squareNumber={sqNum}
                players={squarePlayers}
                onClick={onSquareClick}
                textSize={textSize}
                highContrast={highContrast}
              />
            );
          })}
        </div>

        {/* SVG Snakes & Ladders Curves */}
        <SnakeLadderSvg
          showLadders={showLadders}
          showSnakes={showSnakes}
          opacity={0.88}
        />
      </div>

      {/* Board Bottom Footer Note */}
      <div className="mt-2.5 pt-2 border-t border-slate-300 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-slate-600 gap-1.5 font-medium">
        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          <span>सिँढी = सुरक्षित व्यवहार र ज्ञान</span>
          <span className="mx-1">•</span>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
          <span>सर्प = जोखिमपूर्ण वा असुरक्षित अवस्था</span>
        </div>
        <div className="text-slate-500 italic">
          नेपाली अंक (१ देखि १००) • PSEA बालबालिका संरक्षण कार्यक्रम
        </div>
      </div>
    </div>
  );
};
