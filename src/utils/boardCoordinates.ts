/**
 * Snakes and Ladders 10x10 coordinate calculations
 * Standard zigzag (Boustrophedon):
 * Row 1 (bottom): 1 to 10 (left to right)
 * Row 2: 20 to 11 (right to left)
 * Row 3: 21 to 30 (left to right)
 * Row 4: 40 to 31 (right to left)
 * Row 5: 41 to 50 (left to right)
 * Row 6: 60 to 51 (right to left)
 * Row 7: 61 to 70 (left to right)
 * Row 8: 80 to 71 (right to left)
 * Row 9: 81 to 90 (left to right)
 * Row 10 (top): 100 to 91 (left to right where 100 is top-left, 91 is top-right)
 */

export interface SquareCoord {
  square: number;
  rowFromTop: number; // 0 (top) to 9 (bottom)
  colFromLeft: number; // 0 (left) to 9 (right)
  centerXPercent: number; // 0% to 100%
  centerYPercent: number; // 0% to 100%
}

export function getSquareCoord(square: number): SquareCoord {
  const clamped = Math.max(1, Math.min(100, square));
  const rowFromBottom = Math.floor((clamped - 1) / 10); // 0 (bottom) to 9 (top)
  const rowFromTop = 9 - rowFromBottom;
  
  const isEvenRowFromBottom = rowFromBottom % 2 === 0;
  const colFromLeft = isEvenRowFromBottom
    ? (clamped - 1) % 10
    : 9 - ((clamped - 1) % 10);

  const centerXPercent = (colFromLeft + 0.5) * 10;
  const centerYPercent = (rowFromTop + 0.5) * 10;

  return {
    square: clamped,
    rowFromTop,
    colFromLeft,
    centerXPercent,
    centerYPercent,
  };
}

// Generate an array of 100 squares sorted in grid visual order (top-left 100 to bottom-right 10)
export function getGridSquaresInDisplayOrder(): number[] {
  const result: number[] = [];
  for (let rowFromTop = 0; rowFromTop < 10; rowFromTop++) {
    const rowFromBottom = 9 - rowFromTop;
    const isEvenRowFromBottom = rowFromBottom % 2 === 0;
    const startOfRow = rowFromBottom * 10 + 1;
    
    if (isEvenRowFromBottom) {
      // row was counted left to right: startOfRow, startOfRow + 1, ...
      for (let c = 0; c < 10; c++) {
        result.push(startOfRow + c);
      }
    } else {
      // row was counted right to left: 100 down to 91, or 80 down to 71, etc.
      for (let c = 9; c >= 0; c--) {
        result.push(startOfRow + c);
      }
    }
  }
  return result;
}
