import React from 'react';
import { PosterBoard } from './PosterBoard';
import { Player } from '../types';

interface Flex8x8BoardProps {
  players?: Player[];
  onSquareClick?: (squareNumber: number) => void;
  showLadders?: boolean;
  showSnakes?: boolean;
  numberFormat?: 'english' | 'nepali';
  textSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
}

/**
 * Flex8x8Board: Full-scale high-resolution board for giant flex banner printing
 * Incorporates the full awareness header, side awareness columns, central 10x10 board,
 * and bottom community landscape banner.
 */
export const Flex8x8Board: React.FC<Flex8x8BoardProps> = ({
  players = [],
  onSquareClick,
  showLadders = true,
  showSnakes = true,
  numberFormat = 'english',
  textSize = 'large',
  highContrast = false,
}) => {
  return (
    <div className="flex-8x8-board-wrapper w-full max-w-[1600px] mx-auto select-none">
      <PosterBoard
        players={players}
        onSquareClick={onSquareClick}
        showLadders={showLadders}
        showSnakes={showSnakes}
        numberFormat={numberFormat}
        textSize={textSize}
        highContrast={highContrast}
      />
    </div>
  );
};
