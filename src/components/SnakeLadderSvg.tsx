import React from 'react';
import { LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';
import snakeRedImg from '../assets/images/snakes/snake-red.png';

interface SnakeLadderSvgProps {
  showLadders?: boolean;
  showSnakes?: boolean;
  opacity?: number;
}

// Snake artwork: static PNG stickers (cartoon, transparent background) placed as a
// single rigid image per snake, rotated and scaled so its head lands exactly on the
// head square and its tail lands exactly on the tail square (a 2-point similarity
// transform). More colors can be added to SNAKE_IMAGES later.
const SNAKE_IMAGES: string[] = [snakeRedImg];

// Natural pixel size of the artwork, and where its head/tail anchor points sit
// within that pixel space (head = top of head, tail = tip of tail).
const SNAKE_IMAGE_WIDTH = 768;
const SNAKE_IMAGE_HEIGHT = 1376;
const SNAKE_HEAD_ANCHOR = { x: 393, y: 56 };
const SNAKE_TAIL_ANCHOR = { x: 436, y: 1310 };

export const SnakeLadderSvg: React.FC<SnakeLadderSvgProps> = ({
  showLadders = true,
  showSnakes = true,
  opacity = 0.98,
}) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity }}
    >
      <defs>
        {/* Realistic Wooden Ladder Gradients */}
        <linearGradient id="woodRailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="30%" stopColor="#854d0e" />
          <stop offset="70%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#713f12" />
        </linearGradient>

        <linearGradient id="woodRungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="80%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>

      {/* ========================================================================= */}
      {/* 1. REALISTIC WOODEN LADDERS WITH SHARP PRINT CONTOURS                     */}
      {/* ========================================================================= */}
      {showLadders &&
        LADDERS.map((ladder, idx) => {
          const start = getSquareCoord(ladder.start);
          const end = getSquareCoord(ladder.end);

          // Ladder bottom starts from UPPER MIDDLE of start square:
          const x1 = (start.colFromLeft + 0.5) * 100;
          const y1 = start.rowFromTop * 100 + 22;

          // Ladder end lands on LOWER MIDDLE of end square:
          const x2 = (end.colFromLeft + 0.5) * 100;
          const y2 = end.rowFromTop * 100 + 78;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len === 0) return null;

          const halfWidth = 14;
          const perpX = (-dy / len) * halfWidth;
          const perpY = (dx / len) * halfWidth;

          // Rail coordinates
          const r1x1 = x1 + perpX;
          const r1y1 = y1 + perpY;
          const r1x2 = x2 + perpX;
          const r1y2 = y2 + perpY;

          const r2x1 = x1 - perpX;
          const r2y1 = y1 - perpY;
          const r2x2 = x2 - perpX;
          const r2y2 = y2 - perpY;

          // Rungs
          const rungSpacing = 32;
          const numRungs = Math.max(3, Math.floor(len / rungSpacing));
          const rungs = [];
          for (let i = 1; i < numRungs; i++) {
            const t = i / numRungs;
            const rx1 = r1x1 + (r1x2 - r1x1) * t;
            const ry1 = r1y1 + (r1y2 - r1y1) * t;
            const rx2 = r2x1 + (r2x2 - r2x1) * t;
            const ry2 = r2y1 + (r2y2 - r2y1) * t;
            rungs.push({ rx1, ry1, rx2, ry2, id: i });
          }

          return (
            <g key={`ladder-${idx}`}>
              {/* Dark Outlines for crisp print reproduction */}
              <line x1={r1x1} y1={r1y1} x2={r1x2} y2={r1y2} stroke="#1e0a02" strokeWidth="8.5" strokeLinecap="round" />
              <line x1={r2x1} y1={r2y1} x2={r2x2} y2={r2y2} stroke="#1e0a02" strokeWidth="8.5" strokeLinecap="round" />

              {/* Wooden Rungs */}
              {rungs.map((rung) => (
                <g key={`rung-${rung.id}`}>
                  <line x1={rung.rx1} y1={rung.ry1} x2={rung.rx2} y2={rung.ry2} stroke="#1e0a02" strokeWidth="8" strokeLinecap="round" />
                  <line x1={rung.rx1} y1={rung.ry1} x2={rung.rx2} y2={rung.ry2} stroke="url(#woodRungGrad)" strokeWidth="6" strokeLinecap="round" />
                  <line x1={rung.rx1} y1={rung.ry1} x2={rung.rx2} y2={rung.ry2} stroke="#fef08a" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" />
                  {/* Timber joinery pegs */}
                  <circle cx={rung.rx1} cy={rung.ry1} r="2.5" fill="#1e0a02" />
                  <circle cx={rung.rx1} cy={rung.ry1} r="1" fill="#f59e0b" />
                  <circle cx={rung.rx2} cy={rung.ry2} r="2.5" fill="#1e0a02" />
                  <circle cx={rung.rx2} cy={rung.ry2} r="1" fill="#f59e0b" />
                </g>
              ))}

              {/* Rails fill */}
              <line x1={r1x1} y1={r1y1} x2={r1x2} y2={r1y2} stroke="url(#woodRailGrad)" strokeWidth="6.5" strokeLinecap="round" />
              <line x1={r1x1} y1={r1y1} x2={r1x2} y2={r1y2} stroke="#fef08a" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />

              <line x1={r2x1} y1={r2y1} x2={r2x2} y2={r2y2} stroke="url(#woodRailGrad)" strokeWidth="6.5" strokeLinecap="round" />
              <line x1={r2x1} y1={r2y1} x2={r2x2} y2={r2y2} stroke="#fef08a" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />

              {/* Wooden end caps */}
              <circle cx={r1x1} cy={r1y1} r="4" fill="#1e0a02" />
              <circle cx={r2x1} cy={r2y1} r="4" fill="#1e0a02" />
              <circle cx={r1x2} cy={r1y2} r="4" fill="#1e0a02" />
              <circle cx={r2x2} cy={r2y2} r="4" fill="#1e0a02" />
            </g>
          );
        })}

      {/* ========================================================================= */}
      {/* 2. FRIENDLY CARTOON SNAKES (STATIC & SHARP FOR PRINT)                      */}
      {/* ========================================================================= */}
      {showSnakes &&
        SNAKES.map((snake, idx) => {
          const snakeImg = SNAKE_IMAGES[idx % SNAKE_IMAGES.length];
          const head = getSquareCoord(snake.head);
          const tail = getSquareCoord(snake.tail);

          // Head of snake tucked tightly into the upper-right corner of the box:
          const hx = head.colFromLeft * 100 + 84;
          const hy = head.rowFromTop * 100 + 16;

          // Tail on upper right or left corner of the box:
          const tailCornerLeft = tail.colFromLeft <= head.colFromLeft;
          const tx = tailCornerLeft
            ? tail.colFromLeft * 100 + 22 // upper left corner
            : tail.colFromLeft * 100 + 78; // upper right corner
          const ty = tail.rowFromTop * 100 + 24; // upper corner

          const dx = tx - hx;
          const dy = ty - hy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // The artwork is a fixed pose, so it's placed as one rigid image: a
          // 2-point similarity transform (rotate + uniform scale, no distortion)
          // that maps the art's head anchor onto the head square and its tail
          // anchor onto the tail square.
          const localDx = SNAKE_TAIL_ANCHOR.x - SNAKE_HEAD_ANCHOR.x;
          const localDy = SNAKE_TAIL_ANCHOR.y - SNAKE_HEAD_ANCHOR.y;
          const localDist = Math.sqrt(localDx * localDx + localDy * localDy);

          const scale = dist / localDist;
          const rotationDeg =
            (Math.atan2(dy, dx) - Math.atan2(localDy, localDx)) * (180 / Math.PI);

          return (
            <image
              key={`snake-${idx}`}
              href={snakeImg}
              x={0}
              y={0}
              width={SNAKE_IMAGE_WIDTH}
              height={SNAKE_IMAGE_HEIGHT}
              transform={`translate(${hx} ${hy}) rotate(${rotationDeg}) scale(${scale}) translate(${-SNAKE_HEAD_ANCHOR.x} ${-SNAKE_HEAD_ANCHOR.y})`}
            />
          );
        })}
    </svg>
  );
};
