import React from 'react';

/**
 * CartoonIllustrations: High-fidelity, storybook anime-style cartoon illustrations
 * Matching the exact characters, postures, color palette, and visual warmth
 * from the community awareness Snakes & Ladders reference poster.
 */

// ============================================================================
// 1. TOP HEADER: SCENIC NEPALI HIMALAYAN VILLAGE WITH THREE HAPPY CHILDREN
// ============================================================================
export const VillageHeaderLandscape: React.FC = () => {
  return (
    <div className="relative w-full h-44 sm:h-52 md:h-60 lg:h-64 overflow-hidden rounded-t-xl select-none bg-sky-200">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1400 320"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="headerSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="85%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>

          {/* Golden Sun & Rays */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#fde047" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Snowy Himalayan Peaks */}
          <linearGradient id="himalayaFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Terraced Hills */}
          <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Skin Gradient */}
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffeedb" />
            <stop offset="100%" stopColor="#fcd3a7" />
          </linearGradient>

          {/* Hair Dark Gradient */}
          <linearGradient id="hairDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2817" />
            <stop offset="50%" stopColor="#24170d" />
            <stop offset="100%" stopColor="#140b05" />
          </linearGradient>

          {/* Blue Shirt Gradient */}
          <linearGradient id="blueShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Yellow Shirt Gradient */}
          <linearGradient id="yellowShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Green Shirt Gradient */}
          <linearGradient id="greenShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          {/* Soft Shadow */}
          <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* 1. Sky Canvas */}
        <rect width="1400" height="320" fill="url(#headerSky)" />

        {/* 2. Distant Snow-Capped Himalayan Mountain Range (Annapurna & Machhapuchhre Fishtail) */}
        {/* Far Left Himalayan Peaks */}
        <polygon points="120,220 220,90 320,220" fill="url(#himalayaFar)" />
        <polygon points="190,115 220,90 250,115 220,135" fill="#ffffff" />
        <polygon points="280,220 390,75 510,220" fill="url(#himalayaFar)" />
        <polygon points="360,105 390,75 425,105 390,125" fill="#ffffff" />

        {/* Iconic Mt. Machhapuchhre (Fishtail Peak) in the Dramatic Center */}
        <g id="machhapuchhre-fishtail">
          {/* Main Mountain Body */}
          <polygon points="560,220 685,18 700,28 715,18 840,220" fill="url(#himalayaFar)" stroke="#94a3b8" strokeWidth="0.5" />
          {/* Distinct Fishtail Double Summit Snow Caps */}
          <polygon points="675,45 685,18 695,38 700,28 705,38 715,18 725,45 700,65" fill="#ffffff" />
          {/* Snowy Ribs & Ridges */}
          <polygon points="685,18 692,75 670,120 640,180 590,220 660,140" fill="#f8fafc" opacity="0.9" />
          <polygon points="715,18 708,75 730,120 760,180 810,220 740,140" fill="#cbd5e1" opacity="0.8" />
        </g>

        {/* Far Right Himalayan Peaks */}
        <polygon points="820,220 950,60 1080,220" fill="url(#himalayaFar)" />
        <polygon points="915,90 950,60 985,90 950,110" fill="#ffffff" />
        <polygon points="1040,220 1180,50 1320,220" fill="url(#himalayaFar)" />
        <polygon points="1145,80 1180,50 1215,80 1180,105" fill="#ffffff" />

        {/* 3. Golden Smiling Cartoon Sun resting on a Fluffy Cloud (Annapurna Sky) */}
        <g id="cartoon-smiling-sun" transform="translate(820, 35)">
          {/* Sun Glow */}
          <circle cx="0" cy="0" r="50" fill="url(#sunGlow)" opacity="0.6" />
          {/* Golden Rays */}
          <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <line x1="0" y1="-36" x2="0" y2="-44" />
            <line x1="25" y1="-25" x2="31" y2="-31" />
            <line x1="36" y1="0" x2="44" y2="0" />
            <line x1="25" y1="25" x2="31" y2="31" />
            <line x1="-25" y1="-25" x2="-31" y2="-31" />
            <line x1="-36" y1="0" x2="-44" y2="0" />
          </g>
          {/* Sun Face */}
          <circle cx="0" cy="0" r="28" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
          {/* Smiling Eyes */}
          <path d="M-10 -4 Q-6 -10 -2 -4" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M2 -4 Q6 -10 10 -4" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Rosy Cheeks */}
          <circle cx="-11" cy="2" r="3.5" fill="#fb7185" opacity="0.75" />
          <circle cx="11" cy="2" r="3.5" fill="#fb7185" opacity="0.75" />
          {/* Gentle Grin */}
          <path d="M-6 6 Q0 13 6 6" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="#b91c1c" />
          {/* Supporting Cloud below Sun */}
          <g fill="#ffffff" opacity="0.95" transform="translate(-35, 12)">
            <ellipse cx="20" cy="10" rx="22" ry="12" />
            <ellipse cx="40" cy="6" rx="24" ry="14" />
            <ellipse cx="58" cy="10" rx="18" ry="10" />
          </g>
        </g>

        {/* 4. Fluffy White Cartoon Clouds */}
        <g fill="#ffffff" opacity="0.92">
          <ellipse cx="180" cy="60" rx="35" ry="18" />
          <ellipse cx="205" cy="52" rx="28" ry="22" />
          <ellipse cx="160" cy="62" rx="24" ry="15" />
          <ellipse cx="380" cy="75" rx="38" ry="19" />
          <ellipse cx="405" cy="66" rx="26" ry="20" />
          <ellipse cx="1160" cy="60" rx="40" ry="20" />
          <ellipse cx="1190" cy="50" rx="32" ry="24" />
          <ellipse cx="1270" cy="70" rx="30" ry="16" />
        </g>

        {/* 5. Cascading Terraced Green Himalayan Foothills */}
        <path d="M0 210 Q 300 130 680 180 T 1400 160 L 1400 320 L 0 320 Z" fill="url(#hillBack)" />
        <path d="M0 245 Q 380 170 850 220 T 1400 200 L 1400 320 L 0 320 Z" fill="url(#hillFront)" />

        {/* Sweeping Terraced Rice Paddy Contours */}
        <path d="M40 230 Q 250 210 500 235" stroke="#15803d" strokeWidth="2.5" fill="none" opacity="0.65" />
        <path d="M600 200 Q 880 190 1200 220" stroke="#15803d" strokeWidth="2.5" fill="none" opacity="0.65" />
        <path d="M680 230 Q 940 215 1300 245" stroke="#15803d" strokeWidth="2.5" fill="none" opacity="0.65" />

        {/* 6. Nepali Village School (Left Background) */}
        <g id="village-school" transform="translate(25, 145)" filter="url(#softShadow)">
          {/* Blue Corrugated Tin Roof */}
          <polygon points="55,0 0,25 110,25" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          {/* School Stone Wall */}
          <rect x="10" y="25" width="90" height="42" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="2" />
          {/* Windows & Doors */}
          <rect x="20" y="32" width="16" height="18" fill="#38bdf8" stroke="#334155" strokeWidth="1.5" />
          <rect x="44" y="34" width="22" height="33" fill="#78350f" rx="1" />
          <rect x="74" y="32" width="16" height="18" fill="#38bdf8" stroke="#334155" strokeWidth="1.5" />
          {/* School Signboard */}
          <rect x="35" y="16" width="40" height="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" rx="2" />
          <text x="55" y="23" fontSize="6" fontWeight="bold" fill="#854d0e" textAnchor="middle">विद्यालय</text>
        </g>

        {/* Proud Nepali Triangular National Flags flying near the School */}
        <g id="nepal-national-flags" transform="translate(135, 120)" filter="url(#softShadow)">
          {/* Flag 1 (Taller Pole) */}
          <line x1="0" y1="0" x2="0" y2="70" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="0,0 30,16 10,22 30,38 0,44" fill="#dc2626" stroke="#1e3a8a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Moon Emblem (Upper Triangle) */}
          <circle cx="8" cy="11" r="3.5" fill="#ffffff" />
          <circle cx="9" cy="9.5" r="2.8" fill="#dc2626" />
          {/* Sun Emblem (Lower Triangle) */}
          <circle cx="8" cy="30" r="3" fill="#ffffff" />

          {/* Flag 2 (Slightly behind, smaller) */}
          <g transform="translate(26, 12)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <polygon points="0,0 24,13 8,18 24,31 0,36" fill="#dc2626" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="6" cy="9" r="2.8" fill="#ffffff" />
            <circle cx="7" cy="8" r="2.2" fill="#dc2626" />
            <circle cx="6" cy="24" r="2.5" fill="#ffffff" />
          </g>
        </g>

        {/* Stone Walking Trail with Wildflowers (Marigolds & Rhododendrons) */}
        <g id="village-stone-trail">
          {/* Trail Path */}
          <path d="M0 280 Q 120 270 280 320" stroke="#d6d3d1" strokeWidth="32" fill="none" opacity="0.6" strokeLinecap="round" />
          {/* Stone Texture dots */}
          <circle cx="45" cy="275" r="5" fill="#a8a29e" opacity="0.7" />
          <circle cx="90" cy="270" r="6" fill="#78716c" opacity="0.7" />
          <circle cx="140" cy="285" r="5" fill="#a8a29e" opacity="0.7" />
          <circle cx="210" cy="300" r="7" fill="#78716c" opacity="0.7" />
          {/* Orange Marigold (Sayapatri) Flowers */}
          <circle cx="15" cy="260" r="5" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
          <circle cx="25" cy="256" r="4.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="38" cy="262" r="5" fill="#ea580c" />
          <circle cx="65" cy="254" r="4.5" fill="#f97316" />
          {/* Pink Rhododendron Blossoms */}
          <circle cx="115" cy="258" r="4.5" fill="#ec4899" />
          <circle cx="125" cy="253" r="5" fill="#db2777" />
          <circle cx="185" cy="268" r="5" fill="#f97316" />
        </g>

        {/* 7. Traditional Village Scenery (Right Side) */}
        {/* Village House 1 (Traditional Slate/Red Roof) */}
        <g transform="translate(1080, 145)" filter="url(#softShadow)">
          <polygon points="45,22 0,55 90,55" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <rect x="8" y="55" width="74" height="46" fill="#fffbeb" stroke="#d97706" strokeWidth="2" rx="2" />
          <rect x="35" y="68" width="20" height="33" fill="#78350f" rx="2" />
          <rect x="14" y="62" width="14" height="14" fill="#38bdf8" stroke="#78350f" strokeWidth="1.5" />
          <rect x="62" y="62" width="14" height="14" fill="#38bdf8" stroke="#78350f" strokeWidth="1.5" />
        </g>
        {/* Village House 2 (Blue Tin Roof) */}
        <g transform="translate(1200, 160)" filter="url(#softShadow)">
          <polygon points="40,20 0,50 80,50" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <rect x="8" y="50" width="64" height="42" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2" />
          <rect x="30" y="62" width="18" height="30" fill="#78350f" rx="2" />
          <rect x="12" y="58" width="12" height="12" fill="#38bdf8" stroke="#78350f" strokeWidth="1.5" />
          <rect x="54" y="58" width="12" height="12" fill="#38bdf8" stroke="#78350f" strokeWidth="1.5" />
        </g>

        {/* Humanitarian Relief Tents (Community Care) */}
        <g transform="translate(980, 175)" filter="url(#softShadow)">
          <polygon points="30,10 5,45 55,45" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <polygon points="30,10 55,45 75,35 45,6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          {/* Blue Humanitarian Circle Logo */}
          <circle cx="30" cy="30" r="7" fill="#0284c7" />
          <circle cx="30" cy="30" r="4" fill="#ffffff" />
        </g>

        {/* Colorful Nepali Prayer Flags across the Village */}
        <path d="M1020 140 Q 1150 160 1280 135" stroke="#475569" strokeWidth="1.5" fill="none" />
        <polygon points="1040,143 1055,158 1055,145" fill="#3b82f6" />
        <polygon points="1070,146 1085,162 1085,148" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
        <polygon points="1100,150 1115,166 1115,152" fill="#dc2626" />
        <polygon points="1130,153 1145,169 1145,155" fill="#16a34a" />
        <polygon points="1160,153 1175,168 1175,154" fill="#facc15" />
        <polygon points="1190,151 1205,166 1205,152" fill="#3b82f6" />
        <polygon points="1220,147 1235,162 1235,148" fill="#dc2626" />
        <polygon points="1250,142 1265,156 1265,143" fill="#16a34a" />

        {/* Pine & Rhododendron Trees */}
        <g fill="#15803d">
          <polygon points="1340,180 1330,220 1350,220" />
          <polygon points="1340,165 1325,195 1355,195" />
          <polygon points="1340,150 1320,175 1360,175" />
          <rect x="1337" y="220" width="6" height="15" fill="#78350f" />
        </g>

        {/* ==================================================================== */}
        {/* 7. HIGH-QUALITY STORYBOOK ANIME CARTOON CHILDREN CLUSTER (TOP LEFT) */}
        {/* Modeled faithfully after the reference poster characters */}
        {/* ==================================================================== */}
        <g id="header-children-trio" filter="url(#softShadow)">
          {/* ------------------------------------------------------------------ */}
          {/* CHILD 3 (RIGHT): CHEERFUL YOUNGER BOY IN GREEN T-SHIRT             */}
          {/* ------------------------------------------------------------------ */}
          <g id="header-boy-green">
            {/* Body & Green T-Shirt */}
            <path
              d="M230 240 C215 242 205 260 205 310 L265 310 C265 260 255 242 240 240 Z"
              fill="url(#greenShirt)"
              stroke="#15803d"
              strokeWidth="2"
            />
            {/* White Collar Trim */}
            <path d="M224 240 Q235 248 246 240" stroke="#ffffff" strokeWidth="3" fill="none" />

            {/* Neck */}
            <rect x="228" y="224" width="14" height="18" fill="url(#skinGrad)" rx="3" />

            {/* Head Contour (Round, Chubby Cheerful Face) */}
            <path
              d="M214 185 C214 158 256 158 256 185 C256 212 245 228 235 228 C225 228 214 212 214 185 Z"
              fill="url(#skinGrad)"
              stroke="#e09f67"
              strokeWidth="1.2"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="221" cy="198" rx="6" ry="3.5" fill="#fb7185" opacity="0.65" />
            <ellipse cx="249" cy="198" rx="6" ry="3.5" fill="#fb7185" opacity="0.65" />

            {/* Cute Ears */}
            <ellipse cx="212" cy="190" rx="4" ry="6" fill="url(#skinGrad)" />
            <ellipse cx="258" cy="190" rx="4" ry="6" fill="url(#skinGrad)" />

            {/* Big Expressive Anime Eyes */}
            {/* Left Eye */}
            <ellipse cx="225" cy="184" rx="4.5" ry="6.5" fill="#1e293b" />
            <ellipse cx="225" cy="185" rx="3.5" ry="5.5" fill="#3b2010" />
            <circle cx="223.5" cy="182" r="2.2" fill="#ffffff" />
            <circle cx="226.5" cy="187" r="1" fill="#ffffff" />
            {/* Right Eye */}
            <ellipse cx="245" cy="184" rx="4.5" ry="6.5" fill="#1e293b" />
            <ellipse cx="245" cy="185" rx="3.5" ry="5.5" fill="#3b2010" />
            <circle cx="243.5" cy="182" r="2.2" fill="#ffffff" />
            <circle cx="246.5" cy="187" r="1" fill="#ffffff" />

            {/* Cheerful Eyebrows */}
            <path d="M221 174 Q226 170 231 173" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M239 173 Q244 170 249 174" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Button Nose */}
            <path d="M234 190 Q235 192 236 190" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Wide Happy Smile with Teeth */}
            <path d="M226 200 Q235 212 244 200 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1.2" />
            <path d="M228 200 Q235 203 242 200" fill="#ffffff" />

            {/* Short Layered Dark Hair */}
            <path
              d="M212 178 C210 150 230 142 248 145 C260 148 262 165 258 180 C254 165 248 160 238 162 C230 160 222 168 218 178 Z"
              fill="url(#hairDark)"
            />
            <path d="M225 158 Q235 152 246 156" stroke="#5a3825" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* ------------------------------------------------------------------ */}
          {/* CHILD 2 (CENTER): SWEET, CONFIDENT GIRL IN YELLOW T-SHIRT          */}
          {/* ------------------------------------------------------------------ */}
          <g id="header-girl-yellow">
            {/* Long Back Hair Strands */}
            <path
              d="M140 190 C135 230 145 280 155 310 L195 310 C205 280 215 230 210 190 Z"
              fill="url(#hairDark)"
            />

            {/* Body & Warm Yellow T-Shirt */}
            <path
              d="M150 230 C135 235 125 255 120 310 L230 310 C225 255 215 235 200 230 Z"
              fill="url(#yellowShirt)"
              stroke="#d97706"
              strokeWidth="2"
            />
            {/* Collar Trim */}
            <path d="M165 230 Q175 240 185 230" stroke="#fef08a" strokeWidth="3" fill="none" />

            {/* Neck */}
            <rect x="168" y="212" width="16" height="20" fill="url(#skinGrad)" rx="3" />

            {/* Head Contour (Refined Anime Face) */}
            <path
              d="M152 172 C152 142 198 142 198 172 C198 202 186 218 175 218 C164 218 152 202 152 172 Z"
              fill="url(#skinGrad)"
              stroke="#e09f67"
              strokeWidth="1.2"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="160" cy="186" rx="6.5" ry="3.5" fill="#fb7185" opacity="0.65" />
            <ellipse cx="190" cy="186" rx="6.5" ry="3.5" fill="#fb7185" opacity="0.65" />

            {/* Ears & Cute Red Hairclips */}
            <ellipse cx="150" cy="178" rx="4" ry="6" fill="url(#skinGrad)" />
            <ellipse cx="200" cy="178" rx="4" ry="6" fill="url(#skinGrad)" />
            <circle cx="154" cy="160" r="4.5" fill="#ef4444" />
            <circle cx="154" cy="160" r="2.5" fill="#fde047" />

            {/* Large Sparkling Anime Eyes with Eyelashes */}
            {/* Left Eye */}
            <ellipse cx="164" cy="172" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="164" cy="173" rx="4" ry="6" fill="#3b2010" />
            <circle cx="162.5" cy="170" r="2.4" fill="#ffffff" />
            <circle cx="165.5" cy="175" r="1.1" fill="#ffffff" />
            <path d="M158 167 Q164 163 170 166" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M170 166 L173 164" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="186" cy="172" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="186" cy="173" rx="4" ry="6" fill="#3b2010" />
            <circle cx="184.5" cy="170" r="2.4" fill="#ffffff" />
            <circle cx="187.5" cy="175" r="1.1" fill="#ffffff" />
            <path d="M180 166 Q186 163 192 167" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M192 167 L195 165" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

            {/* Eyebrows */}
            <path d="M159 162 Q164 158 170 161" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M180 161 Q186 158 191 162" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Cute Nose */}
            <path d="M174 178 Q175 180 176 178" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Warm Friendly Smile */}
            <path d="M166 188 Q175 198 184 188 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1.2" />
            <path d="M168 188 Q175 191 182 188" fill="#ffffff" />

            {/* Front Anime Hair Bangs */}
            <path
              d="M148 165 C146 135 170 128 192 130 C206 135 204 155 202 168 C198 152 188 145 178 148 C168 146 158 155 154 165 Z"
              fill="url(#hairDark)"
            />
            {/* Hair Sheen Highlights */}
            <path d="M165 140 Q176 135 188 138" stroke="#6d472c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* ------------------------------------------------------------------ */}
          {/* CHILD 1 (LEFT): ENERGETIC BOY IN ROYAL BLUE SHIRT, WAVING HIGH     */}
          {/* ------------------------------------------------------------------ */}
          <g id="header-boy-blue-waving">
            {/* Body & Royal Blue T-Shirt */}
            <path
              d="M80 225 C65 230 55 250 50 310 L150 310 C145 255 135 232 120 225 Z"
              fill="url(#blueShirt)"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
            {/* White Collar Accent */}
            <path d="M92 225 Q102 234 112 225" stroke="#ffffff" strokeWidth="3" fill="none" />

            {/* Waving Arm (Raised High to the Left with Friendly Open Palm) */}
            <path
              d="M68 230 C45 210 30 180 25 150 C23 140 38 135 44 148 C48 168 62 195 78 215 Z"
              fill="url(#blueShirt)"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            {/* Friendly Hand with 5 Open Fingers */}
            <g transform="translate(18, 125)">
              {/* Palm */}
              <circle cx="16" cy="18" r="9" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
              {/* Thumb */}
              <path d="M22 20 Q28 18 26 13 Q22 13 20 16 Z" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
              {/* Index */}
              <path d="M18 11 Q20 3 15 3 Q12 5 14 11 Z" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
              {/* Middle */}
              <path d="M13 11 Q13 1 9 1 Q6 3 9 11 Z" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
              {/* Ring */}
              <path d="M9 13 Q7 4 4 5 Q3 8 7 14 Z" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
              {/* Pinky */}
              <path d="M6 16 Q2 10 0 12 Q0 15 5 18 Z" fill="url(#skinGrad)" stroke="#e09f67" strokeWidth="1" />
            </g>

            {/* Neck */}
            <rect x="94" y="208" width="16" height="20" fill="url(#skinGrad)" rx="3" />

            {/* Head Contour (Energetic, Joyful Face) */}
            <path
              d="M78 168 C78 138 124 138 124 168 C124 198 112 214 101 214 C90 214 78 198 78 168 Z"
              fill="url(#skinGrad)"
              stroke="#e09f67"
              strokeWidth="1.2"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="86" cy="182" rx="6.5" ry="3.5" fill="#fb7185" opacity="0.65" />
            <ellipse cx="116" cy="182" rx="6.5" ry="3.5" fill="#fb7185" opacity="0.65" />

            {/* Ears */}
            <ellipse cx="76" cy="174" rx="4" ry="6" fill="url(#skinGrad)" />
            <ellipse cx="126" cy="174" rx="4" ry="6" fill="url(#skinGrad)" />

            {/* Big Expressive Anime Eyes */}
            {/* Left Eye */}
            <ellipse cx="90" cy="168" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="90" cy="169" rx="4" ry="6" fill="#3b2010" />
            <circle cx="88.5" cy="166" r="2.4" fill="#ffffff" />
            <circle cx="91.5" cy="171" r="1.1" fill="#ffffff" />
            {/* Right Eye */}
            <ellipse cx="112" cy="168" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="112" cy="169" rx="4" ry="6" fill="#3b2010" />
            <circle cx="110.5" cy="166" r="2.4" fill="#ffffff" />
            <circle cx="113.5" cy="171" r="1.1" fill="#ffffff" />

            {/* Eyebrows */}
            <path d="M85 158 Q90 154 96 157" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M106 157 Q112 154 117 158" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Cute Nose */}
            <path d="M100 174 Q101 176 102 174" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Wide Joyful Open Smile */}
            <path d="M92 184 Q101 198 110 184 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1.2" />
            <path d="M94 184 Q101 187 108 184" fill="#ffffff" />

            {/* Spiky Layered Anime Hair */}
            <path
              d="M74 162 C70 130 95 120 120 124 C132 128 130 148 128 162 C122 148 114 142 104 145 C95 142 85 150 82 162 Z"
              fill="url(#hairDark)"
            />
            {/* Front Spiky Strands */}
            <polygon points="88,144 94,154 96,142" fill="url(#hairDark)" />
            <polygon points="102,143 108,155 110,143" fill="url(#hairDark)" />
            <path d="M90 134 Q102 128 114 132" stroke="#6d472c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};


