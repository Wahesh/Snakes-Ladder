import React from 'react';
import { SQUARE_INFO } from '../data/boardSquaresMap';
import { toNepaliNumber, LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';
import { Player } from '../types';
import bushImage from '../assets/images/poster-defaults/bush.png';

interface BoardSquareProps {
  squareNumber: number;
  players?: Player[];
  onClick?: (squareNumber: number) => void;
  numberFormat?: 'english' | 'nepali';
  textSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
}

export const BoardSquare: React.FC<BoardSquareProps> = ({
  squareNumber,
  players = [],
  onClick,
  numberFormat = 'english',
  textSize = 'medium',
  highContrast = false,
}) => {
  const info = SQUARE_INFO[squareNumber] || { num: squareNumber };

  const isSnakeHead = SNAKES.some((s) => s.head === squareNumber);
  const isLadderStart = LADDERS.some((l) => l.start === squareNumber);

  // Organized, rule-based background instead of ad-hoc per-square colors:
  // squares with a game mechanic get a consistent semantic color (ladder =
  // green, snake = red, question = gold, start/goal = their own accent),
  // and every other square falls into a two-tone checkerboard so the board
  // reads as a deliberate pattern rather than a random mix.
  const getSquareBgColor = () => {
    if (highContrast) return '#ffffff';
    if (info.isGoal) return '#fde68a';
    if (info.isStart) return '#bbf7d0';
    if (info.snakeTo !== undefined) return '#fecaca';
    if (info.ladderTo !== undefined || info.hasLadderIcon) return '#bbf7d0';
    if (info.isQuestion) return '#fef08a';
    const { rowFromTop, colFromLeft } = getSquareCoord(squareNumber);
    return (rowFromTop + colFromLeft) % 2 === 0 ? '#dbeafe' : '#ede9fe';
  };

  const getBorderClasses = () => {
    if (info.isGoal) return 'ring-2 ring-amber-500 border-2 border-amber-600 bg-amber-50/50';
    if (isSnakeHead) return 'border-2 border-red-500 shadow-2xs';
    if (isLadderStart) return 'border-2 border-emerald-600 shadow-2xs';
    if (info.isQuestion) return 'border-2 border-blue-400';
    return 'border border-slate-300';
  };

  const displayNumber =
    numberFormat === 'nepali' ? toNepaliNumber(squareNumber) : squareNumber.toString();

  // Generous font sizing optimized for print & large clear display so text NEVER clips
  const getTextSizeClass = (text: string) => {
    const len = text.length;

    if (textSize === 'small') {
      if (len <= 20) return 'text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-black leading-tight';
      if (len <= 38) return 'text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-black leading-tight';
      if (len <= 54) return 'text-[7px] sm:text-[7.5px] md:text-[8.5px] font-black leading-tight';
      return 'text-[6.5px] sm:text-[7px] md:text-[8px] font-black leading-tight';
    }

    if (textSize === 'large') {
      if (len <= 20) return 'text-[11px] sm:text-[12.5px] md:text-[14px] font-black leading-tight';
      if (len <= 38) return 'text-[9.5px] sm:text-[11px] md:text-[12.5px] font-black leading-tight';
      if (len <= 54) return 'text-[8.5px] sm:text-[9.8px] md:text-[11px] font-black leading-tight';
      return 'text-[7.5px] sm:text-[8.8px] md:text-[10px] font-black leading-tight';
    }

    // Default 'medium' - reduced for clean compact layout
    if (len <= 20) return 'text-[9.5px] sm:text-[11px] md:text-[12.5px] font-black leading-tight';
    if (len <= 38) return 'text-[8.5px] sm:text-[9.5px] md:text-[11px] font-black leading-tight';
    if (len <= 54) return 'text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-black leading-tight';
    return 'text-[7px] sm:text-[7.8px] md:text-[8.8px] font-black leading-tight';
  };

  const hasContentText = Boolean(info.text);

  return (
    <div
      id={`square-${squareNumber}`}
      onClick={() => onClick && onClick(squareNumber)}
      style={{
        backgroundColor: getSquareBgColor(),
      }}
      className={`relative w-full h-full aspect-square p-0.5 flex flex-col justify-between overflow-visible cursor-pointer select-none ${getBorderClasses()}`}
    >
      {/* 1. TOP-LEFT NUMBER BADGE (High-Contrast & Clearly Visible from Standing Height) */}
      <div className="absolute top-0.5 left-0.5 z-30 leading-none">
        <span
          className={`font-black tracking-tight px-1 py-0.5 rounded shadow-2xs border ${
            isSnakeHead
              ? 'bg-red-600 text-white border-red-700'
              : isLadderStart
              ? 'bg-emerald-700 text-white border-emerald-800'
              : info.isGoal
              ? 'bg-amber-400 text-slate-950 border-amber-600'
              : 'bg-white/95 text-slate-950 border-slate-500'
          } ${
            squareNumber >= 100
              ? 'text-[8.5px] sm:text-[9.5px] md:text-[10.5px]'
              : 'text-[9px] sm:text-[10px] md:text-[11px]'
          }`}
        >
          {displayNumber}
        </span>
      </div>

      {/* 2. TOP-RIGHT ICON BADGES (Static, Print-Safe) */}
      <div className="absolute top-0.5 right-0.5 z-30 leading-none flex items-center gap-0.5">
        {info.isGoal && (
          <span className="text-sm sm:text-base md:text-lg drop-shadow-xs" title="विजयी">
            🏆
          </span>
        )}

        {info.isQuestion && (
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-[9px] sm:text-[10px] shadow-xs border border-white">
            ?
          </div>
        )}

        {info.isStart && (
          <span className="text-[10px] sm:text-[11px] bg-white/90 rounded-full px-1 py-0.5 border border-emerald-500 shadow-2xs">
            🚀
          </span>
        )}
      </div>

      {/* 3. DECORATIVE CARTOON BUSH on otherwise-empty squares for visual variety */}
      {info.hasGrass && !hasContentText && (
        <img
          src={bushImage}
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full h-[85%] object-contain object-bottom pointer-events-none select-none"
          aria-hidden="true"
        />
      )}

      {/* 4. MAIN CONTENT: transparent text, always stacked above the snake/ladder SVG via z-index */}
      {hasContentText && (
        <div className="relative w-full h-full pt-5 sm:pt-5.5 md:pt-6 px-0.5 pb-1 flex flex-col items-center justify-start z-20 min-h-0 pointer-events-none">
          <div className="w-full flex-1 flex flex-col items-center justify-start p-0.5 text-center square-text-card">
            {info.isGoal ? (
              <div className="w-full flex flex-col items-center justify-center text-center px-0.5">
                <span className="block text-amber-950 font-black text-[8px] sm:text-[9px] md:text-[10px] leading-tight square-text-box">
                  बधाई छ
                </span>
                <span className="block text-amber-900 font-extrabold text-[6.5px] sm:text-[7.5px] md:text-[8.5px] leading-tight mt-0.5 square-text-box">
                  सुरक्षित समुदायको च्याम्पियन
                </span>
              </div>
            ) : info.isStart ? (
              <div className="w-full flex flex-col items-center justify-center text-center px-0.5">
                <span className="block font-black text-emerald-950 text-[9px] sm:text-[10px] md:text-[11px] leading-tight square-text-box">
                  शुरु यहाँबाट !
                </span>
                <span className="block font-extrabold text-emerald-800 text-[6.5px] sm:text-[7.5px] md:text-[8.5px] leading-tight mt-0.5 square-text-box">
                  START JUMP ZONE
                </span>
              </div>
            ) : (
              <p
                className={`font-black text-slate-950 text-center w-full break-words square-text-box ${getTextSizeClass(
                  info.text || ''
                )}`}
              >
                {info.text}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 5. PLAYER TOKENS (Static, Clear on Print) */}
      {players.length > 0 && (
        <div className="absolute bottom-0.5 right-0.5 flex flex-wrap items-center justify-end gap-0.5 z-30 pointer-events-none">
          {players.map((p) => (
            <div
              key={p.id}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center font-black text-[7px] sm:text-[8px] text-white"
              style={{ backgroundColor: p.color }}
              title={p.name}
            >
              {numberFormat === 'nepali' ? toNepaliNumber(p.id) : p.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
