import React from 'react';
import { PosterHeader } from './PosterHeader';
import { PosterLeftColumn } from './PosterLeftColumn';
import { PosterRightColumn } from './PosterRightColumn';
import { PosterBottomFooter } from './PosterBottomFooter';
import { BoardSquare } from './BoardSquare';
import { SnakeLadderSvg } from './SnakeLadderSvg';
import { BoardRulesAndEmergency } from './BoardRulesAndEmergency';
import { getGridSquaresInDisplayOrder } from '../utils/boardCoordinates';
import { Player } from '../types';

interface PosterBoardProps {
  players?: Player[];
  onSquareClick?: (squareNumber: number) => void;
  showLadders?: boolean;
  showSnakes?: boolean;
  numberFormat?: 'english' | 'nepali';
  textSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
  leftMessageColumns?: 1 | 2;
}

export const PosterBoard: React.FC<PosterBoardProps> = ({
  players = [],
  onSquareClick,
  showLadders = true,
  showSnakes = true,
  numberFormat = 'english',
  textSize = 'medium',
  highContrast = false,
  leftMessageColumns = 1,
}) => {
  const displaySquares = getGridSquaresInDisplayOrder();

  return (
    <div className="poster-board-canvas w-full h-full mx-auto bg-white rounded-xl shadow-xl border-4 sm:border-6 border-emerald-700 overflow-hidden flex flex-col justify-between select-none text-slate-800">
      {/* 1. TOP HEADER */}
      <PosterHeader />

      {/* 2. MIDDLE 3-COLUMN BODY: Left Messages + Center Board + Right Guidance */}
      <div className="flex-1 min-h-0 flex flex-row items-stretch w-full bg-slate-100 min-w-0 overflow-hidden">
        {/* Left Column (Key PSEA Messages) */}
        <div className="w-[18%] sm:w-[17%] lg:w-[16.5%] shrink-0 h-full overflow-hidden flex flex-col">
          <PosterLeftColumn columns={leftMessageColumns} />
        </div>

        {/* Center: The 10x10 Snakes & Ladders Board - MAXIMIZED GAME BOX */}
        <div className="flex-1 min-h-0 h-full py-1 px-1.5 sm:px-2 flex flex-col items-center justify-between bg-white min-w-0 overflow-hidden">
          <div className="relative aspect-square w-auto h-full max-h-[88%] sm:max-h-[89%] md:max-h-[90%] max-w-full mx-auto border-3 sm:border-4 md:border-5 border-slate-900 rounded-xl overflow-hidden bg-white shadow-xl">
            {/* The 10x10 HTML/CSS Grid */}
            <div className="grid grid-cols-10 grid-rows-10 w-full h-full aspect-square">
              {displaySquares.map((sqNum) => {
                const squarePlayers = players.filter((p) => p.position === sqNum);
                return (
                  <BoardSquare
                    key={sqNum}
                    squareNumber={sqNum}
                    players={squarePlayers}
                    onClick={onSquareClick}
                    numberFormat={numberFormat}
                    textSize={textSize}
                    highContrast={highContrast}
                  />
                );
              })}
            </div>

            {/* The SVG Overlay for Realistic Wooden Ladders & Funny Snakes (Static for Print) */}
            {(showLadders || showSnakes) && (
              <SnakeLadderSvg
                showLadders={showLadders}
                showSnakes={showSnakes}
                opacity={0.98}
              />
            )}
          </div>

          {/* SPACE BELOW BOARD: Emergency Helplines Only (Game rules removed for maximized board size) */}
          <div className="w-full shrink-0 mt-1">
            <BoardRulesAndEmergency showGameRules={false} />
          </div>
        </div>

        {/* Right Column (Protection Guidance: Exploitation, Abuse, Harassment) */}
        <div className="w-[18%] sm:w-[17%] lg:w-[16.5%] shrink-0 h-full overflow-hidden flex flex-col">
          <PosterRightColumn />
        </div>
      </div>

      {/* 3. BOTTOM FOOTER */}
      <PosterBottomFooter />
    </div>
  );
};