// ============================================================================
// 2. TEN POLISHED CARTOON BADGES FOR PSEA CORE MESSAGES (LEFT COLUMN)
// ============================================================================
interface MessageCartoonProps {
  id: number;
}

export const PseaMessageCartoon: React.FC<MessageCartoonProps> = ({ id }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full shrink-0 drop-shadow-sm transition-transform hover:scale-110 p-0.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`badgeShine-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Glow Ring */}
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />

      {/* MESSAGE 1: मेरो शरीर मेरो आफ्नो हो (Superhero Child with Golden Shield) */}
      {id === 1 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#dbeafe" />
          {/* Red Superhero Cape */}
          <path d="M30 46 L18 78 L38 74 L32 50 Z" fill="#ef4444" />
          <path d="M70 46 L82 78 L62 74 L68 50 Z" fill="#ef4444" />
          {/* Hero Kid Torso */}
          <path d="M36 50 L64 50 L60 82 L40 82 Z" fill="#2563eb" />
          {/* Golden Belt */}
          <rect x="39" y="74" width="22" height="4" fill="#facc15" />
          <circle cx="50" cy="76" r="3" fill="#ca8a04" />
          {/* Arms Akimbo (Hands on Hips - Confident) */}
          <path d="M36 52 L26 62 L38 66" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M64 52 L74 62 L62 66" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Head & Smiling Face */}
          <circle cx="50" cy="34" r="14" fill="#fed7aa" stroke="#e09f67" strokeWidth="1" />
          <circle cx="45" cy="32" r="2.2" fill="#1e293b" />
          <circle cx="55" cy="32" r="2.2" fill="#1e293b" />
          <ellipse cx="43" cy="36" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.6" />
          <ellipse cx="57" cy="36" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.6" />
          <path d="M46 39 Q50 44 54 39" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Hair */}
          <path d="M36 32 C36 18 64 18 64 32 C58 24 42 24 36 32 Z" fill="#3d2817" />
          {/* Golden Shield Crest on Chest */}
          <polygon points="50,56 56,60 56,68 50,72 44,68 44,60" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
        </g>
      )}

      {/* MESSAGE 2: म सुरक्षित रहने अधिकार राख्छु (Radiant Winged Heart) */}
      {id === 2 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#fef3c7" />
          {/* Golden Wings */}
          <path d="M28 50 C12 36 10 20 28 26 C22 34 26 44 32 48 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <path d="M72 50 C88 36 90 20 72 26 C78 34 74 44 68 48 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          {/* Radiant Glowing Red Heart */}
          <path
            d="M50 78 C32 64 22 48 28 34 C33 24 44 26 50 34 C56 26 67 24 72 34 C78 48 68 64 50 78 Z"
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="2"
          />
          {/* Heart Specular Highlights */}
          <path d="M34 36 C34 32 38 28 44 28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Sparkle Stars */}
          <polygon points="50,14 52,20 58,22 52,24 50,30 48,24 42,22 48,20" fill="#f59e0b" />
        </g>
      )}

      {/* MESSAGE 3: सहायता र सेवा निःशुल्क हुन्छन् (Gift Box with 100% Free Badge) */}
      {id === 3 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#dcfce7" />
          {/* Yellow Gift Box */}
          <rect x="24" y="44" width="52" height="40" fill="#facc15" stroke="#ca8a04" strokeWidth="2" rx="4" />
          <rect x="20" y="36" width="60" height="12" fill="#fbbf24" stroke="#ca8a04" strokeWidth="2" rx="3" />
          {/* Red Ribbons */}
          <rect x="46" y="36" width="8" height="48" fill="#ef4444" />
          <rect x="24" y="58" width="52" height="8" fill="#ef4444" />
          {/* Ribbon Bow */}
          <path d="M40 36 C32 24 44 20 48 34 Z" fill="#ef4444" />
          <path d="M60 36 C68 24 56 20 52 34 Z" fill="#ef4444" />
          <circle cx="50" cy="35" r="4" fill="#dc2626" />
          {/* Green "निःशुल्क / रू ०" Stamp */}
          <circle cx="70" cy="65" r="16" fill="#16a34a" stroke="#ffffff" strokeWidth="2.5" />
          <text x="70" y="69" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle">रू ०</text>
        </g>
      )}

      {/* MESSAGE 4: सहयोगको बदलामा अनुचित फाइदा माग्न मिल्दैन (Red Prohibited Circle over Conditional Gift) */}
      {id === 4 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#fee2e2" />
          {/* Package in Background */}
          <rect x="30" y="36" width="40" height="34" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" rx="3" />
          <path d="M50 36 L50 70 M30 52 L70 52" stroke="#dc2626" strokeWidth="2" />
          {/* Red Prohibition Ring and Slash */}
          <circle cx="50" cy="50" r="38" stroke="#dc2626" strokeWidth="6" fill="none" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {/* MESSAGE 5: मलाई मन नपरे 'हुँदैन' भन्न सक्छु (Assertive Open Hand STOP) */}
      {id === 5 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#ffedd5" />
          {/* Sunburst of Confidence */}
          <polygon points="50,8 55,22 68,14 65,28 80,30 70,40 82,49 68,53 75,67 61,62 60,78 50,68 40,78 39,62 25,67 32,53 18,49 30,40 20,30 35,28 32,14 45,22" fill="#fde047" opacity="0.65" />
          {/* Clear Open Hand (Palm Forward) */}
          <path
            d="M44 46 L44 32 Q44 28 47 28 Q50 28 50 32 L50 44 M50 42 L50 26 Q50 22 53 22 Q56 22 56 26 L56 42 M56 42 L56 29 Q56 25 59 25 Q62 25 62 29 L62 45 M62 45 L62 35 Q62 32 65 32 Q68 32 68 35 L68 52 C68 66 58 72 48 72 C40 72 36 64 36 56 L36 46 Q36 42 39 42 Q44 42 44 46 Z"
            fill="#ea580c"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* Badge Text */}
          <rect x="25" y="74" width="50" height="15" fill="#dc2626" rx="4" />
          <text x="50" y="85" fontSize="9" fontWeight="900" fill="#ffffff" textAnchor="middle">हुँदैन / NO</text>
        </g>
      )}

      {/* MESSAGE 6: विश्वसनीय वयस्कले मलाई सहयोग गर्न सक्छन् (Caring Teacher & Child) */}
      {id === 6 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#dbeafe" />
          {/* Gentle Teacher with Glasses */}
          <circle cx="65" cy="35" r="14" fill="#fed7aa" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="60" cy="35" r="3.5" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
          <circle cx="69" cy="35" r="3.5" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
          <line x1="63.5" y1="35" x2="65.5" y2="35" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M62 42 Q65 45 68 42" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M52 78 C52 56 80 56 80 78 Z" fill="#2563eb" />
          {/* Child looking up trustingly */}
          <circle cx="32" cy="48" r="11" fill="#fed7aa" />
          <circle cx="35" cy="46" r="2" fill="#1e293b" />
          <path d="M30 53 Q34 56 37 53" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M20 78 C20 62 44 62 44 78 Z" fill="#10b981" />
          {/* Heart Dialogue Bubble */}
          <circle cx="48" cy="22" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M48 26 C43 21 41 17 44 15 C47 14 48 16 48 16 C48 16 49 14 52 15 C55 17 53 21 48 26 Z" fill="#ffffff" />
        </g>
      )}

      {/* MESSAGE 7: बोल्नु साहसिक काम हो (Megaphone & Radiant Voice Rays) */}
      {id === 7 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#fce7f3" />
          {/* Sound Waves & Musical Stars */}
          <path d="M66 30 Q80 50 66 70" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M75 22 Q94 50 75 78" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" fill="none" />
          <polygon points="80,18 82,14 84,18 88,20 84,22 82,26 80,22 76,20" fill="#fde047" />
          {/* Golden Megaphone */}
          <polygon points="34,42 58,26 58,74 34,58" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
          <rect x="20" y="44" width="16" height="12" fill="#d97706" rx="2" />
          <path d="M26 56 L24 70 L30 70 L32 56 Z" fill="#78350f" />
          {/* Speaker Front Rim */}
          <ellipse cx="58" cy="50" rx="4" ry="24" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
        </g>
      )}

      {/* MESSAGE 8: सबै बालबालिकाले सम्मान पाउनुपर्छ (High-Five under Rainbow) */}
      {id === 8 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#dcfce7" />
          {/* Cheerful Rainbow Arch */}
          <path d="M18 64 A 34 34 0 0 1 82 64" stroke="#ef4444" strokeWidth="3" fill="none" />
          <path d="M21 64 A 31 31 0 0 1 79 64" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <path d="M24 64 A 28 28 0 0 1 76 64" stroke="#10b981" strokeWidth="3" fill="none" />
          <path d="M27 64 A 25 25 0 0 1 73 64" stroke="#3b82f6" strokeWidth="3" fill="none" />
          {/* Boy and Girl High-Fiving */}
          <circle cx="32" cy="46" r="10" fill="#fed7aa" />
          <circle cx="68" cy="46" r="10" fill="#fed7aa" />
          {/* High Five Hands Meeting in Center */}
          <path d="M38 54 L48 44" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 54 L52 44" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="44" r="5" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
          {/* Sparkles */}
          <polygon points="50,34 52,38 56,38 53,41 54,45 50,42 46,45 47,41 44,38 48,38" fill="#eab308" />
        </g>
      )}

      {/* MESSAGE 9: केटा र केटी दुवैलाई समान सुरक्षा (Equal Balance Scales) */}
      {id === 9 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#fef9c3" />
          {/* Golden Balance Scale Stand */}
          <rect x="47" y="24" width="6" height="52" fill="#ca8a04" rx="2" />
          <ellipse cx="50" cy="76" rx="18" ry="6" fill="#a16207" />
          {/* Scale Crossbar */}
          <line x1="22" y1="32" x2="78" y2="32" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="32" r="5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Left Pan (Boy Avatar) */}
          <line x1="26" y1="34" x2="20" y2="52" stroke="#a16207" strokeWidth="1.5" />
          <line x1="26" y1="34" x2="32" y2="52" stroke="#a16207" strokeWidth="1.5" />
          <path d="M16 52 Q26 58 36 52 Z" fill="#ca8a04" />
          <circle cx="26" cy="44" r="6" fill="#2563eb" />
          {/* Right Pan (Girl Avatar) */}
          <line x1="74" y1="34" x2="68" y2="52" stroke="#a16207" strokeWidth="1.5" />
          <line x1="74" y1="34" x2="80" y2="52" stroke="#a16207" strokeWidth="1.5" />
          <path d="M64 52 Q74 58 84 52 Z" fill="#ca8a04" />
          <circle cx="74" cy="44" r="6" fill="#e11d48" />
        </g>
      )}

      {/* MESSAGE 10: रिपोर्टिङले सबैलाई सुरक्षित राख्न मद्दत गर्छ (Green Shield with Star & Check) */}
      {id === 10 && (
        <g>
          <circle cx="50" cy="50" r="44" fill="#dcfce7" />
          {/* Green Guardian Shield */}
          <polygon points="50,16 78,26 78,54 50,84 22,54 22,26" fill="#16a34a" stroke="#15803d" strokeWidth="3" />
          <polygon points="50,22 72,30 72,52 50,76 28,52 28,30" fill="#22c55e" />
          {/* White Protective Envelope */}
          <rect x="36" y="44" width="28" height="18" fill="#ffffff" rx="2" />
          <polyline points="36,44 50,54 64,44" stroke="#16a34a" strokeWidth="2" fill="none" />
          {/* Golden Checkmark / Star of Safety */}
          <circle cx="50" cy="28" r="5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          <path d="M48 28 L49.5 29.5 L52 26.5" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}

      {/* Subtle Specular Shine Overlay */}
      <circle cx="50" cy="50" r="44" fill={`url(#badgeShine-${id})`} />
    </svg>
  );
};


