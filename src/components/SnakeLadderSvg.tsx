import React from 'react';
import { LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';

interface SnakeLadderSvgProps {
  showLadders?: boolean;
  showSnakes?: boolean;
  opacity?: number;
}

// Cubic bezier point/tangent sampling, used to build a gradually-narrowing
// cone for the tail tip (a stroke can't taper on its own, so the final
// stretch of the curve is instead drawn as a tapered polygon sampled along
// the real curve geometry).
function cubicPoint(
  p0x: number, p0y: number, p1x: number, p1y: number,
  p2x: number, p2y: number, p3x: number, p3y: number, t: number
) {
  const mt = 1 - t;
  const x = mt * mt * mt * p0x + 3 * mt * mt * t * p1x + 3 * mt * t * t * p2x + t * t * t * p3x;
  const y = mt * mt * mt * p0y + 3 * mt * mt * t * p1y + 3 * mt * t * t * p2y + t * t * t * p3y;
  return { x, y };
}

function cubicTangent(
  p0x: number, p0y: number, p1x: number, p1y: number,
  p2x: number, p2y: number, p3x: number, p3y: number, t: number
) {
  const mt = 1 - t;
  const x = 3 * mt * mt * (p1x - p0x) + 6 * mt * t * (p2x - p1x) + 3 * t * t * (p3x - p2x);
  const y = 3 * mt * mt * (p1y - p0y) + 6 * mt * t * (p2y - p1y) + 3 * t * t * (p3y - p2y);
  return { x, y };
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

          // Direction tangent at head for angle
          const headTangentX = c1x - hx;
          const headTangentY = c1y - hy;
          const headAngle = Math.atan2(headTangentY, headTangentX) * (180 / Math.PI);

          // Clamp head rotation to a narrow range around its default upright pose so the
          // head always stays tucked in the square's corner instead of swinging across
          // the box and covering the text.
          const rawHeadRotation = ((headAngle - 90 + 180) % 360 + 360) % 360 - 180;
          const headRotation = Math.max(-30, Math.min(30, rawHeadRotation));

          // Whole-body silhouette: the curve is sampled start-to-end and offset by a
          // per-sample half-width (constant for most of the body, then eased down to
          // ~0 over the last stretch) to build one continuous tapered polygon. Body,
          // belly and outline all reuse this same sampling (at their own base widths)
          // so every texture layer narrows together and reaches all the way to the tip,
          // instead of a constant-width stroke that stops dead with a separate tip glued on.
          const BODY_HALF_WIDTH = 9;
          const BELLY_HALF_WIDTH = 4.25;
          const OUTLINE_MARGIN = 2.5;
          const TAPER_START = 0.72;
          const SAMPLE_STEPS = 32;

          const curveSamples = Array.from({ length: SAMPLE_STEPS + 1 }, (_, i) => {
            const t = i / SAMPLE_STEPS;
            const pt = cubicPoint(hx, hy, c1x, c1y, c2x, c2y, tx, ty, t);
            const tan = cubicTangent(hx, hy, c1x, c1y, c2x, c2y, tx, ty, t);
            const tanLen = Math.sqrt(tan.x * tan.x + tan.y * tan.y) || 1;
            let widthFactor = 1;
            if (t > TAPER_START) {
              const localT = (t - TAPER_START) / (1 - TAPER_START);
              // Eased taper (slower to start, narrowing faster near the tip) for a more
              // natural conical profile than a straight linear wedge.
              widthFactor = Math.pow(1 - localT, 1.4);
            }
            return { x: pt.x, y: pt.y, px: -tan.y / tanLen, py: tan.x / tanLen, widthFactor };
          });

          const buildTaperedPolygon = (baseHalfWidth: number, extraHalfWidth: number) => {
            const left = curveSamples.map(
              (p) => `${p.x + p.px * (baseHalfWidth * p.widthFactor + extraHalfWidth)} ${p.y + p.py * (baseHalfWidth * p.widthFactor + extraHalfWidth)}`
            );
            const right = curveSamples
              .slice()
              .reverse()
              .map(
                (p) => `${p.x - p.px * (baseHalfWidth * p.widthFactor + extraHalfWidth)} ${p.y - p.py * (baseHalfWidth * p.widthFactor + extraHalfWidth)}`
              );
            return `M ${left.join(' L ')} L ${right.join(' L ')} Z`;
          };

          const fullPathD = `M ${hx} ${hy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`;
          const bodyClipId = `snake-body-clip-${idx}`;
          const bellyClipId = `snake-belly-clip-${idx}`;

          return (
            <g key={`snake-${idx}`}>
              <clipPath id={bodyClipId}>
                <path d={buildTaperedPolygon(BODY_HALF_WIDTH, 0)} />
              </clipPath>
              <clipPath id={bellyClipId}>
                <path d={buildTaperedPolygon(BELLY_HALF_WIDTH, 0)} />
              </clipPath>

              {/* Layer 1: Solid Dark Comic Contour Outline, tapering to a slender conical point */}
              <path d={buildTaperedPolygon(BODY_HALF_WIDTH, OUTLINE_MARGIN)} fill="#0f172a" />

              {/* Layer 2: Glossy Body Fill (top-light gradient for a rounded tube feel) */}
              <path d={buildTaperedPolygon(BODY_HALF_WIDTH, 0)} fill={`url(#body-grad-${theme.id})`} />

              {/* Layer 3: Dark Oval Spots, clipped to the tapering tube so they shrink
                  naturally all the way to the tip instead of stopping abruptly */}
              <g clipPath={`url(#${bodyClipId})`}>
                <path
                  d={fullPathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="15"
                  strokeLinecap="butt"
                  strokeDasharray="6, 11"
                  strokeDashoffset="3"
                  opacity="0.85"
                />
              </g>

              {/* Layer 4: Cream Belly Stripe, tapering in lockstep with the body */}
              <path d={buildTaperedPolygon(BELLY_HALF_WIDTH, 0)} fill={BELLY_COLOR} />

              {/* Layer 5: Belly Rib Ticks, clipped to the tapering belly stripe */}
              <g clipPath={`url(#${bellyClipId})`}>
                <path
                  d={fullPathD}
                  fill="none"
                  stroke={RIB_COLOR}
                  strokeWidth="8.5"
                  strokeLinecap="butt"
                  strokeDasharray="1.6, 7"
                />
              </g>

              {/* ================================================================= */}
              {/* ROUND, OVERSIZED, CUTE CARTOON SNAKE HEAD (STATIC)                */}
              {/* ================================================================= */}
              <g transform={`translate(${hx}, ${hy}) rotate(${headRotation}) scale(1.25)`}>
                {/* 1. Round Head Outline + Fill */}
                <circle cx="0" cy="0" r="16" fill="#0f172a" />
                <circle cx="0" cy="0.5" r="14" fill={theme.bodyColor} />

                {/* 2. Cream Chin Patch (where the open smiling mouth sits) */}
                <ellipse cx="0" cy="7" rx="9.5" ry="5.5" fill={BELLY_COLOR} />

                {/* 3. Small Button Nostrils */}
                <circle cx="-1.6" cy="0.5" r="0.8" fill="#0f172a" />
                <circle cx="1.6" cy="0.5" r="0.8" fill="#0f172a" />

                {/* 4. Open Smiling Mouth */}
                <path
                  d="M -7.5 4 Q 0 14 7.5 4 Q 3.5 8.5 0 8.5 Q -3.5 8.5 -7.5 4 Z"
                  fill="#7f1d1d"
                  stroke="#0f172a"
                  strokeWidth="1.3"
                />

                {/* 5. Small Tongue Peeking Out */}
                <ellipse cx="0" cy="9.5" rx="2.1" ry="2.8" fill={theme.tongueColor} />

                {/* 6. Big Round Friendly Eyes */}
                <ellipse cx="-6.5" cy="-5" rx="5" ry="5.6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.3" />
                <circle cx="-6" cy="-4.5" r="3.2" fill="#0f172a" />
                <circle cx="-7.3" cy="-6.3" r="0.9" fill="#ffffff" />

                <ellipse cx="6.5" cy="-5" rx="5" ry="5.6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.3" />
                <circle cx="7" cy="-4.5" r="3.2" fill="#0f172a" />
                <circle cx="5.7" cy="-6.3" r="0.9" fill="#ffffff" />

                {/* 7. Subtle Brow Lines */}
                <path d="M -11 -10.5 Q -6.5 -13 -2 -11" fill="none" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M 2 -11 Q 6.5 -13 11 -10.5" fill="none" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
              </g>
            </g>
          );
        })}
    </svg>
  );
};
