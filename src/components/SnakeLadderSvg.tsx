import React from 'react';
import { LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';

interface SnakeLadderSvgProps {
  showLadders?: boolean;
  showSnakes?: boolean;
  opacity?: number;
}

// Friendly Cartoon Snake Palettes (Static Vector Art for Print)
// Styled after a classic thick-bodied, round-eyed, scaled cartoon snake look:
// one consistent friendly face template, varied only by color per snake.
interface SnakeTheme {
  id: string;
  bodyColor: string;
  bodyColorShade: string;
  tongueColor: string;
  patternType: 'scales' | 'bands';
  scalesColor?: string;
  bandColor?: string;
}

const SNAKE_THEMES: SnakeTheme[] = [
  { id: 'pink', bodyColor: '#ec4899', bodyColorShade: '#9d174d', scalesColor: '#fbcfe8', tongueColor: '#ef4444', patternType: 'scales' },
  { id: 'lime', bodyColor: '#65a30d', bodyColorShade: '#365314', scalesColor: '#bef264', tongueColor: '#dc2626', patternType: 'scales' },
  { id: 'orange', bodyColor: '#f97316', bodyColorShade: '#9a3412', scalesColor: '#fed7aa', tongueColor: '#be123c', patternType: 'scales' },
  { id: 'cyan', bodyColor: '#06b6d4', bodyColorShade: '#155e75', scalesColor: '#a5f3fc', tongueColor: '#e11d48', patternType: 'scales' },
  { id: 'purple', bodyColor: '#9333ea', bodyColorShade: '#581c87', scalesColor: '#e9d5ff', tongueColor: '#f43f5e', patternType: 'scales' },
  { id: 'crimson', bodyColor: '#dc2626', bodyColorShade: '#7f1d1d', scalesColor: '#fca5a5', tongueColor: '#facc15', patternType: 'scales' },
  { id: 'blue', bodyColor: '#2563eb', bodyColorShade: '#1e3a8a', scalesColor: '#93c5fd', tongueColor: '#ef4444', patternType: 'scales' },
  { id: 'emerald', bodyColor: '#059669', bodyColorShade: '#064e3b', scalesColor: '#6ee7b7', tongueColor: '#ef4444', patternType: 'scales' },
  { id: 'candycane', bodyColor: '#ef4444', bodyColorShade: '#991b1b', bandColor: '#facc15', tongueColor: '#1d4ed8', patternType: 'bands' },
  { id: 'golden', bodyColor: '#eab308', bodyColorShade: '#78350f', scalesColor: '#fde68a', tongueColor: '#dc2626', patternType: 'scales' },
];

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

        {/* Soft top-light shading per snake, for a plush rounded-tube cartoon body */}
        {SNAKE_THEMES.map((t) => (
          <linearGradient key={t.id} id={`body-grad-${t.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={t.bodyColor} />
            <stop offset="55%" stopColor={t.bodyColor} />
            <stop offset="100%" stopColor={t.bodyColorShade} />
          </linearGradient>
        ))}
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
          const theme = SNAKE_THEMES[idx % SNAKE_THEMES.length];
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
          // Bulge direction + strength are tuned per snake (see pseaData.ts) so each
          // body routes around nearby ladders/snakes instead of crossing through them.
          const dir = snake.curveDir ?? (idx % 2 === 0 ? 1 : -1);
          const curveMult = snake.curveMult ?? 1;
          const rawCurvature = Math.min(65, Math.max(30, dist * 0.28)) * curveMult * dir;

          const perpX = -dy / (dist || 1);
          const perpY = dx / (dist || 1);

          let c1x = hx + dx * 0.32 + perpX * rawCurvature;
          let c1y = hy + dy * 0.32 + perpY * rawCurvature;
          let c2x = hx + dx * 0.68 - perpX * (rawCurvature * 0.85);
          let c2y = hy + dy * 0.68 - perpY * (rawCurvature * 0.85);

          // Keep bezier curves within board bounds
          c1x = Math.max(25, Math.min(975, c1x));
          c1y = Math.max(25, Math.min(975, c1y));
          c2x = Math.max(25, Math.min(975, c2x));
          c2y = Math.max(25, Math.min(975, c2y));

          const pathD = `M ${hx} ${hy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`;

          // Direction tangent at head for angle
          const headTangentX = c1x - hx;
          const headTangentY = c1y - hy;
          const headAngle = Math.atan2(headTangentY, headTangentX) * (180 / Math.PI);

          // Clamp head rotation to a narrow range around its default upright pose so the
          // head always stays tucked in the square's corner instead of swinging across
          // the box and covering the text.
          const rawHeadRotation = ((headAngle - 90 + 180) % 360 + 360) % 360 - 180;
          const headRotation = Math.max(-30, Math.min(30, rawHeadRotation));

          return (
            <g key={`snake-${idx}`}>
              {/* Layer 1: Solid Dark Comic Contour Outline (100% Crisp Print Quality) */}
              <path
                d={pathD}
                fill="none"
                stroke="#0f172a"
                strokeWidth="24"
                strokeLinecap="round"
              />

              {/* Layer 2: Clean White Isolation Halo */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="19"
                strokeLinecap="round"
              />

              {/* Layer 3: Thick, Plush Cartoon Body (top-light gradient for a rounded tube feel) */}
              <path
                d={pathD}
                fill="none"
                stroke={`url(#body-grad-${theme.id})`}
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Layer 4: Scale / Band Texture */}
              {theme.patternType === 'scales' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.scalesColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray="6, 9"
                  strokeDashoffset="3"
                  opacity="0.85"
                />
              )}

              {theme.patternType === 'bands' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.bandColor}
                  strokeWidth="16"
                  strokeLinecap="butt"
                  strokeDasharray="14, 14"
                />
              )}

              {/* ================================================================= */}
              {/* FRIENDLY CARTOON SNAKE HEAD (STATIC)                              */}
              {/* ================================================================= */}
              <g transform={`translate(${hx}, ${hy}) rotate(${headRotation}) scale(0.62)`}>
                {/* 1. Forked Tongue */}
                <path
                  d="M 0 12 L 0 24 M 0 24 L -6 31 M 0 24 L 6 31"
                  stroke={theme.tongueColor}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="-6" cy="31" r="1.4" fill={theme.tongueColor} />
                <circle cx="6" cy="31" r="1.4" fill={theme.tongueColor} />

                {/* 2. Solid Black Head Contour Outline */}
                <ellipse cx="0" cy="0" rx="16" ry="17" fill="#0f172a" />

                {/* 3. Main Head Shape */}
                <ellipse cx="0" cy="0.5" rx="14" ry="15" fill={theme.bodyColor} />
                <ellipse cx="0" cy="6" rx="11" ry="7" fill={theme.bodyColorShade} opacity="0.25" />

                {/* 4. Open Friendly Smiling Mouth with Fangs */}
                <path d="M -8 5 Q 0 15 8 5 Q 4 9.5 0 8.5 Q -4 9.5 -8 5 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="1.2" />
                <path d="M -4.5 6 L -3.5 10.5 L -2.5 6 Z" fill="#ffffff" />
                <path d="M 4.5 6 L 3.5 10.5 L 2.5 6 Z" fill="#ffffff" />

                {/* 5. Big Round Friendly Eyes */}
                <ellipse cx="-6.5" cy="-4" rx="5.5" ry="6.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                <circle cx="-6.5" cy="-3.5" r="3" fill="#0f172a" />
                <circle cx="-7.8" cy="-5.2" r="1" fill="#ffffff" />

                <ellipse cx="6.5" cy="-4" rx="5.5" ry="6.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                <circle cx="6.5" cy="-3.5" r="3" fill="#0f172a" />
                <circle cx="5.2" cy="-5.2" r="1" fill="#ffffff" />

                {/* 6. Expressive Eyebrows */}
                <path d="M -11 -10 Q -6.5 -13.5 -2 -10.5" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 2 -10.5 Q 6.5 -13.5 11 -10" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            </g>
          );
        })}
    </svg>
  );
};