// ============================================================================
// 3. THREE DETAILED CARTOON STORY PANELS FOR GUIDANCE (RIGHT COLUMN)
// Modeled faithfully after the character scenarios from the reference poster
// ============================================================================
interface ProtectionCartoonProps {
  type: 'exploitation' | 'abuse' | 'harassment';
}

export const ProtectionCartoonCard: React.FC<ProtectionCartoonProps> = ({ type }) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs">
      <svg
        viewBox="0 0 320 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="panelSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffeedb" />
            <stop offset="100%" stopColor="#fcd3a7" />
          </linearGradient>
          <linearGradient id="panelHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2817" />
            <stop offset="100%" stopColor="#140b05" />
          </linearGradient>
        </defs>

        {/* ================================================================== */}
        {/* PANEL 1: यौन शोषण (Unfair Condition - Brave Girl Refusing Offer)    */}
        {/* ================================================================== */}
        {type === 'exploitation' && (
          <g>
            <rect width="320" height="110" fill="#fff1f2" />

            {/* Left: Brave Cartoon Girl in Yellow Shirt Standing Firm */}
            <g id="panel-girl-refusing">
              {/* Torso & Yellow Shirt */}
              <path d="M50 65 L82 65 L78 105 L46 105 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              {/* Arm Extended with Open Palm Forward */}
              <path d="M75 70 L115 62" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
              {/* Open Palm Stopping the Trade */}
              <circle cx="120" cy="60" r="8" fill="url(#panelSkin)" stroke="#e09f67" strokeWidth="1" />
              <path d="M120 54 L120 66 M116 56 L124 64" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />

              {/* Head & Face */}
              <circle cx="64" cy="42" r="17" fill="url(#panelSkin)" stroke="#e09f67" strokeWidth="1" />
              <ellipse cx="58" cy="45" rx="3.5" ry="2" fill="#fb7185" opacity="0.6" />
              <ellipse cx="70" cy="45" rx="3.5" ry="2" fill="#fb7185" opacity="0.6" />
              {/* Serious, Confident Eyes */}
              <ellipse cx="60" cy="40" rx="3.5" ry="5" fill="#1e293b" />
              <circle cx="59" cy="38" r="1.5" fill="#ffffff" />
              <ellipse cx="68" cy="40" rx="3.5" ry="5" fill="#1e293b" />
              <circle cx="67" cy="38" r="1.5" fill="#ffffff" />
              <path d="M56 34 L63 35" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M66 35 L73 34" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
              {/* Firm Composed Mouth */}
              <line x1="60" y1="50" x2="68" y2="50" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
              {/* Dark Ponytail Hair */}
              <path d="M48 40 C46 18 80 18 80 40 C72 26 56 26 48 40 Z" fill="url(#panelHair)" />
              <path d="M46 36 C38 42 36 56 40 68" stroke="url(#panelHair)" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="44" cy="42" r="3.5" fill="#ef4444" /> {/* Hair Tie */}
            </g>

            {/* Middle: Clear Red Stop Symbol */}
            <g transform="translate(142, 28)">
              <polygon points="18,0 32,0 46,14 46,28 32,42 18,42 4,28 4,14" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <text x="25" y="26" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle">STOP</text>
            </g>

            {/* Right: Person in Blue Shirt Offering Conditional Package */}
            <g id="panel-person-offering">
              {/* Torso & Blue Shirt */}
              <path d="M245 62 L275 62 L270 105 L240 105 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
              {/* Arm Extending Gift Box */}
              <path d="M245 68 L205 68" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
              {/* Gift Box with Strings */}
              <rect x="180" y="52" width="30" height="26" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" rx="3" />
              <path d="M195 52 L195 78 M180 65 L210 65" stroke="#dc2626" strokeWidth="2" />
              {/* Head */}
              <circle cx="260" cy="42" r="16" fill="url(#panelSkin)" />
              <path d="M248 38 C248 24 274 24 274 38 Z" fill="url(#hairDark)" />
            </g>

            {/* Speech Bubble: "सहायता निःशुल्क हो !" */}
            <g transform="translate(68, 8)">
              <rect width="115" height="18" fill="#ffffff" stroke="#059669" strokeWidth="1.5" rx="6" />
              <text x="57" y="13" fontSize="8.5" fontWeight="900" fill="#065f46" textAnchor="middle">
                सहायता निःशुल्क हो !
              </text>
            </g>
          </g>
        )}

        {/* ================================================================== */}
        {/* PANEL 2: यौन दुर्व्यवहार (Boundary Crossing - Safe Personal Space)  */}
        {/* ================================================================== */}
        {type === 'abuse' && (
          <g>
            <rect width="320" height="110" fill="#f0fdf4" />

            {/* Safe Personal Space Aura (Green Glowing Boundary Circle) */}
            <circle cx="160" cy="55" r="48" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 4" />
            <text x="160" y="16" fontSize="9" fontWeight="900" fill="#15803d" textAnchor="middle">
              🛡️ मेरो सुरक्षित व्यक्तिगत सीमा
            </text>

            {/* Confident Child Standing Safely Inside Boundary with Shield */}
            <g id="panel-child-boundary">
              {/* Torso & Green/Yellow Shirt */}
              <path d="M148 68 L172 68 L170 105 L150 105 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />

              {/* Head & Confident Face */}
              <circle cx="160" cy="44" r="16" fill="url(#panelSkin)" stroke="#16a34a" strokeWidth="1" />
              <ellipse cx="154" cy="47" rx="3" ry="1.8" fill="#fb7185" opacity="0.6" />
              <ellipse cx="166" cy="47" rx="3" ry="1.8" fill="#fb7185" opacity="0.6" />
              <circle cx="155" cy="42" r="2.2" fill="#1e293b" />
              <circle cx="165" cy="42" r="2.2" fill="#1e293b" />
              <path d="M156 50 Q160 54 164 50" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Ponytail Hair */}
              <path d="M148 40 C146 22 174 22 174 40 Z" fill="url(#panelHair)" />

              {/* Green Protective Shield held firmly */}
              <polygon points="160,56 178,63 178,84 160,98 142,84 142,63" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
              <path d="M154 78 L158 82 L166 72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* Left Approach Blocked with Warning Barrier */}
            <g opacity="0.85">
              <circle cx="48" cy="50" r="16" fill="#cbd5e1" />
              <path d="M48 66 L55 105 L35 105 Z" fill="#64748b" />
              <path d="M68 55 L98 55" stroke="#dc2626" strokeWidth="3" strokeDasharray="4 3" />
              <circle cx="104" cy="55" r="10" fill="#dc2626" />
              <text x="104" y="59" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle">✕</text>
            </g>
          </g>
        )}

        {/* ================================================================== */}
        {/* PANEL 3: यौन उत्पीडन (Safe Reporting to Teacher / Counselor)       */}
        {/* ================================================================== */}
        {type === 'harassment' && (
          <g>
            <rect width="320" height="110" fill="#eff6ff" />

            {/* Bright Counselor Office Room Window */}
            <rect x="15" y="12" width="38" height="82" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" rx="3" />
            <circle cx="45" cy="52" r="2.5" fill="#1d4ed8" />

            {/* Left: Student Comfortably Sharing with Counselor */}
            <g id="panel-student-speaking">
              <circle cx="100" cy="46" r="15" fill="url(#panelSkin)" stroke="#f97316" strokeWidth="1" />
              <path d="M88 42 C88 28 112 28 112 42 Z" fill="url(#panelHair)" />
              <ellipse cx="100" cy="84" rx="16" ry="18" fill="#ec4899" />
              {/* Speech bubble */}
              <rect x="74" y="10" width="76" height="18" fill="#ffffff" stroke="#ec4899" strokeWidth="1.5" rx="6" />
              <text x="112" y="22" fontSize="8" fontWeight="bold" fill="#9d174d" textAnchor="middle">
                म कुरा गर्न चाहन्छु
              </text>
            </g>

            {/* Right: Caring Teacher / Counselor Listening at Desk */}
            <g id="panel-counselor-listening">
              <circle cx="210" cy="44" r="16" fill="url(#panelSkin)" stroke="#3b82f6" strokeWidth="1" />
              {/* Friendly Round Glasses */}
              <circle cx="205" cy="44" r="3.5" stroke="#1e40af" strokeWidth="1.2" fill="none" />
              <circle cx="215" cy="44" r="3.5" stroke="#1e40af" strokeWidth="1.2" fill="none" />
              <line x1="208.5" y1="44" x2="211.5" y2="44" stroke="#1e40af" strokeWidth="1.2" />
              <ellipse cx="210" cy="84" rx="22" ry="18" fill="#2563eb" />
              {/* Counselor Desk */}
              <rect x="140" y="76" width="68" height="24" fill="#b45309" rx="2" />
              <rect x="150" y="70" width="22" height="8" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
            </g>

            {/* Heart Dialogue Bubble in Center */}
            <circle cx="158" cy="48" r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <path d="M158 52 C154 48 152 44 155 42 C157 41 158 43 158 43 C158 43 159 41 161 42 C164 44 162 48 158 52 Z" fill="#ffffff" />

            {/* Helpline Badge: 1098 */}
            <g transform="translate(248, 22)">
              <rect width="62" height="46" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" rx="8" />
              <text x="31" y="16" fontSize="9" fontWeight="900" fill="#713f12" textAnchor="middle">
                📞 हेल्पलाइन
              </text>
              <text x="31" y="36" fontSize="16" fontWeight="900" fill="#dc2626" textAnchor="middle">
                १०९८
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};


// ============================================================================
// 4. BOTTOM FOOTER: CARTOON MEADOW & THREE CHILDREN PEEKING OVER BANNER
// Modeled faithfully after the bottom banner of the reference poster
// ============================================================================
export const VillageFooterLandscape: React.FC = () => {
  return (
    <div className="relative w-full aspect-[1400/240] min-h-[140px] sm:min-h-[180px] md:min-h-[210px] overflow-hidden rounded-b-xl select-none bg-sky-300">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1400 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="ftSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#7dd3fc" />
            <stop offset="85%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          {/* Mountains Gradient */}
          <linearGradient id="ftMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Left Hill Gradient */}
          <linearGradient id="ftHillLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Terraced Paddy Hill Gradient */}
          <linearGradient id="ftTerrace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Skin Tones */}
          <linearGradient id="ftSkinBoyLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>

          <linearGradient id="ftSkinGirlCenter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="ftSkinGirlWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5b77f" />
            <stop offset="100%" stopColor="#e08e45" />
          </linearGradient>

          <linearGradient id="ftSkinBoyRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fca5a5" />
          </linearGradient>

          {/* Shirts */}
          <linearGradient id="ftShirtBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <linearGradient id="ftShirtYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="ftShirtGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          {/* Parchment Banner Gradient */}
          <linearGradient id="ftParchment" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          {/* Badge Glow */}
          <filter id="ftGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 1. Sky Canvas */}
        <rect width="1400" height="240" fill="url(#ftSky)" />

        {/* 2. Soft White Cumulus Clouds in the Distance */}
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="140" cy="40" rx="60" ry="18" />
          <ellipse cx="180" cy="32" rx="45" ry="22" />
          <ellipse cx="380" cy="45" rx="70" ry="20" />
          <ellipse cx="420" cy="35" rx="55" ry="24" />
          <ellipse cx="880" cy="30" rx="80" ry="22" />
          <ellipse cx="930" cy="22" rx="60" ry="25" />
          <ellipse cx="1240" cy="35" rx="75" ry="20" />
          <ellipse cx="1280" cy="25" rx="55" ry="22" />
        </g>

        {/* 3. Snow-Capped Himalayan Mountain Range (Annapurna & Machhapuchhre) */}
        <g id="himalayas-backdrop">
          {/* Distant Peaks Left */}
          <polygon points="180,140 280,50 380,140" fill="url(#ftMtn)" opacity="0.75" />
          <polygon points="250,75 280,50 310,75 280,92" fill="#ffffff" />
          <polygon points="340,140 460,40 580,140" fill="url(#ftMtn)" opacity="0.8" />
          <polygon points="425,70 460,40 495,70 460,90" fill="#ffffff" />

          {/* Majestic Fishtail Peak (Machhapuchhre) Summit in Center-Right */}
          <polygon points="590,140 680,22 692,30 705,22 800,140" fill="url(#ftMtn)" stroke="#94a3b8" strokeWidth="0.5" />
          {/* Fishtail Twin Summit Snow */}
          <polygon points="670,42 680,22 688,38 692,30 696,38 705,22 715,42 692,58" fill="#ffffff" />
          <polygon points="680,22 686,60 670,95 640,140 620,140" fill="#f8fafc" opacity="0.9" />
          <polygon points="705,22 698,60 715,95 745,140 765,140" fill="#cbd5e1" opacity="0.8" />

          {/* Peaks Right */}
          <polygon points="760,140 880,45 1000,140" fill="url(#ftMtn)" opacity="0.8" />
          <polygon points="850,72 880,45 910,72 880,90" fill="#ffffff" />
          <polygon points="960,140 1080,55 1200,140" fill="url(#ftMtn)" opacity="0.75" />
          <polygon points="1050,78 1080,55 1110,78 1080,95" fill="#ffffff" />
        </g>

        {/* 4. Cascading Green Terraced Rice Paddies on the Right */}
        <g id="right-terraces">
          {/* Terrace Tier 1 (Highest) */}
          <path d="M680 120 Q 900 70 1400 90 L 1400 120 Q 950 95 680 120 Z" fill="#15803d" />
          <path d="M680 118 Q 900 68 1400 88 L 1400 92 Q 900 72 680 122 Z" fill="#14532d" />

          {/* Terrace Tier 2 */}
          <path d="M660 135 Q 920 85 1400 110 L 1400 135 Q 960 110 660 135 Z" fill="#16a34a" />
          <path d="M660 133 Q 920 83 1400 108 L 1400 112 Q 920 87 660 137 Z" fill="#14532d" />

          {/* Terrace Tier 3 */}
          <path d="M640 150 Q 940 100 1400 130 L 1400 155 Q 980 125 640 150 Z" fill="#22c55e" />
          <path d="M640 148 Q 940 98 1400 128 L 1400 132 Q 940 102 640 152 Z" fill="#15803d" />

          {/* Terrace Tier 4 */}
          <path d="M620 165 Q 960 115 1400 150 L 1400 175 Q 1000 140 620 165 Z" fill="#4ade80" />
          <path d="M620 163 Q 960 113 1400 148 L 1400 152 Q 960 117 620 167 Z" fill="#16a34a" />

          {/* Broad Lower Terraced Meadow */}
          <path d="M500 180 Q 900 135 1400 165 L 1400 240 L 500 240 Z" fill="url(#ftTerrace)" />

          {/* Small White & Yellow Daisies Scattered Across Terraces */}
          <g fill="#ffffff" opacity="0.9">
            <circle cx="920" cy="155" r="2.5" />
            <circle cx="980" cy="148" r="2" />
            <circle cx="1060" cy="160" r="2.5" />
            <circle cx="1120" cy="150" r="2" />
            <circle cx="1190" cy="165" r="2.5" />
            <circle cx="1250" cy="155" r="2" />
            <circle cx="1340" cy="160" r="2.5" />
            <circle cx="890" cy="190" r="3" />
            <circle cx="950" cy="180" r="2.5" />
            <circle cx="1020" cy="195" r="3" />
            <circle cx="1080" cy="185" r="2.5" />
            <circle cx="1140" cy="205" r="3.5" />
            <circle cx="1210" cy="190" r="2.5" />
            <circle cx="1270" cy="210" r="3.5" />
            <circle cx="1330" cy="200" r="3" />
            <circle cx="1370" cy="215" r="3.5" />
          </g>
          {/* Yellow Flower Centers */}
          <g fill="#facc15">
            <circle cx="890" cy="190" r="1.2" />
            <circle cx="1020" cy="195" r="1.2" />
            <circle cx="1140" cy="205" r="1.4" />
            <circle cx="1270" cy="210" r="1.4" />
            <circle cx="1370" cy="215" r="1.4" />
          </g>
        </g>

        {/* 5. Rolling Green Sloping Hill on the Left */}
        <path d="M0 80 Q 250 110 520 185 L 520 240 L 0 240 Z" fill="url(#ftHillLeft)" />

        {/* 6. Abundant Foreground Wildflower Garden on the Left Slope */}
        <g id="left-wildflowers">
          {/* Tall Green Grass Blades */}
          <path d="M10 240 Q 20 180 5 150 Q 25 180 30 240" fill="#15803d" />
          <path d="M25 240 Q 40 170 30 135 Q 50 175 55 240" fill="#16a34a" />
          <path d="M45 240 Q 70 160 55 120 Q 80 170 85 240" fill="#22c55e" />
          <path d="M70 240 Q 95 175 90 140 Q 110 185 115 240" fill="#15803d" />
          <path d="M95 240 Q 120 180 110 145 Q 135 190 140 240" fill="#16a34a" />
          <path d="M120 240 Q 145 190 140 160 Q 165 200 170 240" fill="#22c55e" />
          <path d="M150 240 Q 175 195 180 170 Q 195 205 200 240" fill="#15803d" />

          {/* Purple Lupines / Tall Flower Spikes */}
          <g transform="translate(115, 120)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="#16a34a" strokeWidth="2.5" />
            <circle cx="-3" cy="10" r="3" fill="#a855f7" />
            <circle cx="3" cy="10" r="3" fill="#9333ea" />
            <circle cx="-4" cy="17" r="3.5" fill="#a855f7" />
            <circle cx="4" cy="17" r="3.5" fill="#7e22ce" />
            <circle cx="-4" cy="25" r="4" fill="#9333ea" />
            <circle cx="4" cy="25" r="4" fill="#a855f7" />
            <circle cx="-5" cy="34" r="4.5" fill="#7e22ce" />
            <circle cx="5" cy="34" r="4.5" fill="#9333ea" />
            <circle cx="-5" cy="43" r="4.5" fill="#a855f7" />
            <circle cx="5" cy="43" r="4.5" fill="#7e22ce" />
          </g>

          <g transform="translate(195, 160)">
            <line x1="0" y1="0" x2="0" y2="50" stroke="#16a34a" strokeWidth="2" />
            <circle cx="-3" cy="8" r="2.8" fill="#a855f7" />
            <circle cx="3" cy="8" r="2.8" fill="#9333ea" />
            <circle cx="-3.5" cy="15" r="3.2" fill="#7e22ce" />
            <circle cx="3.5" cy="15" r="3.2" fill="#a855f7" />
            <circle cx="-4" cy="23" r="3.5" fill="#9333ea" />
            <circle cx="4" cy="23" r="3.5" fill="#7e22ce" />
            <circle cx="-4" cy="31" r="3.8" fill="#a855f7" />
            <circle cx="4" cy="31" r="3.8" fill="#9333ea" />
          </g>

          {/* Bright Orange Marigolds (सयपत्री) with Ruffled Petals */}
          {/* Marigold 1 */}
          <g transform="translate(12, 145)">
            <circle cx="0" cy="0" r="10" fill="#f97316" />
            <circle cx="0" cy="0" r="8" fill="#ea580c" />
            <circle cx="0" cy="0" r="5" fill="#fbbf24" />
            <circle cx="0" cy="0" r="2.5" fill="#d97706" />
          </g>
          {/* Marigold 2 */}
          <g transform="translate(32, 185)">
            <circle cx="0" cy="0" r="13" fill="#f97316" />
            <circle cx="0" cy="0" r="10" fill="#ea580c" />
            <circle cx="0" cy="0" r="7" fill="#fbbf24" />
            <circle cx="0" cy="0" r="3.5" fill="#d97706" />
          </g>
          {/* Marigold 3 */}
          <g transform="translate(15, 215)">
            <circle cx="0" cy="0" r="12" fill="#f97316" />
            <circle cx="0" cy="0" r="9" fill="#ea580c" />
            <circle cx="0" cy="0" r="6" fill="#fbbf24" />
          </g>
          {/* Marigold 4 */}
          <g transform="translate(52, 210)">
            <circle cx="0" cy="0" r="11" fill="#ea580c" />
            <circle cx="0" cy="0" r="8" fill="#f97316" />
            <circle cx="0" cy="0" r="5" fill="#fbbf24" />
          </g>

          {/* Yellow Daisies / Dandelions */}
          {/* Yellow Daisy 1 */}
          <g transform="translate(70, 160)">
            <circle cx="0" cy="0" r="9" fill="#facc15" />
            <circle cx="0" cy="0" r="5" fill="#eab308" />
            <circle cx="0" cy="0" r="2.5" fill="#ca8a04" />
          </g>
          {/* Yellow Daisy 2 */}
          <g transform="translate(110, 180)">
            <circle cx="0" cy="0" r="8" fill="#fde047" />
            <circle cx="0" cy="0" r="4.5" fill="#eab308" />
          </g>
          {/* Yellow Daisy 3 */}
          <g transform="translate(138, 205)">
            <circle cx="0" cy="0" r="10" fill="#facc15" />
            <circle cx="0" cy="0" r="6" fill="#eab308" />
            <circle cx="0" cy="0" r="3" fill="#ca8a04" />
          </g>
          {/* Yellow Daisy 4 */}
          <g transform="translate(165, 225)">
            <circle cx="0" cy="0" r="8.5" fill="#fde047" />
            <circle cx="0" cy="0" r="5" fill="#eab308" />
          </g>

          {/* Fluttering Butterflies */}
          {/* Blue Butterfly */}
          <g transform="translate(115, 88) rotate(-15)">
            {/* Wings */}
            <ellipse cx="-7" cy="-5" rx="7" ry="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
            <ellipse cx="7" cy="-5" rx="7" ry="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
            <ellipse cx="-5" cy="4" rx="5" ry="3.5" fill="#0284c7" />
            <ellipse cx="5" cy="4" rx="5" ry="3.5" fill="#0284c7" />
            {/* Body & Antennae */}
            <ellipse cx="0" cy="0" rx="1.5" ry="6" fill="#0f172a" />
            <path d="M-1 -6 Q -3 -10 -5 -10 M 1 -6 Q 3 -10 5 -10" stroke="#0f172a" strokeWidth="0.8" fill="none" />
          </g>

          {/* Pinkish Orange Butterfly */}
          <g transform="translate(195, 115) rotate(20)">
            <ellipse cx="-6" cy="-4" rx="6" ry="4" fill="#fb7185" stroke="#e11d48" strokeWidth="0.8" />
            <ellipse cx="6" cy="-4" rx="6" ry="4" fill="#fb7185" stroke="#e11d48" strokeWidth="0.8" />
            <ellipse cx="-4" cy="3" rx="4" ry="3" fill="#f43f5e" />
            <ellipse cx="4" cy="3" rx="4" ry="3" fill="#f43f5e" />
            <ellipse cx="0" cy="0" rx="1.2" ry="5" fill="#0f172a" />
          </g>

          {/* Cute Red Ladybug on Blade */}
          <g transform="translate(85, 125)">
            <ellipse cx="0" cy="0" rx="4" ry="3" fill="#dc2626" />
            <ellipse cx="3.5" cy="0" rx="1.5" ry="2" fill="#0f172a" />
            <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#0f172a" strokeWidth="0.8" />
            <circle cx="-1" cy="-1.2" r="0.6" fill="#0f172a" />
            <circle cx="-1" cy="1.2" r="0.6" fill="#0f172a" />
            <circle cx="1.5" cy="-1" r="0.6" fill="#0f172a" />
            <circle cx="1.5" cy="1" r="0.6" fill="#0f172a" />
          </g>
        </g>

        {/* 7. THE THREE SMILING CHILDREN LEANING OVER BANNER (Center Left) */}
        {/* Child 1 (Left - Boy in Sky Blue Shirt) */}
        <g id="boy-blue-waving">
          {/* Raised Waving Left Arm (Waving to the Left with Open Hand) */}
          <path
            d="M295 125 C275 105 260 80 252 50 C250 42 262 38 268 48 C274 65 288 90 305 110 Z"
            fill="url(#ftShirtBlue)"
            stroke="#1e3a8a"
            strokeWidth="1.2"
          />
          {/* Waving Hand with 5 Open Fingers */}
          <g transform="translate(242, 32)">
            {/* Palm */}
            <circle cx="12" cy="14" r="8" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            {/* Thumb */}
            <path d="M18 16 Q23 14 21 9 Q17 10 15 13 Z" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            {/* Fingers */}
            <path d="M16 8 Q17 1 13 1 Q11 4 12 8 Z" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M11 7 Q10 0 7 1 Q6 5 8 8 Z" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M6 9 Q4 2 2 3 Q2 7 5 10 Z" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M3 13 Q-1 8 -2 10 Q-1 13 3 15 Z" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
          </g>

          {/* Torso & Sky Blue Collared Shirt */}
          <path
            d="M285 110 C270 120 262 145 260 190 L335 190 C332 145 325 120 310 110 Z"
            fill="url(#ftShirtBlue)"
            stroke="#1d4ed8"
            strokeWidth="1.5"
          />
          {/* White Fold-Down Collar */}
          <path d="M290 112 Q298 122 305 112" stroke="#ffffff" strokeWidth="2.5" fill="none" />
          <line x1="298" y1="120" x2="298" y2="155" stroke="#1e3a8a" strokeWidth="1.5" />
          <circle cx="298" cy="130" r="1.2" fill="#ffffff" />
          <circle cx="298" cy="142" r="1.2" fill="#ffffff" />

          {/* Neck */}
          <rect x="291" y="98" width="14" height="15" fill="url(#ftSkinBoyLeft)" rx="2" />

          {/* Head & Cheerful Face */}
          <ellipse cx="298" cy="78" rx="22" ry="24" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="1" />
          {/* Rosy Cheeks */}
          <ellipse cx="284" cy="85" rx="5" ry="3" fill="#fb7185" opacity="0.65" />
          <ellipse cx="312" cy="85" rx="5" ry="3" fill="#fb7185" opacity="0.65" />
          {/* Sparkling Anime Eyes */}
          <ellipse cx="288" cy="74" rx="4" ry="5.5" fill="#1e293b" />
          <circle cx="286.5" cy="72" r="1.8" fill="#ffffff" />
          <ellipse cx="308" cy="74" rx="4" ry="5.5" fill="#1e293b" />
          <circle cx="306.5" cy="72" r="1.8" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M284 66 Q289 62 294 65" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M302 65 Q307 62 312 66" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Cute Nose */}
          <path d="M297 80 Q298 83 299 80" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Wide Happy Grin with White Teeth */}
          <path d="M286 87 Q298 100 310 87 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
          <path d="M288 87 Q298 91 308 87" fill="#ffffff" />

          {/* Messy Black Anime Hair */}
          <path
            d="M272 75 C268 50 280 40 300 40 C322 40 332 52 325 75 C320 62 312 55 300 58 C288 55 278 62 272 75 Z"
            fill="#1c1917"
          />
          {/* Hair Wisps / Bangs */}
          <polygon points="280,62 286,72 292,62" fill="#1c1917" />
          <polygon points="292,62 298,74 304,62" fill="#1c1917" />
          <polygon points="304,62 312,72 316,62" fill="#1c1917" />

          {/* Right Hand Gripping Top of Banner */}
          <g id="boy-left-hand-banner" transform="translate(290, 182)">
            <rect x="0" y="0" width="22" height="10" rx="5" fill="url(#ftSkinBoyLeft)" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="5" y1="2" x2="5" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="11" y1="2" x2="11" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="17" y1="2" x2="17" y2="8" stroke="#c2410c" strokeWidth="0.8" />
          </g>
        </g>

        {/* Child 2 (Center - Girl in Yellow Shirt with Hair Flower) */}
        <g id="girl-center">
          {/* Long Braided Dark Hair over Shoulder */}
          <path
            d="M345 90 C340 120 348 160 355 185 L365 185 C360 160 355 120 360 90 Z"
            fill="#29180d"
          />

          {/* Torso & Sunny Yellow Shirt */}
          <path
            d="M350 115 C335 125 330 150 328 190 L405 190 C402 150 395 125 380 115 Z"
            fill="url(#ftShirtYellow)"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          {/* Crisp White Fold-Down Rounded Collar */}
          <path d="M352 116 Q365 128 378 116" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <path d="M358 116 Q365 124 372 116" stroke="#ca8a04" strokeWidth="1.5" fill="none" />

          {/* Neck */}
          <rect x="358" y="102" width="14" height="16" fill="url(#ftSkinGirlWarm)" rx="2" />

          {/* Head & Radiant Warm-Skin Face */}
          <ellipse cx="365" cy="80" rx="23" ry="25" fill="url(#ftSkinGirlWarm)" stroke="#c2410c" strokeWidth="1" />
          {/* Rosy Cheeks */}
          <ellipse cx="350" cy="88" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.7" />
          <ellipse cx="380" cy="88" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.7" />
          {/* Sparkling Big Anime Eyes */}
          <ellipse cx="354" cy="76" rx="4.5" ry="6" fill="#1e293b" />
          <circle cx="352.5" cy="74" r="2" fill="#ffffff" />
          <circle cx="355" cy="78" r="0.9" fill="#ffffff" />
          <ellipse cx="376" cy="76" rx="4.5" ry="6" fill="#1e293b" />
          <circle cx="374.5" cy="74" r="2" fill="#ffffff" />
          <circle cx="377" cy="78" r="0.9" fill="#ffffff" />
          {/* Delicate Eyebrows */}
          <path d="M349 68 Q355 64 361 68" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M369 68 Q375 64 381 68" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Cute Nose */}
          <path d="M364 82 Q365 85 366 82" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Radiant Broad Grin with White Teeth */}
          <path d="M352 90 Q365 104 378 90 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
          <path d="M354 90 Q365 94 376 90" fill="#ffffff" />

          {/* Dark Brown Hair with Bangs */}
          <path
            d="M340 76 C336 48 350 40 370 40 C392 40 402 52 396 76 C390 62 380 54 368 56 C354 54 344 62 340 76 Z"
            fill="#29180d"
          />
          {/* Red Flower Blossom Hairclip */}
          <g transform="translate(345, 62)">
            <circle cx="-3" cy="-3" r="3.5" fill="#ef4444" />
            <circle cx="3" cy="-3" r="3.5" fill="#ef4444" />
            <circle cx="-3" cy="3" r="3.5" fill="#ef4444" />
            <circle cx="3" cy="3" r="3.5" fill="#ef4444" />
            <circle cx="0" cy="0" r="2.5" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
          </g>

          {/* Both Hands Resting on Banner Rail */}
          <g id="girl-hands-banner" transform="translate(352, 182)">
            <rect x="0" y="0" width="26" height="10" rx="5" fill="url(#ftSkinGirlWarm)" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="6" y1="2" x2="6" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="13" y1="2" x2="13" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="20" y1="2" x2="20" y2="8" stroke="#c2410c" strokeWidth="0.8" />
          </g>
        </g>

        {/* Child 3 (Right - Boy in Green Polo Shirt, Waving High to the Right) */}
        <g id="boy-green-waving">
          {/* Raised Waving Right Arm */}
          <path
            d="M440 125 C460 105 475 80 482 50 C485 42 472 38 466 48 C460 65 446 90 430 110 Z"
            fill="url(#ftShirtGreen)"
            stroke="#14532d"
            strokeWidth="1.2"
          />
          {/* Waving Hand with 5 Open Fingers */}
          <g transform="translate(470, 32)">
            <circle cx="12" cy="14" r="8" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M6 16 Q1 14 3 9 Q7 10 9 13 Z" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M8 8 Q7 1 11 1 Q13 4 12 8 Z" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M13 7 Q14 0 17 1 Q18 5 16 8 Z" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M18 9 Q20 2 22 3 Q22 7 19 10 Z" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <path d="M21 13 Q25 8 26 10 Q25 13 21 15 Z" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
          </g>

          {/* Torso & Meadow Green Polo Shirt */}
          <path
            d="M415 110 C405 120 400 145 398 190 L470 190 C468 145 460 120 445 110 Z"
            fill="url(#ftShirtGreen)"
            stroke="#15803d"
            strokeWidth="1.5"
          />
          {/* Polo Collar & Button */}
          <path d="M422 112 Q430 122 438 112" stroke="#14532d" strokeWidth="2.5" fill="none" />
          <line x1="430" y1="120" x2="430" y2="150" stroke="#14532d" strokeWidth="1.5" />
          <circle cx="430" cy="128" r="1.2" fill="#ffffff" />
          <circle cx="430" cy="140" r="1.2" fill="#ffffff" />

          {/* Neck */}
          <rect x="423" y="98" width="14" height="15" fill="url(#ftSkinBoyRight)" rx="2" />

          {/* Head & Joyful Smiling Face */}
          <ellipse cx="430" cy="78" rx="22" ry="24" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="1" />
          {/* Rosy Cheeks */}
          <ellipse cx="416" cy="85" rx="5" ry="3" fill="#fb7185" opacity="0.65" />
          <ellipse cx="444" cy="85" rx="5" ry="3" fill="#fb7185" opacity="0.65" />
          {/* Sparkling Anime Eyes */}
          <ellipse cx="420" cy="74" rx="4" ry="5.5" fill="#1e293b" />
          <circle cx="418.5" cy="72" r="1.8" fill="#ffffff" />
          <ellipse cx="440" cy="74" rx="4" ry="5.5" fill="#1e293b" />
          <circle cx="438.5" cy="72" r="1.8" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M416 66 Q421 62 426 65" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M434 65 Q439 62 444 66" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Nose */}
          <path d="M429 80 Q430 83 431 80" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Joyful Open Smile showing teeth */}
          <path d="M418 87 Q430 100 442 87 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
          <path d="M420 87 Q430 91 440 87" fill="#ffffff" />

          {/* Short Tidy Black Hair with Bangs */}
          <path
            d="M406 75 C402 50 414 40 432 40 C454 40 464 52 458 75 C452 62 444 55 432 58 C420 55 410 62 406 75 Z"
            fill="#1c1917"
          />
          <polygon points="414,62 420,72 426,62" fill="#1c1917" />
          <polygon points="426,62 432,74 438,62" fill="#1c1917" />

          {/* Left Hand Gripping Top of Banner */}
          <g id="boy-right-hand-banner" transform="translate(420, 182)">
            <rect x="0" y="0" width="22" height="10" rx="5" fill="url(#ftSkinBoyRight)" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="5" y1="2" x2="5" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="11" y1="2" x2="11" y2="8" stroke="#c2410c" strokeWidth="0.8" />
            <line x1="17" y1="2" x2="17" y2="8" stroke="#c2410c" strokeWidth="0.8" />
          </g>
        </g>

        {/* 8. THE CENTRAL PARCHMENT / SCROLL HELD BY THE CHILDREN */}
        <g id="central-parchment-scroll" filter="url(#ftGlow)">
          {/* Scroll Body */}
          <path
            d="M260 188 Q 400 185 540 188 L 530 240 L 270 240 Z"
            fill="url(#ftParchment)"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          {/* Rolled / Folded Parchment Rim where fingers grip */}
          <path d="M260 188 Q 400 183 540 188" stroke="#b45309" strokeWidth="3" fill="none" />
          <path d="M268 194 Q 400 190 532 194" stroke="#fef08a" strokeWidth="1.5" fill="none" />

          {/* Main Slogan in the Parchment */}
          <text
            x="400"
            y="214"
            fontSize="14"
            fontWeight="900"
            fill="#78350f"
            textAnchor="middle"
            letterSpacing="0.2"
          >
            हामी सबैको जिम्मेवारी: हेरचाह, सम्मान र सुरक्षा
          </text>
          <text
            x="400"
            y="230"
            fontSize="9"
            fontWeight="bold"
            fill="#15803d"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            बालबालिकाको हक, अधिकार र सुरक्षित भविष्यको प्रत्याभूति
          </text>
        </g>

        {/* 9. THE OFFICIAL "CHILD HELPLINE 1098" EMBLEM / BADGE (Far Right) */}
        <g id="child-helpline-1098-badge" transform="translate(1140, 55)" filter="url(#ftGlow)">
          {/* White Sticker Capsule Frame */}
          <rect
            x="0"
            y="0"
            width="235"
            height="115"
            rx="32"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="3"
          />

          {/* Retro Yellow Telephone Handset */}
          <g id="phone-handset" transform="translate(20, 16)">
            {/* Handset Outer Silhouette */}
            <path
              d="M12 18 C12 8 22 2 32 6 C42 10 40 24 32 28 C26 31 22 36 24 45 C26 54 34 60 42 66 C48 70 56 68 62 60 C66 54 78 54 82 64 C86 74 80 84 70 86 C55 88 38 78 24 64 C10 50 4 32 12 18 Z"
              fill="#f59e0b"
              stroke="#0f2b48"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Handset Inner Highlight */}
            <path
              d="M18 20 C18 14 24 10 30 12 C34 14 34 22 28 25 C20 29 18 36 20 44 C22 52 28 58 35 63 C40 66 46 64 50 58 C53 54 62 54 65 61"
              stroke="#fef08a"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Heart Speech Bubble inside top handset loop */}
            <g transform="translate(48, 12)">
              <ellipse cx="14" cy="14" rx="14" ry="12" fill="#ffffff" stroke="#0f2b48" strokeWidth="2.5" />
              <polygon points="8,24 14,21 16,26" fill="#ffffff" stroke="#0f2b48" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Red Heart inside Bubble */}
              <path
                d="M14 20 C10 16 7 13 9 10 C11 8 13 9 14 11 C15 9 17 8 19 10 C21 13 18 16 14 20 Z"
                fill="#ef4444"
              />
            </g>

            {/* Golden Shield with Orange/Red Heart inside handset arc */}
            <g transform="translate(36, 42)">
              <polygon points="12,0 24,5 24,18 12,25 0,18 0,5" fill="#fde047" stroke="#0284c7" strokeWidth="2" />
              {/* Heart in Shield */}
              <path
                d="M12 19 C9 16 6 13 8 10 C9.5 8.5 11.5 9.5 12 11 C12.5 9.5 14.5 8.5 16 10 C18 13 15 16 12 19 Z"
                fill="#ea580c"
              />
            </g>

            {/* Floating Little Red Hearts */}
            <path
              d="M18 78 C15 75 13 73 14 71 C15 70 16.5 70.5 17 71.5 C17.5 70.5 19 70 20 71 C21 73 19 75 18 78 Z"
              fill="#ef4444"
            />
          </g>

          {/* Child Helpline Typography */}
          <g transform="translate(108, 18)">
            {/* "CHILD" */}
            <text
              x="0"
              y="20"
              fontSize="23"
              fontWeight="900"
              fill="#0f2b48"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              CHILD
            </text>

            {/* "HELPLINE" */}
            <text
              x="0"
              y="40"
              fontSize="16"
              fontWeight="900"
              fill="#0f2b48"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.6"
            >
              HELPLINE
            </text>

            {/* "1098" In Giant Red Letters */}
            <text
              x="0"
              y="78"
              fontSize="38"
              fontWeight="900"
              fill="#dc2626"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-0.5"
            >
              1098
            </text>

            {/* Cute Golden 5-Point Star next to 1098 */}
            <polygon
              points="104,50 107,58 115,59 109,64 111,72 104,67 97,72 99,64 93,59 101,58"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
