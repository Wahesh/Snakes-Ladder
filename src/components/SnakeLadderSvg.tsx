import React from 'react';
import { LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';

interface SnakeLadderSvgProps {
  showLadders?: boolean;
  showSnakes?: boolean;
  opacity?: number;
}

// Vector snake skin, redrawn to match a reference sticker: thick glossy tube,
// cream belly stripe with rib ticks down the center, dark oval spots on the
// outer edges, bold black outline. The body shape still follows the tuned
// bezier curve per snake (curveDir/curveMult in pseaData.ts) so it keeps
// dodging ladders and square text instead of cutting straight across them.
interface SnakeTheme {
  id: string;
  bodyColor: string;
  bodyColorShade: string;
  spotsColor: string;
  tongueColor: string;
}

const BELLY_COLOR = '#fde9c8';
const RIB_COLOR = '#e8c99b';

const SNAKE_THEMES: SnakeTheme[] = [
  { id: 'red', bodyColor: '#ef4444', bodyColorShade: '#b91c1c', spotsColor: '#991b1b', tongueColor: '#dc2626' },
  { id: 'orange', bodyColor: '#f97316', bodyColorShade: '#c2410c', spotsColor: '#9a3412', tongueColor: '#dc2626' },
  { id: 'golden', bodyColor: '#eab308', bodyColorShade: '#a16207', spotsColor: '#854d0e', tongueColor: '#dc2626' },
  { id: 'lime', bodyColor: '#65a30d', bodyColorShade: '#3f6212', spotsColor: '#365314', tongueColor: '#dc2626' },
  { id: 'emerald', bodyColor: '#059669', bodyColorShade: '#065f46', spotsColor: '#064e3b', tongueColor: '#dc2626' },
  { id: 'cyan', bodyColor: '#06b6d4', bodyColorShade: '#0e7490', spotsColor: '#155e75', tongueColor: '#e11d48' },
  { id: 'blue', bodyColor: '#2563eb', bodyColorShade: '#1d4ed8', spotsColor: '#1e3a8a', tongueColor: '#dc2626' },
  { id: 'purple', bodyColor: '#9333ea', bodyColorShade: '#7e22ce', spotsColor: '#581c87', tongueColor: '#dc2626' },
  { id: 'magenta', bodyColor: '#ec4899', bodyColorShade: '#be185d', spotsColor: '#9d174d', tongueColor: '#dc2626' },
  { id: 'brown', bodyColor: '#92400e', bodyColorShade: '#713f12', spotsColor: '#451a03', tongueColor: '#dc2626' },
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
              <path d={pathD} fill="none" stroke="#0f172a" strokeWidth="23" strokeLinecap="round" />

              {/* Layer 2: Glossy Body Fill (top-light gradient for a rounded tube feel) */}
              <path d={pathD} fill="none" stroke={`url(#body-grad-${theme.id})`} strokeWidth="18" strokeLinecap="round" />

              {/* Layer 3: Dark Oval Spots (wider than the belly stripe, so they only show on the outer edges) */}
              <path
                d={pathD}
                fill="none"
                stroke={theme.spotsColor}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="7, 10"
                strokeDashoffset="3"
                opacity="0.9"
              />

              {/* Layer 4: Cream Belly Stripe (centered, narrower, covers the middle of the tube) */}
              <path d={pathD} fill="none" stroke={BELLY_COLOR} strokeWidth="9" strokeLinecap="round" />

              {/* Layer 5: Belly Rib Ticks */}
              <path
                d={pathD}
                fill="none"
                stroke={RIB_COLOR}
                strokeWidth="9"
                strokeLinecap="butt"
                strokeDasharray="1.6, 7"
              />

              {/* ================================================================= */}
              {/* FRIENDLY CARTOON SNAKE HEAD (STATIC)                              */}
              {/* ================================================================= */}
              <g transform={`translate(${hx}, ${hy}) rotate(${headRotation}) scale(0.62)`}>
                {/* 1. Small Flicking Tongue */}
                <path
                  d="M 6 8 L 14 12 M 14 12 L 19 9 M 14 12 L 17 17"
                  stroke={theme.tongueColor}
                  strokeWidth="2.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 2. Solid Black Head Contour Outline */}
                <ellipse cx="0" cy="0" rx="16" ry="17" fill="#0f172a" />

                {/* 3. Main Head Shape */}
                <ellipse cx="0" cy="0.5" rx="14" ry="15" fill={theme.bodyColor} />
                <ellipse cx="0" cy="6" rx="11" ry="7" fill={BELLY_COLOR} opacity="0.5" />

                {/* 4. Content Closed-Mouth Smile */}
                <path d="M -7 6 Q 0 11 8 4" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />

                {/* 5. Big Round Friendly Eyes */}
                <ellipse cx="-6.5" cy="-4" rx="5.5" ry="6.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                <circle cx="-6" cy="-3.5" r="3.6" fill="#0f172a" />
                <circle cx="-7.5" cy="-5.2" r="1.1" fill="#ffffff" />

                <ellipse cx="6.5" cy="-4" rx="5.5" ry="6.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                <circle cx="7" cy="-3.5" r="3.6" fill="#0f172a" />
                <circle cx="5.5" cy="-5.2" r="1.1" fill="#ffffff" />
              </g>
            </g>
          );
        })}
    </svg>
  );
};
