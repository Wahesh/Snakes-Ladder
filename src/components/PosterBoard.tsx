import React, { useLayoutEffect, useRef, useState } from 'react';
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

  // Precisely stretch the game board to fill whatever rectangular space is
  // actually available in the center column (full width, full height minus
  // the emergency bar below it), instead of relying on CSS aspect-ratio +
  // max-height heuristics that left unpredictable gaps because they don't
  // know the emergency bar's real rendered height. The board is allowed to
  // be non-square (e.g. portrait A3) since the SVG overlay already uses
  // preserveAspectRatio="none" and the CSS grid cells size independently
  // per axis, so both stretch cleanly to fill either shape with no gaps.
  const centerColRef = useRef<HTMLDivElement>(null);
  const emergencyBarRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const centerCol = centerColRef.current;
    const emergencyBar = emergencyBarRef.current;
    if (!centerCol || !emergencyBar) return;

    const recompute = () => {
      const colStyle = getComputedStyle(centerCol);
      const paddingX = parseFloat(colStyle.paddingLeft) + parseFloat(colStyle.paddingRight);
      const paddingY = parseFloat(colStyle.paddingTop) + parseFloat(colStyle.paddingBottom);
      const availableWidth = centerCol.clientWidth - paddingX;
      const emergencyBarStyle = getComputedStyle(emergencyBar);
      const emergencyBarSpace = emergencyBar.offsetHeight + parseFloat(emergencyBarStyle.marginTop);
      const availableHeight = centerCol.clientHeight - paddingY - emergencyBarSpace;
      setBoardSize({
        width: Math.max(0, availableWidth),
        height: Math.max(0, availableHeight),
      });
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(centerCol);
    observer.observe(emergencyBar);
    return () => observer.disconnect();
  }, []);

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
        <div
          ref={centerColRef}
          className="flex-1 min-h-0 h-full py-1 px-1.5 sm:px-2 flex flex-col items-center justify-between bg-white min-w-0 overflow-hidden"
        >
          <div
            className="relative border-3 sm:border-4 md:border-5 border-slate-900 rounded-xl overflow-hidden bg-white shadow-xl shrink-0"
            style={{ width: boardSize?.width ?? 0, height: boardSize?.height ?? 0 }}
          >
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
          <div ref={emergencyBarRef} className="w-full shrink-0 mt-1">
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
