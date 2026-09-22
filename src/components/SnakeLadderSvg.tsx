import React from 'react';
import { LADDERS, SNAKES } from '../data/pseaData';
import { getSquareCoord } from '../utils/boardCoordinates';

interface SnakeLadderSvgProps {
  showLadders?: boolean;
  showSnakes?: boolean;
  opacity?: number;
}

// Funny Snake Character Definitions with Unique Comical Traits (Static Vector Art for Print)
interface SnakePersonality {
  id: string;
  name: string;
  bodyColor: string;
  bodyColorShade: string;
  bellyColor: string;
  spotsColor: string;
  spotType: 'polka' | 'stripes' | 'rings' | 'hearts' | 'stars' | 'confetti';
  accessory: 'buckteeth' | 'monocle_hat' | 'party_hat' | 'flower' | 'bandaid' | 'mustache' | 'clown_nose' | 'pirate' | 'froggy' | 'nightcap' | 'crown';
  tongueColor: string;
  cheekColor: string;
}

const SNAKE_THEMES: SnakePersonality[] = [
  // 1. Head 16 -> Tail 6: "Bucktooth Bob" (Bright Lime-Green with Purple Polka Dots & Huge Buck Teeth)
  {
    id: 'snake_16_6',
    name: 'Bucktooth Bob',
    bodyColor: '#22c55e',
    bodyColorShade: '#15803d',
    bellyColor: '#fef08a',
    spotsColor: '#a855f7',
    spotType: 'polka',
    accessory: 'buckteeth',
    tongueColor: '#ef4444',
    cheekColor: '#f472b6',
  },
  // 2. Head 24 -> Tail 10: "Professor Monocle" (Royal Purple with Neon Lemon Belly & Bowler Hat)
  {
    id: 'snake_24_10',
    name: 'Professor Monocle',
    bodyColor: '#a855f7',
    bodyColorShade: '#6b21a8',
    bellyColor: '#bef264',
    spotsColor: '#fde047',
    spotType: 'stripes',
    accessory: 'monocle_hat',
    tongueColor: '#ec4899',
    cheekColor: '#fb7185',
  },
  // 3. Head 34 -> Tail 20: "Party Boy Sunny" (Vibrant Tangerine with Sky-Blue Belly & Party Hat)
  {
    id: 'snake_34_20',
    name: 'Party Boy Sunny',
    bodyColor: '#f97316',
    bodyColorShade: '#c2410c',
    bellyColor: '#7dd3fc',
    spotsColor: '#ffffff',
    spotType: 'stars',
    accessory: 'party_hat',
    tongueColor: '#f43f5e',
    cheekColor: '#fca5a5',
  },
  // 4. Head 40 -> Tail 22: "Princess Daisy" (Turquoise Cyan with Butter Belly & Daisy Flower)
  {
    id: 'snake_40_22',
    name: 'Princess Daisy',
    bodyColor: '#06b6d4',
    bodyColorShade: '#0e7490',
    bellyColor: '#fef9c3',
    spotsColor: '#f43f5e',
    spotType: 'hearts',
    accessory: 'flower',
    tongueColor: '#e11d48',
    cheekColor: '#fda4af',
  },
  // 5. Head 48 -> Tail 29: "Dizzy Bandage" (Hot Magenta with Peach Belly & Head Band-Aid)
  {
    id: 'snake_48_29',
    name: 'Dizzy Bandage',
    bodyColor: '#e11d48',
    bodyColorShade: '#9f1239',
    bellyColor: '#fed7aa',
    spotsColor: '#c084fc',
    spotType: 'rings',
    accessory: 'bandaid',
    tongueColor: '#ef4444',
    cheekColor: '#fb7185',
  },
  // 6. Head 57 -> Tail 38: "Sir Mustache" (Golden Amber with Scarlet Belly & Big Curly Moustache)
  {
    id: 'snake_57_38',
    name: 'Sir Mustache',
    bodyColor: '#eab308',
    bodyColorShade: '#a16207',
    bellyColor: '#fca5a5',
    spotsColor: '#0d9488',
    spotType: 'stripes',
    accessory: 'mustache',
    tongueColor: '#b91c1c',
    cheekColor: '#f87171',
  },
  // 7. Head 66 -> Tail 46: "Clowny Grin" (Cobalt Blue with Lime Belly, Red Clown Nose & Giant Smile)
  {
    id: 'snake_66_46',
    name: 'Clowny Grin',
    bodyColor: '#3b82f6',
    bodyColorShade: '#1d4ed8',
    bellyColor: '#d9f99d',
    spotsColor: '#fde047',
    spotType: 'polka',
    accessory: 'clown_nose',
    tongueColor: '#ef4444',
    cheekColor: '#f472b6',
  },
  // 8. Head 75 -> Tail 54: "Pirate Tongue-Out" (Fiery Crimson with Lemon Belly & Pirate Eye-Patch)
  {
    id: 'snake_75_54',
    name: 'Pirate Tongue-Out',
    bodyColor: '#ef4444',
    bodyColorShade: '#991b1b',
    bellyColor: '#fef08a',
    spotsColor: '#1e293b',
    spotType: 'rings',
    accessory: 'pirate',
    tongueColor: '#f43f5e',
    cheekColor: '#fb7185',
  },
  // 9. Head 84 -> Tail 60: "Froggy Big-Eyes" (Mint Seafoam with Lavender Belly & Bulging Eyes)
  {
    id: 'snake_84_60',
    name: 'Froggy Big-Eyes',
    bodyColor: '#10b981',
    bodyColorShade: '#047857',
    bellyColor: '#f3e8ff',
    spotsColor: '#ec4899',
    spotType: 'polka',
    accessory: 'froggy',
    tongueColor: '#e11d48',
    cheekColor: '#f472b6',
  },
  // 10. Head 92 -> Tail 68: "Sleepy Nightcap" (Deep Indigo with Peachy Belly & Striped Nightcap)
  {
    id: 'snake_92_68',
    name: 'Sleepy Nightcap',
    bodyColor: '#6366f1',
    bodyColorShade: '#4338ca',
    bellyColor: '#fce7f3',
    spotsColor: '#38bdf8',
    spotType: 'stars',
    accessory: 'nightcap',
    tongueColor: '#ef4444',
    cheekColor: '#f472b6',
  },
  // 11. Head 98 -> Tail 74: "King Silly" (Sunset Amber with Golden Belly & Golden Crown)
  {
    id: 'snake_98_74',
    name: 'King Silly',
    bodyColor: '#f59e0b',
    bodyColorShade: '#b45309',
    bellyColor: '#fef08a',
    spotsColor: '#06b6d4',
    spotType: 'confetti',
    accessory: 'crown',
    tongueColor: '#dc2626',
    cheekColor: '#fb7185',
  },
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
      {/* 2. HILARIOUS FUNNY CARTOON SNAKES (STATIC & SHARP FOR PRINT)               */}
      {/* ========================================================================= */}
      {showSnakes &&
        SNAKES.map((snake, idx) => {
          const theme = SNAKE_THEMES[idx % SNAKE_THEMES.length];
          const head = getSquareCoord(snake.head);
          const tail = getSquareCoord(snake.tail);

          // Head of snake on the upper right corner of the box:
          const hx = head.colFromLeft * 100 + 78;
          const hy = head.rowFromTop * 100 + 24;

          // Tail on upper right or left corner of the box:
          const tailCornerLeft = tail.colFromLeft <= head.colFromLeft;
          const tx = tailCornerLeft
            ? tail.colFromLeft * 100 + 22 // upper left corner
            : tail.colFromLeft * 100 + 78; // upper right corner
          const ty = tail.rowFromTop * 100 + 24; // upper corner

          const dx = tx - hx;
          const dy = ty - hy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dir = idx % 2 === 0 ? 1 : -1;
          const rawCurvature = Math.min(65, Math.max(30, dist * 0.28)) * dir;

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

          return (
            <g key={`snake-${idx}`}>
              {/* Layer 1: Solid Dark Comic Contour Outline (100% Crisp Print Quality) */}
              <path
                d={pathD}
                fill="none"
                stroke="#0f172a"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Layer 2: Clean White Isolation Halo */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Layer 3: Vibrant Colorful Body */}
              <path
                d={pathD}
                fill="none"
                stroke={theme.bodyColor}
                strokeWidth="11"
                strokeLinecap="round"
              />

              {/* Layer 4: Funny Striped/Dashed Underbelly */}
              <path
                d={pathD}
                fill="none"
                stroke={theme.bellyColor}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="8, 6"
              />

              {/* Layer 5: Funny Body Patterns (Polka, Stripes, Rings, Stars, Confetti) */}
              {theme.spotType === 'polka' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  strokeDasharray="3, 16"
                  strokeDashoffset="5"
                />
              )}

              {theme.spotType === 'stripes' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="6, 12"
                  strokeDashoffset="4"
                />
              )}

              {theme.spotType === 'rings' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  strokeDasharray="2.5, 18"
                  strokeDashoffset="6"
                />
              )}

              {theme.spotType === 'hearts' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  strokeDasharray="4, 15"
                  strokeDashoffset="4"
                />
              )}

              {theme.spotType === 'stars' && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={theme.spotsColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="3, 18"
                  strokeDashoffset="7"
                />
              )}

              {theme.spotType === 'confetti' && (
                <>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="3, 18"
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="3, 18"
                    strokeDashoffset="9"
                  />
                </>
              )}

              {/* ================================================================= */}
              {/* FUNNY TAIL ACCENTS (Curly Pig-Tail, Rattle Beads, or Knot)       */}
              {/* ================================================================= */}
              <g transform={`translate(${tx}, ${ty})`}>
                {idx % 3 === 0 ? (
                  // Curly Pig-Tail
                  <g>
                    <circle cx="0" cy="0" r="6.5" fill={theme.bodyColor} stroke="#0f172a" strokeWidth="1.8" />
                    <path
                      d="M -2 -1 Q 3 -4 2 2 Q 0 4 -2 1"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="1" cy="-1" r="1.5" fill="#fef08a" />
                  </g>
                ) : idx % 3 === 1 ? (
                  // Maraca / Rattle Beads
                  <g>
                    <circle cx="-3" cy="-2" r="4.2" fill="#facc15" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="3" cy="2" r="4.5" fill="#ef4444" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="0" cy="0" r="3.2" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.4" />
                  </g>
                ) : (
                  // Cartoon Knot / Bow
                  <g>
                    <circle cx="0" cy="0" r="6" fill={theme.bodyColor} stroke="#0f172a" strokeWidth="1.8" />
                    <circle cx="-3" cy="-3" r="2.8" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
                    <circle cx="3" cy="-3" r="2.8" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
                    <circle cx="0" cy="-3" r="1.8" fill="#fef08a" stroke="#0f172a" strokeWidth="1" />
                  </g>
                )}
              </g>

              {/* ================================================================= */}
              {/* FUNNY CARTOON SNAKE HEAD & ACCESSORIES (STATIC)                  */}
              {/* ================================================================= */}
              <g transform={`translate(${hx}, ${hy}) rotate(${headAngle - 90})`}>
                {/* 1. Static Forked Tongue */}
                <path
                  d="M 0 -14 L 0 -28 M 0 -28 L -6 -35 M 0 -28 L 6 -35"
                  stroke={theme.tongueColor}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="-6" cy="-35" r="1.4" fill={theme.tongueColor} />
                <circle cx="6" cy="-35" r="1.4" fill={theme.tongueColor} />

                {/* 2. Solid Black Head Contour Outline */}
                <ellipse cx="0" cy="0" rx="17" ry="19" fill="#0f172a" />
                <ellipse cx="0" cy="0" rx="15" ry="17" fill="#ffffff" />

                {/* 3. Main Head Shape */}
                <ellipse cx="0" cy="0" rx="14" ry="16" fill={theme.bodyColor} />
                <ellipse cx="0" cy="-3" rx="11.5" ry="11.5" fill={theme.bodyColorShade} opacity="0.3" />

                {/* 4. Cute Snout */}
                <ellipse cx="0" cy="-7" rx="9" ry="6.5" fill={theme.bellyColor} stroke="#0f172a" strokeWidth="1.2" />

                {/* 5. Goofy Nostrils */}
                <circle cx="-3" cy="-8.5" r="1.1" fill="#0f172a" />
                <circle cx="3" cy="-8.5" r="1.1" fill="#0f172a" />

                {/* 6. Big Rosy Cheeks */}
                <circle cx="-10.5" cy="4" r="3" fill={theme.cheekColor} opacity="0.85" />
                <circle cx="10.5" cy="4" r="3" fill={theme.cheekColor} opacity="0.85" />

                {/* 7. Unique Hilarious Facial Expressions & Eyes */}

                {/* ACCESSORY 1: BUCKTEETH BOB (Huge goofy buck teeth + cross eyes) */}
                {theme.accessory === 'buckteeth' && (
                  <g>
                    {/* Cross-eyes */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-4.5" cy="-2" r="3" fill="#facc15" />
                    <circle cx="-4" cy="-2" r="1.8" fill="#0f172a" />
                    <circle cx="-4.5" cy="-3" r="0.8" fill="#ffffff" />

                    <ellipse cx="6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="4.5" cy="-2" r="3" fill="#facc15" />
                    <circle cx="4" cy="-2" r="1.8" fill="#0f172a" />
                    <circle cx="3.5" cy="-3" r="0.8" fill="#ffffff" />

                    {/* Arched comic eyebrows */}
                    <path d="M -10 -9 Q -6.5 -12.5 -3 -9" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M 3 -9 Q 6.5 -12.5 10 -9" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />

                    {/* Wide smile + Giant Buck Teeth */}
                    <path d="M -6.5 -4 Q 0 -1 6.5 -4" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="-3.2" y="-4" width="3" height="4.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1" rx="0.5" />
                    <rect x="0.2" y="-4" width="3" height="4.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1" rx="0.5" />
                  </g>
                )}

                {/* ACCESSORY 2: PROFESSOR MONOCLE (Giant Monocle + Bowler Hat) */}
                {theme.accessory === 'monocle_hat' && (
                  <g>
                    {/* Bowler Hat on head */}
                    <path d="M -11 -15 C -11 -22, 11 -22, 11 -15 Z" fill="#451a03" stroke="#0f172a" strokeWidth="1.4" />
                    <rect x="-13" y="-16" width="26" height="3" rx="1.5" fill="#78350f" stroke="#0f172a" strokeWidth="1.2" />
                    <rect x="-9" y="-17" width="18" height="1.8" fill="#facc15" />

                    {/* Left Eye: Big Eye with Golden Monocle */}
                    <ellipse cx="-6" cy="-2" rx="6" ry="6.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6" cy="-2" r="3.2" fill="#a3e635" />
                    <circle cx="-6" cy="-2" r="1.8" fill="#0f172a" />
                    <circle cx="-7" cy="-3.2" r="0.9" fill="#ffffff" />
                    {/* Golden Monocle Rim + Chain */}
                    <circle cx="-6" cy="-2" r="7" fill="none" stroke="#eab308" strokeWidth="1.8" />
                    <path d="M -12 -2 Q -15 5 -11 11" fill="none" stroke="#eab308" strokeWidth="1.2" strokeDasharray="1.5,1.5" />

                    {/* Right Eye: Squinting winking eye */}
                    <path d="M 3.5 -2 Q 6.5 -6 9.5 -2" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

                    {/* Crooked smirk + single tooth */}
                    <path d="M -4.5 -3 Q 0 1 5.5 -3" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="1.8" y="-3" width="2.4" height="2.8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" rx="0.4" />
                  </g>
                )}

                {/* ACCESSORY 3: PARTY BOY SUNNY (Striped Party Cone Hat + Gasping Mouth) */}
                {theme.accessory === 'party_hat' && (
                  <g>
                    {/* Striped Party Cone Hat */}
                    <polygon points="-7,-15 7,-15 0,-32" fill="#ec4899" stroke="#0f172a" strokeWidth="1.4" />
                    <polygon points="-4.5,-20 4.5,-20 0,-32" fill="#38bdf8" />
                    <polygon points="-2,-26 2,-26 0,-32" fill="#facc15" />
                    {/* Fluffy Pom-Pom on tip */}
                    <circle cx="0" cy="-33" r="3.2" fill="#facc15" stroke="#0f172a" strokeWidth="1.2" />

                    {/* Huge Round Shocked Eyes */}
                    <circle cx="-6.5" cy="-2" r="5.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6.5" cy="-2" r="2.6" fill="#38bdf8" />
                    <circle cx="-6.5" cy="-2" r="1.4" fill="#0f172a" />
                    <circle cx="-7.5" cy="-3.5" r="0.8" fill="#ffffff" />

                    <circle cx="6.5" cy="-2" r="5.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="6.5" cy="-2" r="2.6" fill="#38bdf8" />
                    <circle cx="6.5" cy="-2" r="1.4" fill="#0f172a" />
                    <circle cx="5.5" cy="-3.5" r="0.8" fill="#ffffff" />

                    {/* Gasping Round Mouth */}
                    <ellipse cx="0" cy="-4" rx="3.8" ry="4.2" fill="#881337" stroke="#0f172a" strokeWidth="1.2" />
                    <ellipse cx="0" cy="-2.5" rx="2.2" ry="1.6" fill="#f43f5e" />
                  </g>
                )}

                {/* ACCESSORY 4: PRINCESS DAISY (Yellow Daisy Flower + Long Eyelashes) */}
                {theme.accessory === 'flower' && (
                  <g>
                    {/* Daisy Flower behind ear */}
                    <g transform="translate(11, -11)">
                      <circle cx="-3.5" cy="0" r="2.8" fill="#f43f5e" />
                      <circle cx="3.5" cy="0" r="2.8" fill="#f43f5e" />
                      <circle cx="0" cy="-3.5" r="2.8" fill="#f43f5e" />
                      <circle cx="0" cy="3.5" r="2.8" fill="#f43f5e" />
                      <circle cx="0" cy="0" r="2.8" fill="#facc15" stroke="#0f172a" strokeWidth="0.9" />
                    </g>

                    {/* Left Eye: Beautiful Anime Sparkle Eye */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6.5" cy="-2" r="3.2" fill="#fb7185" />
                    <circle cx="-6.5" cy="-2" r="1.8" fill="#0f172a" />
                    <circle cx="-7.5" cy="-3.2" r="1.1" fill="#ffffff" />
                    <circle cx="-5.5" cy="-1" r="0.5" fill="#ffffff" />
                    {/* Eyelashes */}
                    <path d="M -10 -6 L -12 -9 M -7.5 -7 L -8.5 -10" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />

                    {/* Right Eye: Cute Wink */}
                    <path d="M 3.5 -2 Q 6.5 -6 9.5 -2" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M 9.5 -2 L 11.5 -4 M 10.5 0 L 12.5 1" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />

                    {/* Sweet Smile */}
                    <path d="M -5.5 -4 Q 0 -1 5.5 -4" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                )}

                {/* ACCESSORY 5: DIZZY BANDAGE (Hypnotic Spiral Eyes + Criss-Cross Band-Aid) */}
                {theme.accessory === 'bandaid' && (
                  <g>
                    {/* Criss-Cross Band-Aid on Forehead */}
                    <rect x="-6.5" y="-16" width="13" height="4.2" rx="1.5" fill="#ffedd5" stroke="#ea580c" strokeWidth="1" transform="rotate(-15)" />
                    <circle cx="0" cy="-14" r="0.7" fill="#ea580c" />
                    <circle cx="-3" cy="-14" r="0.7" fill="#ea580c" />
                    <circle cx="3" cy="-14" r="0.7" fill="#ea580c" />

                    {/* Spiral Hypno Eyes */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <path
                      d="M -6.5 -2 m -2.8 0 a 2.8 2.8 0 1 0 5.6 0 a 1.8 1.8 0 1 0 -3.6 0 a 0.9 0.9 0 1 0 1.8 0"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />

                    <ellipse cx="6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <path
                      d="M 6.5 -2 m -2.8 0 a 2.8 2.8 0 1 0 5.6 0 a 1.8 1.8 0 1 0 -3.6 0 a 0.9 0.9 0 1 0 1.8 0"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />

                    {/* Wobbly Wavy Mouth */}
                    <path d="M -5.5 -4 Q -2.8 -1 0 -4 Q 2.8 -7 5.5 -4" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                )}

                {/* ACCESSORY 6: SIR MUSTACHE (Magnificent Big Handlebar Mustache) */}
                {theme.accessory === 'mustache' && (
                  <g>
                    {/* Sleepy/Dignified Half-Closed Eyelids */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6.5" cy="-1" r="2" fill="#0f172a" />
                    <path d="M -11 -4 Q -6.5 -1 -2 -4" fill="#eab308" stroke="#0f172a" strokeWidth="1.4" />

                    <ellipse cx="6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="6.5" cy="-1" r="2" fill="#0f172a" />
                    <path d="M 2 -4 Q 6.5 -1 11 -4" fill="#eab308" stroke="#0f172a" strokeWidth="1.4" />

                    {/* Big Curly Handlebar Mustache */}
                    <path
                      d="M 0 -5.5 C -2.8 -8.5 -7.5 -8.5 -10 -5.5 C -12 -3.8 -12 -1.8 -10 -2.8 C -7.5 -3.8 -3.8 -2.8 0 -4.5 C 3.8 -2.8 7.5 -3.8 10 -2.8 C 12 -1.8 12 -3.8 10 -5.5 C 7.5 -8.5 2.8 -8.5 0 -5.5 Z"
                      fill="#451a03"
                      stroke="#0f172a"
                      strokeWidth="1.2"
                    />
                  </g>
                )}

                {/* ACCESSORY 7: CLOWNY GRIN (Red Clown Nose & Huge Grid of Teeth) */}
                {theme.accessory === 'clown_nose' && (
                  <g>
                    {/* Googly eyes looking up and down */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6.5" cy="-3.8" r="2.4" fill="#0f172a" />
                    <circle cx="-7.5" cy="-4.8" r="0.8" fill="#ffffff" />

                    <ellipse cx="6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="6.5" cy="0" r="2.4" fill="#0f172a" />
                    <circle cx="5.5" cy="-1" r="0.8" fill="#ffffff" />

                    {/* Big Red Clown Nose */}
                    <circle cx="0" cy="-6" r="3.5" fill="#ef4444" stroke="#0f172a" strokeWidth="1.2" />
                    <circle cx="-1" cy="-7" r="1" fill="#ffffff" />

                    {/* Huge Wide Toothy Cartoon Grin */}
                    <path d="M -7.5 -3 Q 0 4 7.5 -3 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <line x1="0" y1="-3" x2="0" y2="2" stroke="#0f172a" strokeWidth="1.1" />
                    <line x1="-3.8" y1="-3" x2="-3.8" y2="0" stroke="#0f172a" strokeWidth="1.1" />
                    <line x1="3.8" y1="-3" x2="3.8" y2="0" stroke="#0f172a" strokeWidth="1.1" />
                  </g>
                )}

                {/* ACCESSORY 8: PIRATE TONGUE-OUT (Pirate Eye Patch & Floppy Tongue) */}
                {theme.accessory === 'pirate' && (
                  <g>
                    {/* Black Pirate Eye Patch over right eye */}
                    <line x1="-11" y1="-10" x2="11" y2="2" stroke="#0f172a" strokeWidth="1.8" />
                    <ellipse cx="5.5" cy="-2" rx="5.5" ry="6" fill="#0f172a" stroke="#ffffff" strokeWidth="0.8" />
                    <circle cx="5.5" cy="-2" r="1.4" fill="#facc15" />

                    {/* Left Eye: Crazy Wide Eye */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-6.5" cy="-2" r="3.2" fill="#ef4444" />
                    <circle cx="-6.5" cy="-2" r="1.8" fill="#0f172a" />
                    <circle cx="-7.5" cy="-3.2" r="0.8" fill="#ffffff" />

                    {/* Big Floppy Tongue Sticking Out Sideways (BLEEEH!) */}
                    <path d="M -4.5 -3 Q 0 1 4.5 -3" fill="none" stroke="#0f172a" strokeWidth="1.6" />
                    <path
                      d="M 1 -3 Q 6.5 -4 6.5 3 Q 6.5 6.5 2.8 6.5 Q 1 6.5 1 -3"
                      fill="#f43f5e"
                      stroke="#0f172a"
                      strokeWidth="1.2"
                    />
                    <line x1="3.8" y1="0" x2="3.8" y2="4.5" stroke="#be123c" strokeWidth="0.8" />
                  </g>
                )}

                {/* ACCESSORY 9: FROGGY BIG-EYES (Eyes Bulging High Above Head) */}
                {theme.accessory === 'froggy' && (
                  <g>
                    {/* Bulging Frog Eyes on Top */}
                    <ellipse cx="-7.5" cy="-7.5" rx="5.5" ry="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.6" />
                    <ellipse cx="-7.5" cy="-7.5" rx="3.2" ry="3.8" fill="#34d399" />
                    <ellipse cx="-7.5" cy="-7.5" rx="2.8" ry="1.3" fill="#0f172a" />
                    <circle cx="-8.5" cy="-9" r="0.9" fill="#ffffff" />

                    <ellipse cx="7.5" cy="-7.5" rx="5.5" ry="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.6" />
                    <ellipse cx="7.5" cy="-7.5" rx="3.2" ry="3.8" fill="#34d399" />
                    <ellipse cx="7.5" cy="-7.5" rx="2.8" ry="1.3" fill="#0f172a" />
                    <circle cx="6.5" cy="-9" r="0.9" fill="#ffffff" />

                    {/* Extra Wide Froggy Grin */}
                    <path d="M -8 -2 Q 0 4.5 8 -2" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}

                {/* ACCESSORY 10: SLEEPY NIGHTCAP (Droopy Nightcap + Zzz) */}
                {theme.accessory === 'nightcap' && (
                  <g>
                    {/* Striped Sleepy Nightcap */}
                    <path
                      d="M -11 -13 C -11 -23 14 -23 17 -14 C 19 -4 21 2 17 5.5"
                      fill="#6366f1"
                      stroke="#0f172a"
                      strokeWidth="1.4"
                    />
                    <path d="M -9 -16 C -2 -21 9 -21 16 -12" fill="none" stroke="#f43f5e" strokeWidth="2.8" />
                    <circle cx="17" cy="6.5" r="3.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.1" />

                    {/* Half-Moon Sleepy Eyes */}
                    <path d="M -9 -2 Q -6.5 2 -3.5 -2" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 3.5 -2 Q 6.5 2 9.5 -2" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

                    {/* Peaceful Goofy Smile */}
                    <path d="M -4.5 -4 Q 0 -1 4.5 -4" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Tiny "Zzz" bubble */}
                    <text x="-15" y="-8" fill="#4338ca" fontSize="6" fontWeight="900" fontFamily="sans-serif">
                      z
                    </text>
                    <text x="-19" y="-13" fill="#6366f1" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
                      Z
                    </text>
                  </g>
                )}

                {/* ACCESSORY 11: KING SILLY (Golden Cartoon Crown & Wild Goofy Face) */}
                {theme.accessory === 'crown' && (
                  <g>
                    {/* Golden Cartoon Crown */}
                    <polygon
                      points="-9,-14 -11,-24 -4.5,-18 0,-26 4.5,-18 11,-24 9,-14"
                      fill="#facc15"
                      stroke="#0f172a"
                      strokeWidth="1.4"
                    />
                    <circle cx="-11" cy="-24" r="1.4" fill="#ef4444" />
                    <circle cx="0" cy="-26" r="1.6" fill="#38bdf8" />
                    <circle cx="11" cy="-24" r="1.4" fill="#ec4899" />

                    {/* Chameleon Goofy Eyes (Looking in opposite directions) */}
                    <ellipse cx="-6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="-8.5" cy="-2" r="2.6" fill="#06b6d4" />
                    <circle cx="-8.5" cy="-2" r="1.4" fill="#0f172a" />
                    <circle cx="-9" cy="-3" r="0.7" fill="#ffffff" />

                    <ellipse cx="6.5" cy="-2" rx="5" ry="5.8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
                    <circle cx="8.5" cy="-2" r="2.6" fill="#06b6d4" />
                    <circle cx="8.5" cy="-2" r="1.4" fill="#0f172a" />
                    <circle cx="8" cy="-3" r="0.7" fill="#ffffff" />

                    {/* Big Silly Grin */}
                    <path d="M -6.5 -4 Q 0 2 6.5 -4" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="-1.4" y="-4" width="2.8" height="2.8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" rx="0.4" />
                  </g>
                )}
              </g>
            </g>
          );
        })}
    </svg>
  );
};
