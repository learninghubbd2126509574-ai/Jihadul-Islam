import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Like Earning: 3D Hand holding shiny coins with heart and like badges
export const LikeEarning3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="le-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="le-hand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="25%" stopColor="#fed7aa" />
        <stop offset="80%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="le-sleeve" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="le-coin-gold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="le-coin-pink" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="50%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="le-coin-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <filter id="le-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#le-glow)" />

    <g filter="url(#le-shadow)">
      {/* Background stacked coins */}
      {/* Blue Coin */}
      <g transform="translate(18, 16)">
        <ellipse cx="12" cy="14" rx="9" ry="5.5" fill="#1e40af" />
        <path d="M3 14 v4 c0 3 4 5.5 9 5.5 s9 -2.5 9 -5.5 v-4 Z" fill="#1d4ed8" />
        <ellipse cx="12" cy="13" rx="9" ry="5.5" fill="url(#le-coin-blue)" />
        <ellipse cx="12" cy="13" rx="6.5" ry="3.8" fill="none" stroke="#bfdbfe" strokeWidth="0.8" />
      </g>

      {/* Gold Coin Stack */}
      <g transform="translate(28, 11)">
        <ellipse cx="13" cy="15" rx="10" ry="6" fill="#a16207" />
        <path d="M3 15 v4 c0 3.3 4.5 6 10 6 s10 -2.7 10 -6 v-4 Z" fill="#ca8a04" />
        <ellipse cx="13" cy="14" rx="10" ry="6" fill="url(#le-coin-gold)" />
        <ellipse cx="13" cy="14" rx="7.5" ry="4.2" fill="none" stroke="#fef9c3" strokeWidth="0.9" />
        {/* Star glyph */}
        <path d="M13 11.5 l1 1.8 2 0.3 -1.5 1.4 0.4 2 -1.9 -1 -1.9 1 0.4 -2 -1.5 -1.4 2 -0.3 Z" fill="#854d0e" />
      </g>

      {/* Pink Heart Coin (Foreground main) */}
      <g transform="translate(36, 17)">
        <ellipse cx="13" cy="16" rx="11" ry="6.8" fill="#9f1239" />
        <path d="M2 16 v5 c0 3.7 4.9 6.8 11 6.8 s11 -3.1 11 -6.8 v-5 Z" fill="#e11d48" />
        <ellipse cx="13" cy="15" rx="11" ry="6.8" fill="url(#le-coin-pink)" />
        <ellipse cx="13" cy="15" rx="8.5" ry="4.8" fill="none" stroke="#ffe4e6" strokeWidth="1" />
        {/* Heart icon */}
        <path d="M13 18.2 c-0.3 0 -3 -2.2 -3 -3.7 0 -0.9 0.7 -1.6 1.6 -1.6 0.6 0 1.1 0.3 1.4 0.8 0.3 -0.5 0.8 -0.8 1.4 -0.8 0.9 0 1.6 0.7 1.6 1.6 0 1.5 -2.7 3.7 -3 3.7 Z" fill="#ffffff" />
      </g>

      {/* Hand & Arm */}
      {/* Sleeve */}
      <path d="M2 58 L18 53 L21 68 L5 74 Z" fill="url(#le-sleeve)" />
      {/* White cuff */}
      <path d="M16 53.5 L20 52.2 L23 67 L19 68.5 Z" fill="#f8fafc" />
      {/* Palm and Fingers */}
      <path d="M20 54 C25 51 32 50 40 52 C48 54 57 56 61 54 C64 52 66 50 64 47 C62 44 56 45 49 46 C44 47 38 46 32 45 C28 44 24 47 20 52 Z" fill="url(#le-hand)" />
      {/* Thumb */}
      <path d="M27 49 C28 44 32 41 38 43 C42 44 43 47 40 49 C36 51 30 51 27 49 Z" fill="#fed7aa" />
      {/* Front cupped fingers */}
      <path d="M42 53 C48 53 54 54 58 52 C61 50 63 47 61 46 C57 44 51 46 45 47 C40 48 35 48 32 49 C34 52 38 53 42 53 Z" fill="#ffedd5" />
    </g>
  </svg>
);

// 2. Lucky Spin: 3D Multi-color Wheel of Fortune
export const LuckySpin3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="ls-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ls-rim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="45%" stopColor="#eab308" />
        <stop offset="80%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
      <filter id="ls-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ls-glow)" />

    <g filter="url(#ls-shadow)" transform="translate(40, 42)">
      {/* Outer 3D Wheel Base */}
      <circle cx="0" cy="0" r="28" fill="#78350f" />
      <circle cx="0" cy="-1.5" r="28" fill="url(#ls-rim)" />
      <circle cx="0" cy="-1.5" r="24.5" fill="#0f172a" />

      {/* Wheel Segments (8 slices) */}
      <g transform="translate(0, -1.5)">
        {/* Slice 1 - Red */}
        <path d="M0 0 L0 -23 A23 23 0 0 1 16.2 -16.2 Z" fill="#ef4444" />
        {/* Slice 2 - Cyan */}
        <path d="M0 0 L16.2 -16.2 A23 23 0 0 1 23 0 Z" fill="#06b6d4" />
        {/* Slice 3 - Amber */}
        <path d="M0 0 L23 0 A23 23 0 0 1 16.2 16.2 Z" fill="#f59e0b" />
        {/* Slice 4 - Purple */}
        <path d="M0 0 L16.2 16.2 A23 23 0 0 1 0 23 Z" fill="#8b5cf6" />
        {/* Slice 5 - Emerald */}
        <path d="M0 0 L0 23 A23 23 0 0 1 -16.2 16.2 Z" fill="#10b981" />
        {/* Slice 6 - Pink */}
        <path d="M0 0 L-16.2 16.2 A23 23 0 0 1 -23 0 Z" fill="#ec4899" />
        {/* Slice 7 - Blue */}
        <path d="M0 0 L-23 0 A23 23 0 0 1 -16.2 -16.2 Z" fill="#3b82f6" />
        {/* Slice 8 - Orange */}
        <path d="M0 0 L-16.2 -16.2 A23 23 0 0 1 0 -23 Z" fill="#f97316" />

        {/* Segment separator spokes */}
        <circle cx="0" cy="0" r="23" fill="none" stroke="#fef08a" strokeWidth="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 23}
            y2={Math.sin((angle * Math.PI) / 180) * 23}
            stroke="#fef08a"
            strokeWidth="0.9"
          />
        ))}

        {/* Outer bulbs / pegs */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 26}
            cy={Math.sin((angle * Math.PI) / 180) * 26}
            r="1.2"
            fill="#ffffff"
          />
        ))}

        {/* Center Hub */}
        <circle cx="0" cy="0" r="7" fill="#78350f" />
        <circle cx="0" cy="-0.5" r="6.5" fill="url(#ls-rim)" />
        <circle cx="0" cy="-1" r="4" fill="#ffffff" />
        <circle cx="0" cy="-1.5" r="2" fill="#eab308" />
      </g>

      {/* Top 3D Arrow Pointer */}
      <path d="M0 -30 L4 -23 L-4 -23 Z" fill="#991b1b" />
      <path d="M0 -31 L3.5 -24 L-3.5 -24 Z" fill="#ef4444" />
      <circle cx="0" cy="-24.5" r="1.5" fill="#fef08a" />
    </g>
  </svg>
);

// 3. Quiz: 3D Glossy Speech Bubble with Question Mark
export const Quiz3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="qz-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="qz-bubble" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="40%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="qz-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <filter id="qz-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#qz-glow)" />

    <g filter="url(#qz-shadow)">
      {/* Decorative mini question marks in background */}
      <text x="14" y="24" fontSize="11" fontWeight="bold" fill="#94a3b8" opacity="0.6">?</text>
      <text x="63" y="65" fontSize="10" fontWeight="bold" fill="#94a3b8" opacity="0.6">?</text>
      <text x="61" y="22" fontSize="9" fontWeight="bold" fill="#ec4899" opacity="0.8">?</text>

      {/* Main 3D Speech Bubble */}
      <path
        d="M20 18 C32 12, 48 12, 60 18 C69 23, 72 35, 68 46 C64 56, 52 62, 38 61 C32 61, 26 64, 18 69 C19 63, 19 59, 17 56 C9 48, 9 27, 20 18 Z"
        fill="#0f172a"
      />
      <path
        d="M20 16 C32 10, 48 10, 60 16 C69 21, 72 33, 68 44 C64 54, 52 60, 38 59 C32 59, 26 62, 18 67 C19 61, 19 57, 17 54 C9 46, 9 25, 20 16 Z"
        fill="url(#qz-bubble)"
      />
      {/* Specular highlight */}
      <path
        d="M22 19 C33 14, 47 14, 58 19 C64 22, 66 28, 64 34 C54 28, 36 28, 22 34 C19 28, 19 22, 22 19 Z"
        fill="url(#qz-highlight)"
      />

      {/* 3D Embossed Question Mark */}
      {/* Under shadow of ? */}
      <path
        d="M36 26 C36 21 44 21 44 26 C44 29 40 31 39 34 L39 37 L43 37 L43 35 C45 33 48 30 48 26 C48 18 32 18 32 26 L36 26 Z M39 40 L43 40 L43 44 L39 44 Z"
        fill="#0f172a"
        transform="translate(0, 1.5)"
      />
      {/* White gloss ? */}
      <path
        d="M36 26 C36 21 44 21 44 26 C44 29 40 31 39 34 L39 37 L43 37 L43 35 C45 33 48 30 48 26 C48 18 32 18 32 26 L36 26 Z M39 40 L43 40 L43 44 L39 44 Z"
        fill="#ffffff"
      />
      {/* Top inner gradient on ? */}
      <circle cx="42" cy="23" r="1.5" fill="#f8fafc" />
    </g>
  </svg>
);

// 4. Micro Job: 3D Tasks Checklist with Sliders and Gear
export const MicroJob3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="mj-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="mj-bar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="mj-gear" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <filter id="mj-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#mj-glow)" />

    <g filter="url(#mj-shadow)">
      {/* Row 1 - Checkbox & Slider */}
      <g transform="translate(14, 18)">
        {/* Checkbox */}
        <rect x="0" y="0" width="13" height="13" rx="3.5" fill="#0284c7" />
        <rect x="0" y="-1" width="13" height="13" rx="3.5" fill="#38bdf8" />
        <path d="M3.5 5.5 L5.5 8 L9.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Track */}
        <rect x="18" y="2" width="34" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="18" y="2" width="26" height="7" rx="3.5" fill="url(#mj-bar)" />
        {/* Slider knob */}
        <circle cx="44" cy="5.5" r="4.5" fill="#f8fafc" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
      </g>

      {/* Row 2 - Checkbox & Slider */}
      <g transform="translate(14, 34)">
        {/* Checkbox */}
        <rect x="0" y="0" width="13" height="13" rx="3.5" fill="#0284c7" />
        <rect x="0" y="-1" width="13" height="13" rx="3.5" fill="#38bdf8" />
        <path d="M3.5 5.5 L5.5 8 L9.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Track */}
        <rect x="18" y="2" width="34" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="18" y="2" width="18" height="7" rx="3.5" fill="url(#mj-bar)" />
        {/* Slider knob */}
        <circle cx="36" cy="5.5" r="4.5" fill="#f8fafc" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
      </g>

      {/* Row 3 - Checkbox & Gear */}
      <g transform="translate(14, 50)">
        {/* Checkbox */}
        <rect x="0" y="0" width="13" height="13" rx="3.5" fill="#0284c7" />
        <rect x="0" y="-1" width="13" height="13" rx="3.5" fill="#38bdf8" />
        <path d="M3.5 5.5 L5.5 8 L9.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Track */}
        <rect x="18" y="2" width="22" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="18" y="2" width="12" height="7" rx="3.5" fill="url(#mj-bar)" />
      </g>

      {/* 3D Gear Cog at bottom-right */}
      <g transform="translate(56, 55)">
        <circle cx="0" cy="0" r="10.5" fill="#1e293b" />
        <circle cx="0" cy="-0.8" r="10" fill="url(#mj-gear)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <rect
            key={i}
            x="-2"
            y="-12.5"
            width="4"
            height="3.5"
            rx="1"
            fill="url(#mj-gear)"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="-0.8" r="4" fill="#0f172a" />
        <circle cx="0" cy="-0.8" r="2.5" fill="#cbd5e1" />
      </g>
    </g>
  </svg>
);

// 5. Shop: 3D Isometric Storefront Booth
export const Shop3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="sh-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sh-awning-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="sh-awning-white" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="sh-roof" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0f766e" />
        <stop offset="100%" stopColor="#115e59" />
      </linearGradient>
      <filter id="sh-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#sh-glow)" />

    <g filter="url(#sh-shadow)">
      {/* 3D Base Platform */}
      <path d="M12 55 L40 68 L68 55 L40 43 Z" fill="#94a3b8" />
      <path d="M12 55 L40 68 L40 72 L12 59 Z" fill="#475569" />
      <path d="M40 68 L68 55 L68 59 L40 72 Z" fill="#334155" />

      {/* Building Body */}
      <path d="M22 47 L40 56 L58 47 L58 35 L40 26 L22 35 Z" fill="#e2e8f0" />
      <path d="M22 35 L40 44 L40 56 L22 47 Z" fill="#cbd5e1" />
      <path d="M40 44 L58 35 L58 47 L40 56 Z" fill="#94a3b8" />

      {/* Glass Store Window & Door */}
      <path d="M26 40 L36 45 L36 53 L26 48 Z" fill="#38bdf8" opacity="0.8" />
      <path d="M43 45 L54 40 L54 51 L43 56 Z" fill="#0284c7" opacity="0.7" />

      {/* Striped Canopy Awning */}
      <g transform="translate(0, -2)">
        {/* Awning structure */}
        <path d="M16 34 L40 22 L64 34 L40 44 Z" fill="url(#sh-roof)" />
        {/* Scalloped flaps with stripes */}
        <path d="M16 34 L22 37 L22 42 L16 39 Z" fill="url(#sh-awning-red)" />
        <path d="M22 37 L28 40 L28 45 L22 42 Z" fill="url(#sh-awning-white)" />
        <path d="M28 40 L34 42 L34 47 L28 45 Z" fill="url(#sh-awning-red)" />
        <path d="M34 42 L40 44 L40 49 L34 47 Z" fill="url(#sh-awning-white)" />
        <path d="M40 44 L46 42 L46 47 L40 49 Z" fill="url(#sh-awning-red)" />
        <path d="M46 42 L52 40 L52 45 L46 47 Z" fill="url(#sh-awning-white)" />
        <path d="M52 40 L58 37 L58 42 L52 45 Z" fill="url(#sh-awning-red)" />
        <path d="M58 37 L64 34 L64 39 L58 42 Z" fill="url(#sh-awning-white)" />
      </g>

      {/* Floating Shopping Cart / Goods Sign */}
      <circle cx="40" cy="18" r="7.5" fill="#0f766e" />
      <circle cx="40" cy="17.5" r="7" fill="#14b8a6" />
      <path d="M37 15 h1.5 l1.5 4 h3 l1 -3 h-5.5" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="20" r="0.8" fill="#ffffff" />
      <circle cx="43" cy="20" r="0.8" fill="#ffffff" />
    </g>
  </svg>
);

// 6. Mobile Recharge: 3D Smartphone with Rupee/Taka, Cards, and Radio Waves
export const MobileRecharge3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="mr-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="mr-phone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="mr-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#mr-glow)" />

    <g filter="url(#mr-shadow)">
      {/* Background Banknotes on the left */}
      <rect x="14" y="24" width="22" height="13" rx="2" fill="#15803d" transform="rotate(-15 14 24)" />
      <rect x="14" y="23" width="22" height="13" rx="2" fill="#22c55e" transform="rotate(-15 14 23)" />
      <circle cx="25" cy="29" r="3" fill="#86efac" />

      {/* Credit / SIM Cards */}
      <rect x="13" y="44" width="22" height="14" rx="2.5" fill="#475569" />
      <rect x="13" y="43" width="22" height="14" rx="2.5" fill="#64748b" />
      <rect x="15" y="46" width="6" height="4" rx="1" fill="#facc15" />

      {/* Main 3D Smartphone */}
      <g transform="translate(32, 16)">
        {/* Phone body shadow & depth */}
        <rect x="0" y="2" width="26" height="46" rx="5" fill="#020617" />
        <rect x="0" y="0" width="26" height="46" rx="5" fill="url(#mr-phone)" />
        {/* Screen */}
        <rect x="2" y="3" width="22" height="40" rx="3.5" fill="#1e293b" />
        <rect x="2" y="3" width="22" height="40" rx="3.5" fill="#0f172a" />
        {/* Speaker ear piece */}
        <rect x="10" y="4.5" width="6" height="1" rx="0.5" fill="#64748b" />

        {/* Currency Coin on Phone Screen */}
        <circle cx="13" cy="21" r="8" fill="#1e40af" />
        <circle cx="13" cy="20.5" r="7.5" fill="#3b82f6" />
        <circle cx="13" cy="20" r="6" fill="#60a5fa" />
        {/* Currency Symbol ৳ / ₹ */}
        <text x="13" y="23.5" fontSize="8" fontWeight="black" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">৳</text>

        {/* Success check bar at bottom */}
        <rect x="5" y="32" width="16" height="4" rx="2" fill="#22c55e" />
        <circle cx="13" cy="40.5" r="1.5" fill="#64748b" />
      </g>

      {/* Wireless Signal Waves on the right */}
      <path d="M62 25 A12 12 0 0 1 62 41" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M66 21 A18 18 0 0 1 66 45" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 17 A24 24 0 0 1 70 49" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 7. Ads View: 3D Monitor playing video with flying cash
export const AdsView3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="av-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="av-screen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="60%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="av-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#av-glow)" />

    <g filter="url(#av-shadow)">
      {/* Floating Cash Bills in background */}
      <g transform="translate(10, 18) rotate(-20)">
        <rect x="0" y="0" width="18" height="10" rx="1.5" fill="#15803d" />
        <rect x="0" y="-1" width="18" height="10" rx="1.5" fill="#22c55e" />
        <circle cx="9" cy="4" r="2.2" fill="#86efac" />
      </g>
      <g transform="translate(54, 16) rotate(25)">
        <rect x="0" y="0" width="18" height="10" rx="1.5" fill="#15803d" />
        <rect x="0" y="-1" width="18" height="10" rx="1.5" fill="#22c55e" />
        <circle cx="9" cy="4" r="2.2" fill="#86efac" />
      </g>
      <g transform="translate(12, 50) rotate(15)">
        <rect x="0" y="0" width="16" height="9" rx="1.5" fill="#15803d" />
        <rect x="0" y="-1" width="16" height="9" rx="1.5" fill="#22c55e" />
      </g>

      {/* Monitor Stand */}
      <path d="M34 54 L46 54 L44 63 L36 63 Z" fill="#334155" />
      <ellipse cx="40" cy="63.5" rx="14" ry="4" fill="#1e293b" />
      <ellipse cx="40" cy="62.5" rx="13" ry="3.5" fill="#475569" />

      {/* Monitor Screen Frame */}
      <g transform="translate(17, 19)">
        <rect x="0" y="2" width="46" height="34" rx="4" fill="#020617" />
        <rect x="0" y="0" width="46" height="34" rx="4" fill="#334155" />
        {/* Inner display */}
        <rect x="2" y="2" width="42" height="30" rx="2.5" fill="url(#av-screen)" />

        {/* 3D Big Red Glossy Play Button */}
        <circle cx="21" cy="17" r="10" fill="#991b1b" />
        <circle cx="21" cy="16" r="9.5" fill="#ef4444" />
        <path d="M18 11.5 L27 16 L18 20.5 Z" fill="#ffffff" />

        {/* Bottom player controls bar */}
        <rect x="4" y="28" width="38" height="2" rx="1" fill="#475569" />
        <rect x="4" y="28" width="22" height="2" rx="1" fill="#ef4444" />
      </g>
    </g>
  </svg>
);

// 8. Drive Offer: 3D Satellite Antenna with Transmission Waves
export const DriveOffer3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="do-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="do-metal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <filter id="do-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#do-glow)" />

    <g filter="url(#do-shadow)">
      {/* 3D Mounting Stand */}
      <path d="M28 66 L52 66 L44 54 L36 54 Z" fill="#1e293b" />
      <ellipse cx="40" cy="65.5" rx="13" ry="3.5" fill="#475569" />
      <line x1="40" y1="54" x2="35" y2="44" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="35" cy="44" r="3" fill="#334155" />

      {/* Angled Parabolic Dish */}
      <g transform="translate(36, 38) rotate(-35)">
        {/* Dish back rim shadow */}
        <ellipse cx="0" cy="0" rx="18" ry="12" fill="#1e293b" />
        {/* Dish front concave face */}
        <ellipse cx="1" cy="-1" rx="17" ry="11" fill="url(#do-metal)" />
        <ellipse cx="2" cy="-1.5" rx="13" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Feedhorn support struts */}
        <line x1="0" y1="0" x2="0" y2="-17" stroke="#475569" strokeWidth="2" />
        <circle cx="0" cy="-18" r="3.5" fill="#0284c7" />
        <circle cx="0" cy="-18.5" r="2.5" fill="#38bdf8" />
      </g>

      {/* Concentric Transmission Wave Beams */}
      <path d="M48 24 A12 12 0 0 1 58 34" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M53 19 A19 19 0 0 1 65 31" stroke="#0ea5e9" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M58 14 A26 26 0 0 1 72 28" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// 9. Network Marketing: 3D Connected People Network Hierarchy
export const NetworkMarketing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="nm-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
      </radialGradient>
      <filter id="nm-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#nm-glow)" />

    <g filter="url(#nm-shadow)">
      {/* Network Connection Lines */}
      <g stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round">
        <line x1="40" y1="23" x2="20" y2="40" />
        <line x1="40" y1="23" x2="60" y2="40" />
        <line x1="20" y1="40" x2="16" y2="60" />
        <line x1="20" y1="40" x2="33" y2="60" />
        <line x1="60" y1="40" x2="47" y2="60" />
        <line x1="60" y1="40" x2="64" y2="60" />
        <line x1="40" y1="23" x2="40" y2="46" />
      </g>

      {/* Top Leader Node (Main Large) */}
      <g transform="translate(40, 23)">
        <circle cx="0" cy="0" r="10" fill="#4338ca" />
        <circle cx="0" cy="-0.8" r="9.2" fill="#6366f1" />
        {/* Head */}
        <circle cx="0" cy="-3.5" r="3.2" fill="#ffedd5" />
        {/* Suit shoulders */}
        <path d="M-6 5.5 C-6 1 -3 0 0 0 C3 0 6 1 6 5.5 Z" fill="#1e1b4b" />
        <polygon points="0,0 -1.5,4 1.5,4" fill="#ef4444" />
      </g>

      {/* Level 2 Nodes (Left & Right) */}
      <g transform="translate(20, 40)">
        <circle cx="0" cy="0" r="7.5" fill="#1d4ed8" />
        <circle cx="0" cy="-0.6" r="7" fill="#3b82f6" />
        <circle cx="0" cy="-2.5" r="2.3" fill="#ffedd5" />
        <path d="M-4.5 4 C-4.5 1 -2 0 0 0 C2 0 4.5 1 4.5 4 Z" fill="#1e3a8a" />
      </g>

      <g transform="translate(60, 40)">
        <circle cx="0" cy="0" r="7.5" fill="#1d4ed8" />
        <circle cx="0" cy="-0.6" r="7" fill="#3b82f6" />
        <circle cx="0" cy="-2.5" r="2.3" fill="#ffedd5" />
        <path d="M-4.5 4 C-4.5 1 -2 0 0 0 C2 0 4.5 1 4.5 4 Z" fill="#1e3a8a" />
      </g>

      {/* Center Sub Node */}
      <g transform="translate(40, 46)">
        <circle cx="0" cy="0" r="7.5" fill="#047857" />
        <circle cx="0" cy="-0.6" r="7" fill="#10b981" />
        <circle cx="0" cy="-2.5" r="2.3" fill="#ffedd5" />
        <path d="M-4.5 4 C-4.5 1 -2 0 0 0 C2 0 4.5 1 4.5 4 Z" fill="#064e3b" />
      </g>

      {/* Level 3 Bottom Nodes */}
      {[16, 33, 47, 64].map((x, i) => (
        <g key={i} transform={`translate(${x}, 60)`}>
          <circle cx="0" cy="0" r="6" fill="#475569" />
          <circle cx="0" cy="-0.5" r="5.5" fill="#64748b" />
          <circle cx="0" cy="-2" r="1.8" fill="#ffedd5" />
          <path d="M-3.5 3.5 C-3.5 1 -1.5 0 0 0 C1.5 0 3.5 1 3.5 3.5 Z" fill="#334155" />
        </g>
      ))}
    </g>
  </svg>
);

// 10. Data Entry: 3D Cloud Server with Data Circuit Lines
export const DataEntry3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="de-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="de-cyl" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="de-sheet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e0f2fe" />
      </linearGradient>
      <filter id="de-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0c4a6e" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#de-glow)" />

    <g filter="url(#de-shadow)">
      {/* 3D Stacked Database Disc (Left-Bottom) */}
      <g transform="translate(12, 28)">
        <path d="M0 6 C0 10.5 11 14 24 14 C37 14 48 10.5 48 6 L48 14 C48 18.5 37 22 24 22 C11 22 0 18.5 0 14 Z" fill="#0c4a6e" />
        <ellipse cx="24" cy="6" rx="24" ry="7" fill="url(#de-cyl)" stroke="#bae6fd" strokeWidth="1" />
        <circle cx="10" cy="9.5" r="1.5" fill="#ffffff" />
        <circle cx="16" cy="10.5" r="1.5" fill="#38bdf8" />
      </g>

      {/* Floating 3D Spreadsheet Window (Right-Top) */}
      <g transform="translate(24, 12)">
        <rect x="0" y="2" width="44" height="34" rx="5" fill="#082f49" opacity="0.3" />
        <rect x="0" y="0" width="44" height="34" rx="5" fill="url(#de-sheet)" stroke="#0284c7" strokeWidth="1.2" />

        {/* Title bar */}
        <rect x="0" y="0" width="44" height="8" rx="5" fill="#0284c7" />
        <circle cx="5" cy="4" r="1.2" fill="#ffffff" />
        <circle cx="9" cy="4" r="1.2" fill="#ffffff" />
        <rect x="15" y="2.5" width="20" height="3" rx="1.5" fill="#bae6fd" />

        {/* Spreadsheet Data Grid */}
        <rect x="4" y="11" width="10" height="4.5" rx="1" fill="#bae6fd" />
        <rect x="16" y="11" width="11" height="4.5" rx="1" fill="#f1f5f9" />
        <rect x="29" y="11" width="11" height="4.5" rx="1" fill="#10b981" />

        <rect x="4" y="18" width="10" height="4.5" rx="1" fill="#bae6fd" />
        <rect x="16" y="18" width="11" height="4.5" rx="1" fill="#38bdf8" opacity="0.8" />
        <rect x="29" y="18" width="11" height="4.5" rx="1" fill="#f1f5f9" />

        <rect x="4" y="25" width="10" height="4.5" rx="1" fill="#bae6fd" />
        <rect x="16" y="25" width="11" height="4.5" rx="1" fill="#f1f5f9" />
        <rect x="29" y="25" width="11" height="4.5" rx="1" fill="#f59e0b" />
      </g>

      {/* 3D Cyan Stylus Pen */}
      <g transform="translate(54, 38) rotate(-35)">
        <rect x="-2.5" y="-18" width="5" height="20" rx="1.5" fill="#0284c7" stroke="#bae6fd" strokeWidth="0.8" />
        <polygon points="-2.5,2 2.5,2 0,7" fill="#cbd5e1" />
        <circle cx="0" cy="7" r="0.8" fill="#0284c7" />
      </g>
    </g>
  </svg>
);

// 11. Social Tasks: 3D Analytics Dashboard Window with Charts
export const SocialTasks3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="st-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="st-window" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <filter id="st-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#st-glow)" />

    <g filter="url(#st-shadow)">
      {/* 3D Browser Window Frame */}
      <rect x="15" y="19" width="50" height="42" rx="4.5" fill="#0f172a" />
      <rect x="15" y="17" width="50" height="42" rx="4.5" fill="url(#st-window)" />

      {/* Title Bar with 3 Dots */}
      <rect x="15" y="17" width="50" height="8" rx="4" fill="#1e293b" />
      <circle cx="19.5" cy="21" r="1.5" fill="#ef4444" />
      <circle cx="24.5" cy="21" r="1.5" fill="#f59e0b" />
      <circle cx="29.5" cy="21" r="1.5" fill="#10b981" />

      {/* Screen White Canvas */}
      <rect x="17" y="27" width="46" height="30" rx="2" fill="#f8fafc" />

      {/* Left Menu Sidebar */}
      <rect x="18" y="28" width="10" height="28" fill="#e2e8f0" />
      <rect x="20" y="31" width="6" height="2" rx="1" fill="#94a3b8" />
      <rect x="20" y="35" width="6" height="2" rx="1" fill="#94a3b8" />
      <rect x="20" y="39" width="6" height="2" rx="1" fill="#94a3b8" />

      {/* Center 3D Pie Chart */}
      <g transform="translate(37, 36)">
        <path d="M0 0 L0 -6 A6 6 0 0 1 5.5 2.5 Z" fill="#ef4444" />
        <path d="M0 0 L5.5 2.5 A6 6 0 0 1 -3.5 5 Z" fill="#3b82f6" />
        <path d="M0 0 L-3.5 5 A6 6 0 0 1 0 -6 Z" fill="#10b981" />
      </g>

      {/* Right Trend Line */}
      <path d="M46 36 L50 33 L54 35 L59 31" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Bottom Bar Chart Columns */}
      <rect x="31" y="47" width="4.5" height="8" rx="1" fill="#3b82f6" />
      <rect x="38" y="44" width="4.5" height="11" rx="1" fill="#10b981" />
      <rect x="45" y="49" width="4.5" height="6" rx="1" fill="#f59e0b" />
      <rect x="52" y="43" width="4.5" height="12" rx="1" fill="#ec4899" />
    </g>
  </svg>
);

// 12. Content Writing: 3D Paper Scroll with Fountain Pen and Glowing Bulb
export const ContentWriting3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="cw-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#eab308" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cw-scroll" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#fde047" />
      </linearGradient>
      <filter id="cw-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#cw-glow)" />

    <g filter="url(#cw-shadow)">
      {/* 3D Rolled Parchment Scroll */}
      <g transform="translate(18, 18)">
        {/* Under shadow */}
        <path d="M4 8 C4 3 28 3 32 8 L32 46 C28 50 4 50 4 46 Z" fill="#ca8a04" opacity="0.4" />
        {/* Main Sheet */}
        <path d="M4 6 C4 2 30 2 34 6 L34 44 C30 48 4 48 4 44 Z" fill="url(#cw-scroll)" stroke="#facc15" strokeWidth="0.8" />
        {/* Top roll edge */}
        <ellipse cx="19" cy="5.5" rx="14" ry="2.5" fill="#fef9c3" />
        {/* Bottom curl */}
        <ellipse cx="19" cy="44.5" rx="14" ry="2.5" fill="#eab308" />

        {/* Written text lines */}
        <line x1="10" y1="14" x2="26" y2="14" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="19" x2="28" y2="19" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="24" x2="24" y2="24" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="29" x2="27" y2="29" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="34" x2="20" y2="34" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Glowing Idea Bulb (Top Right) */}
      <g transform="translate(56, 25)">
        <circle cx="0" cy="0" r="8" fill="#facc15" opacity="0.4" />
        <circle cx="0" cy="0" r="6" fill="#fef08a" />
        <path d="M-3 4 L3 4 L2 8 L-2 8 Z" fill="#94a3b8" />
        {/* Filament */}
        <path d="M-1.5 0 L0 -2 L1.5 0" stroke="#ca8a04" strokeWidth="1" fill="none" />
      </g>

      {/* Classic Inkwell & Pen (Left Foreground) */}
      <g transform="translate(18, 56)">
        {/* Ink pot */}
        <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="#0f172a" />
        <path d="M-6 0 v4 c0 2 2.7 3.5 6 3.5 s6 -1.5 6 -3.5 v-4 Z" fill="#334155" />
        <ellipse cx="0" cy="-0.5" rx="4" ry="2" fill="#0284c7" />

        {/* Fountain / Quill Pen angled */}
        <g transform="rotate(35 0 0)">
          <path d="M-2 -28 L2 -28 L1.5 -6 L-1.5 -6 Z" fill="#1e293b" />
          <path d="M-1.5 -6 L0 0 L1.5 -6 Z" fill="#facc15" />
          <line x1="0" y1="-4" x2="0" y2="0" stroke="#713f12" strokeWidth="0.6" />
        </g>
      </g>
    </g>
  </svg>
);

// 13. Affiliate Marketing: 3D Cash Stacks with Rising Growth Arrow
export const AffiliateMarketing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="am-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="am-arrow" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#6ee7b7" />
      </linearGradient>
      <filter id="am-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#am-glow)" />

    <g filter="url(#am-shadow)">
      {/* Stack of Money Banknotes (Isometric) */}
      {/* Left Stack */}
      <g transform="translate(16, 42)">
        <path d="M0 8 L16 16 L32 8 L16 0 Z" fill="#15803d" />
        <path d="M0 8 v8 l16 8 v-8 Z" fill="#166534" />
        <path d="M16 16 v8 l16 -8 v-8 Z" fill="#14532d" />

        <path d="M0 2 L16 10 L32 2 L16 -6 Z" fill="#22c55e" />
        <path d="M0 2 v6 l16 8 v-6 Z" fill="#15803d" />
        <path d="M16 10 v6 l16 -8 v-6 Z" fill="#166534" />

        <ellipse cx="16" cy="2" rx="4" ry="2" fill="#86efac" />
      </g>

      {/* Right Higher Stack */}
      <g transform="translate(36, 36)">
        <path d="M0 12 L16 20 L32 12 L16 4 Z" fill="#15803d" />
        <path d="M0 12 v12 l16 8 v-12 Z" fill="#166534" />
        <path d="M16 20 v12 l16 -8 v-12 Z" fill="#14532d" />

        <path d="M0 4 L16 12 L32 4 L16 -4 Z" fill="#22c55e" />
        <path d="M0 4 v8 l16 8 v-8 Z" fill="#15803d" />
        <path d="M16 12 v8 l16 -8 v-8 Z" fill="#166534" />

        <ellipse cx="16" cy="4" rx="4" ry="2" fill="#86efac" />
      </g>

      {/* Floating Percent (%) Badges */}
      <g transform="translate(20, 24)">
        <circle cx="0" cy="0" r="5" fill="#f97316" />
        <circle cx="0" cy="-0.5" r="4.5" fill="#fb923c" />
        <text x="0" y="2.5" fontSize="6" fontWeight="bold" fill="#ffffff" textAnchor="middle">%</text>
      </g>

      <g transform="translate(60, 20)">
        <circle cx="0" cy="0" r="6" fill="#f97316" />
        <circle cx="0" cy="-0.5" r="5.5" fill="#fb923c" />
        <text x="0" y="3" fontSize="7" fontWeight="bold" fill="#ffffff" textAnchor="middle">%</text>
      </g>

      {/* Big 3D Growth Arrow pointing top-right */}
      <g transform="translate(30, 16)">
        <path
          d="M0 32 L8 36 L24 16 L28 20 L32 6 L18 8 L22 12 Z"
          fill="#065f46"
        />
        <path
          d="M0 30 L8 34 L24 14 L28 18 L32 4 L18 6 L22 10 Z"
          fill="url(#am-arrow)"
        />
      </g>
    </g>
  </svg>
);

// 14. Online Survey: 3D Tablet with User Form and Star Ratings
export const OnlineSurvey3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="os-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="os-tablet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="60%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <filter id="os-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#os-glow)" />

    <g filter="url(#os-shadow)">
      {/* 3D Modern Tablet Frame */}
      <g transform="translate(20, 14)">
        <rect x="0" y="2" width="40" height="52" rx="5" fill="#0f172a" />
        <rect x="0" y="0" width="40" height="52" rx="5" fill="url(#os-tablet)" />
        {/* Front Screen */}
        <rect x="2.5" y="3" width="35" height="46" rx="3" fill="#1e293b" />
        <rect x="2.5" y="3" width="35" height="46" rx="3" fill="#0f172a" />

        {/* User Profile ID Card Header */}
        <g transform="translate(6, 7)">
          <rect x="0" y="0" width="28" height="15" rx="2.5" fill="#1e293b" />
          {/* Avatar Icon */}
          <circle cx="7" cy="7.5" r="4.5" fill="#3b82f6" />
          <circle cx="7" cy="6" r="2" fill="#ffffff" />
          <path d="M4 11 c0 -2 1.5 -3 3 -3 s3 1 3 3 Z" fill="#ffffff" />
          {/* Info Lines */}
          <rect x="14" y="5" width="10" height="2" rx="1" fill="#94a3b8" />
          <rect x="14" y="9" width="7" height="2" rx="1" fill="#64748b" />
        </g>

        {/* Horizontal Form Sliders */}
        <rect x="6" y="26" width="28" height="2.5" rx="1.2" fill="#334155" />
        <rect x="6" y="26" width="16" height="2.5" rx="1.2" fill="#38bdf8" />
        <circle cx="22" cy="27.2" r="2.2" fill="#ffffff" />

        <rect x="6" y="32" width="28" height="2.5" rx="1.2" fill="#334155" />
        <rect x="6" y="32" width="22" height="2.5" rx="1.2" fill="#10b981" />
        <circle cx="28" cy="33.2" r="2.2" fill="#ffffff" />

        {/* 3 Golden Stars Rating Bar */}
        <g transform="translate(6, 38)">
          <rect x="0" y="0" width="28" height="8" rx="2.5" fill="#334155" />
          {[7, 14, 21].map((x, i) => (
            <polygon
              key={i}
              points={`${x},1.5 ${x + 1.2},3.8 ${x + 3.5},4.2 ${x + 1.8},5.8 ${x + 2.2},8 ${x},6.8 ${x - 2.2},8 ${x - 1.8},5.8 ${x - 3.5},4.2 ${x - 1.2},3.8`}
              fill="#facc15"
            />
          ))}
        </g>
      </g>
    </g>
  </svg>
);

// 15. Job Post: 3D Handshake over "JOB" Document Agreement
export const JobPost3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="jp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="jp-paper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <filter id="jp-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#jp-glow)" />

    <g filter="url(#jp-shadow)">
      {/* Background "JOB" Contract Document */}
      <g transform="translate(24, 12)">
        <rect x="0" y="2" width="32" height="42" rx="3.5" fill="#94a3b8" />
        <rect x="0" y="0" width="32" height="42" rx="3.5" fill="url(#jp-paper)" />
        {/* "JOB" text banner */}
        <rect x="6" y="5" width="20" height="7" rx="1.5" fill="#f1f5f9" />
        <text x="16" y="10.5" fontSize="6.5" fontWeight="black" fill="#0f172a" textAnchor="middle" letterSpacing="0.8">
          JOB
        </text>
        {/* Agreement lines */}
        <line x1="6" y1="17" x2="26" y2="17" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="22" x2="24" y2="22" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="27" x2="20" y2="27" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 3D Foreground Handshake */}
      <g transform="translate(12, 42)">
        {/* Left Hand Sleeve & Cuff */}
        <path d="M0 16 L12 8 L14 18 L2 26 Z" fill="#1e293b" />
        <path d="M10 9 L13 7 L15 17 L12 19 Z" fill="#ffffff" />
        {/* Left Hand / Palm */}
        <path d="M14 12 C18 10 24 12 28 15 C30 16 32 18 34 20 L26 26 C22 24 17 20 14 17 Z" fill="#fbcfe8" />
        <path d="M14 12 C18 10 24 12 28 15 C30 16 32 18 34 20 L26 26 C22 24 17 20 14 17 Z" fill="#fed7aa" />

        {/* Right Hand Sleeve & Cuff */}
        <path d="M56 16 L44 8 L42 18 L54 26 Z" fill="#334155" />
        <path d="M46 9 L43 7 L41 17 L44 19 Z" fill="#ffffff" />
        {/* Right Hand / Palm */}
        <path d="M42 12 C38 10 32 12 28 15 C26 16 24 18 22 20 L30 26 C34 24 39 20 42 17 Z" fill="#fcd34d" />
        <path d="M42 12 C38 10 32 12 28 15 C26 16 24 18 22 20 L30 26 C34 24 39 20 42 17 Z" fill="#fed7aa" />

        {/* Clasping fingers */}
        <path d="M25 15 C27 13 30 15 31 18 C30 21 27 22 25 19 Z" fill="#fdba74" />
        <path d="M28 17 C30 15 33 17 34 20 C33 23 30 24 28 21 Z" fill="#fdba74" />
      </g>
    </g>
  </svg>
);

// 16. Social Marketing: 3D Megaphone with Sound Waves and Floating Social Badges
export const SocialMarketing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="sm-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sm-cone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#9f1239" />
      </linearGradient>
      <filter id="sm-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#sm-glow)" />

    <g filter="url(#sm-shadow)">
      {/* Floating social bubbles */}
      {/* Heart bubble */}
      <g transform="translate(56, 16)">
        <circle cx="0" cy="0" r="6" fill="#f43f5e" />
        <path d="M0 2.2 c-0.2 0 -2.2 -1.6 -2.2 -2.7 0 -0.6 0.5 -1.1 1.1 -1.1 0.4 0 0.8 0.2 1.1 0.6 0.3 -0.4 0.7 -0.6 1.1 -0.6 0.6 0 1.1 0.5 1.1 1.1 0 1.1 -2 2.7 -2.2 2.7 Z" fill="#ffffff" />
      </g>
      {/* Thumbs up / star bubble */}
      <g transform="translate(62, 34)">
        <circle cx="0" cy="0" r="5" fill="#3b82f6" />
        <path d="M-1 -1.5 l2 0 l0.5 3 l-2.5 0 Z" fill="#ffffff" />
        <circle cx="0.5" cy="-2" r="0.8" fill="#ffffff" />
      </g>

      {/* 3D Megaphone Body */}
      <g transform="translate(18, 26) rotate(-18)">
        {/* Handle */}
        <path d="M12 24 L16 24 L14 36 L10 36 Z" fill="#334155" />
        <rect x="8" y="34" width="8" height="3" rx="1.5" fill="#475569" />

        {/* Back Housing Cylinder */}
        <ellipse cx="6" cy="18" rx="6" ry="9" fill="#0f172a" />
        <rect x="6" y="9" width="10" height="18" fill="#1e293b" />
        <ellipse cx="16" cy="18" rx="4" ry="9" fill="#334155" />

        {/* Horn Cone */}
        <path d="M16 11 L36 4 L38 32 L16 25 Z" fill="url(#sm-cone)" />
        {/* Front Opening Rim */}
        <ellipse cx="37" cy="18" rx="4" ry="14" fill="#9f1239" />
        <ellipse cx="36" cy="18" rx="3.2" ry="13.2" fill="#be123c" />
        <ellipse cx="35" cy="18" rx="2" ry="10" fill="#0f172a" />

        {/* White Accent Stripe */}
        <path d="M24 8.5 L27 7.5 L27 28.5 L24 27.5 Z" fill="#ffffff" opacity="0.8" />
      </g>

      {/* Sound waves emitting from megaphone */}
      <path d="M52 38 A10 10 0 0 1 52 50" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M57 33 A16 16 0 0 1 57 55" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M62 28 A22 22 0 0 1 62 60" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 17. Smart Earning: 3D Leather Wallet with Cash and Golden Coins
export const SmartEarning3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="se-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="se-wallet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="60%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
      <filter id="se-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#se-glow)" />

    <g filter="url(#se-shadow)">
      {/* Green Banknotes protruding from top of wallet */}
      <g transform="translate(24, 18) rotate(-6)">
        <rect x="0" y="0" width="32" height="18" rx="2" fill="#15803d" />
        <rect x="0" y="-1" width="32" height="18" rx="2" fill="#22c55e" />
        <circle cx="16" cy="8" r="4" fill="#86efac" />
        <text x="16" y="11" fontSize="6" fontWeight="black" fill="#15803d" textAnchor="middle">৳</text>
      </g>
      <g transform="translate(26, 21) rotate(6)">
        <rect x="0" y="0" width="32" height="16" rx="2" fill="#16a34a" />
        <rect x="0" y="-1" width="32" height="16" rx="2" fill="#4ade80" />
      </g>

      {/* Golden Coins popping out */}
      <g transform="translate(18, 22)">
        <circle cx="0" cy="0" r="6" fill="#ca8a04" />
        <circle cx="0" cy="-0.6" r="5.5" fill="#facc15" />
        <text x="0" y="2" fontSize="5.5" fontWeight="black" fill="#713f12" textAnchor="middle">৳</text>
      </g>
      <g transform="translate(58, 24)">
        <circle cx="0" cy="0" r="7" fill="#ca8a04" />
        <circle cx="0" cy="-0.6" r="6.5" fill="#facc15" />
        <circle cx="0" cy="-0.6" r="4.5" fill="none" stroke="#fef08a" strokeWidth="0.8" />
        <text x="0" y="2.5" fontSize="6" fontWeight="black" fill="#713f12" textAnchor="middle">৳</text>
      </g>

      {/* 3D Wallet Base */}
      <g transform="translate(16, 28)">
        {/* Wallet shadow & outer curve */}
        <rect x="0" y="3" width="48" height="34" rx="7" fill="#042f2e" />
        <rect x="0" y="0" width="48" height="34" rx="7" fill="url(#se-wallet)" />
        {/* Wallet stitch detail */}
        <rect x="2" y="2" width="44" height="30" rx="5" fill="none" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="2 1.5" />

        {/* Flap & Lock Clasp */}
        <path d="M28 10 h16 c2.2 0 4 1.8 4 4 v8 c0 2.2 -1.8 4 -4 4 h-16 Z" fill="#0f766e" />
        <path d="M28 10 h16 c2.2 0 4 1.8 4 4 v8 c0 2.2 -1.8 4 -4 4 h-16 Z" fill="#14b8a6" />
        {/* Golden Lock Button */}
        <circle cx="41" cy="18" r="4" fill="#a16207" />
        <circle cx="41" cy="17.5" r="3.5" fill="#facc15" />
        <circle cx="41" cy="17.5" r="1.5" fill="#713f12" />
      </g>
    </g>
  </svg>
);

// 18. Learning & Earning: 3D Graduation Cap on Books with Diploma Scroll
export const LearningEarning3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="le-ed-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="le-cap" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="60%" stopColor="#172554" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="le-ed-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#le-ed-glow)" />

    <g filter="url(#le-ed-shadow)">
      {/* Stacked Hardcover Books at bottom */}
      {/* Bottom Book (Red) */}
      <g transform="translate(18, 50)">
        <rect x="0" y="4" width="44" height="12" rx="3" fill="#881337" />
        <rect x="0" y="2" width="44" height="12" rx="3" fill="#be123c" />
        {/* Book pages */}
        <rect x="6" y="5" width="36" height="7" rx="1" fill="#fef08a" />
      </g>
      {/* Top Book (Teal) */}
      <g transform="translate(22, 42)">
        <rect x="0" y="3" width="38" height="11" rx="3" fill="#0f766e" />
        <rect x="0" y="1" width="38" height="11" rx="3" fill="#0d9488" />
        <rect x="5" y="4" width="31" height="6" rx="1" fill="#f8fafc" />
      </g>

      {/* 3D Graduation Cap (Mortarboard) */}
      <g transform="translate(14, 18)">
        {/* Cap skull undercap */}
        <path d="M18 16 C18 16 26 24 34 16 L34 22 C26 28 18 22 18 22 Z" fill="#090d16" />
        <path d="M18 15 C18 15 26 23 34 15 L34 20 C26 26 18 20 18 20 Z" fill="#1e293b" />

        {/* Diamond Mortarboard Top */}
        <polygon points="26,2 52,14 26,24 0,14" fill="#0f172a" />
        <polygon points="26,0 52,12 26,22 0,12" fill="url(#le-cap)" />
        {/* Specular highlight */}
        <polygon points="26,2 48,12 26,20 4,12" fill="#3b82f6" opacity="0.35" />

        {/* Center Golden Button & Tassel */}
        <circle cx="26" cy="12" r="2.5" fill="#facc15" />
        {/* Tassel cord */}
        <path d="M26 12 Q38 15 42 24" stroke="#eab308" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Tassel brush */}
        <polygon points="41,24 45,24 44,32 40,32" fill="#facc15" />
      </g>

      {/* Floating Gold Stars */}
      <polygon points="63,22 64.5,25 68,25.5 65.5,27.5 66.5,31 63,29 59.5,31 60.5,27.5 58,25.5 61.5,25" fill="#facc15" />
    </g>
  </svg>
);

// 19. Leadership: 3D Gleaming Golden Trophy Cup with Star Crest
export const Leadership3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="ls-tr-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ls-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <filter id="ls-tr-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ls-tr-glow)" />

    <g filter="url(#ls-tr-shadow)">
      {/* 3D Pedestal Base */}
      <rect x="25" y="60" width="30" height="9" rx="2.5" fill="#1e293b" />
      <rect x="25" y="58" width="30" height="9" rx="2.5" fill="#334155" />
      {/* Gold Base Plate */}
      <rect x="29" y="55" width="22" height="5" rx="1.5" fill="url(#ls-gold)" />

      {/* Trophy Stem */}
      <path d="M36 48 L44 48 L42 56 L38 56 Z" fill="#ca8a04" />
      <path d="M37 48 L43 48 L41 55 L39 55 Z" fill="url(#ls-gold)" />

      {/* Ornate Handles (Left & Right) */}
      <path d="M26 25 C14 25 14 42 27 42 C27 38 21 38 21 33 C21 29 25 29 27 29 Z" fill="#ca8a04" />
      <path d="M26 24 C14 24 14 41 27 41 C27 37 21 37 21 32 C21 28 25 28 27 28 Z" fill="url(#ls-gold)" />

      <path d="M54 25 C66 25 66 42 53 42 C53 38 59 38 59 33 C59 29 55 29 53 29 Z" fill="#ca8a04" />
      <path d="M54 24 C66 24 66 41 53 41 C53 37 59 37 59 32 C59 28 55 28 53 28 Z" fill="url(#ls-gold)" />

      {/* Main Trophy Cup Chalice */}
      <path d="M26 20 C26 36 32 48 40 48 C48 48 54 36 54 20 Z" fill="#a16207" />
      <path d="M26 18 C26 34 32 47 40 47 C48 47 54 34 54 18 Z" fill="url(#ls-gold)" />

      {/* Cup Rim */}
      <ellipse cx="40" cy="18" rx="14" ry="4.5" fill="#713f12" />
      <ellipse cx="40" cy="17" rx="13.5" ry="4" fill="url(#ls-gold)" />
      <ellipse cx="40" cy="16.5" rx="11" ry="3" fill="#ca8a04" />

      {/* Center Star Crest Badge */}
      <circle cx="40" cy="30" r="6" fill="#78350f" />
      <circle cx="40" cy="29.5" r="5.5" fill="#ffffff" />
      <polygon points="40,25 41.5,28.5 45,29 42.5,31 43.5,34.5 40,32.5 36.5,34.5 37.5,31 35,29 38.5,28.5" fill="#eab308" />

      {/* Specular sparkle */}
      <polygon points="32,22 33,25 36,25 33.5,27 34.5,30 32,28 29.5,30 30.5,27 28,25 31,25" fill="#ffffff" opacity="0.8" />
    </g>
  </svg>
);

// 20. Target Bonus: 3D Archery Target Bullseye with Arrow Hit
export const TargetBonus3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="tb-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </radialGradient>
      <filter id="tb-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#tb-glow)" />

    <g filter="url(#tb-shadow)">
      {/* 3D Angled Target Board */}
      <g transform="translate(38, 42)">
        {/* Outer Rim Depth */}
        <circle cx="0" cy="2" r="26" fill="#9f1239" />
        {/* Outer Red Ring */}
        <circle cx="0" cy="0" r="26" fill="#e11d48" />
        {/* White Ring */}
        <circle cx="0" cy="0" r="20" fill="#f8fafc" />
        {/* Second Red Ring */}
        <circle cx="0" cy="0" r="14" fill="#e11d48" />
        {/* Yellow / Gold Center Bullseye */}
        <circle cx="0" cy="0" r="8" fill="#eab308" />
        <circle cx="0" cy="0" r="4" fill="#facc15" />
      </g>

      {/* 3D Arrow Piercing Dead Center Bullseye */}
      <g transform="translate(38, 42)">
        {/* Shadow of arrow */}
        <line x1="0" y1="0" x2="-22" y2="-22" stroke="#0f172a" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
        {/* Arrow Shaft */}
        <line x1="0" y1="0" x2="-24" y2="-24" stroke="#ca8a04" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-24" y2="-24" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />

        {/* Arrow Head embedded in target */}
        <circle cx="0" cy="0" r="3" fill="#854d0e" />

        {/* Arrow Fletching Feathers (Top Left) */}
        <g transform="translate(-24, -24) rotate(45)">
          <polygon points="0,0 -4,6 0,8 4,6" fill="#ef4444" />
          <polygon points="0,-4 -5,2 0,4 5,2" fill="#3b82f6" />
        </g>
      </g>

      {/* Floating Bonus Coins */}
      <g transform="translate(60, 20)">
        <circle cx="0" cy="0" r="6" fill="#ca8a04" />
        <circle cx="0" cy="-0.6" r="5.5" fill="#facc15" />
        <text x="0" y="2" fontSize="5" fontWeight="bold" fill="#713f12" textAnchor="middle">+৳</text>
      </g>
      <g transform="translate(62, 58)">
        <circle cx="0" cy="0" r="5" fill="#ca8a04" />
        <circle cx="0" cy="-0.5" r="4.5" fill="#facc15" />
      </g>
    </g>
  </svg>
);

// 21. Monthly Salary: 3D Stacks of Bank Currency with Calendar Tile
export const MonthlySalary3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="ms-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <filter id="ms-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ms-glow)" />

    <g filter="url(#ms-shadow)">
      {/* 3D Banknote Stacks */}
      {/* Bottom Stack */}
      <g transform="translate(18, 44)">
        <path d="M0 10 L22 20 L44 10 L22 0 Z" fill="#15803d" />
        <path d="M0 10 v8 l22 10 v-8 Z" fill="#166534" />
        <path d="M22 20 v8 l22 -10 v-8 Z" fill="#14532d" />
        <path d="M0 4 L22 14 L44 4 L22 -6 Z" fill="#22c55e" />
        <ellipse cx="22" cy="4" rx="6" ry="3" fill="#86efac" />
        <text x="22" y="6.5" fontSize="5.5" fontWeight="black" fill="#15803d" textAnchor="middle">৳</text>
      </g>

      {/* Golden Coins beside the stack */}
      <g transform="translate(18, 36)">
        <ellipse cx="0" cy="0" rx="7" ry="4" fill="#a16207" />
        <ellipse cx="0" cy="-1" rx="7" ry="4" fill="#facc15" />
        <ellipse cx="0" cy="-1" rx="5" ry="2.5" fill="#fef08a" />
      </g>
      <g transform="translate(18, 30)">
        <ellipse cx="0" cy="0" rx="7" ry="4" fill="#a16207" />
        <ellipse cx="0" cy="-1" rx="7" ry="4" fill="#facc15" />
        <ellipse cx="0" cy="-1" rx="5" ry="2.5" fill="#fef08a" />
      </g>

      {/* Calendar Date Tile "01" (1st of month salary) */}
      <g transform="translate(42, 16)">
        <rect x="0" y="2" width="24" height="26" rx="4" fill="#0f172a" />
        <rect x="0" y="0" width="24" height="26" rx="4" fill="#ffffff" />
        {/* Red Header Bar */}
        <rect x="0" y="0" width="24" height="8" rx="3" fill="#ef4444" />
        {/* Binder rings */}
        <circle cx="6" cy="2" r="1.2" fill="#ffffff" />
        <circle cx="18" cy="2" r="1.2" fill="#ffffff" />
        {/* "01" Salary Day */}
        <text x="12" y="20.5" fontSize="11" fontWeight="black" fill="#0f172a" textAnchor="middle" fontFamily="sans-serif">
          01
        </text>
      </g>
    </g>
  </svg>
);

// 22. Quran Education: 3D Holy Quran Book on Carved Wooden Rehal with Golden Glow
export const QuranEducation3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="qe-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="qe-cover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#047857" />
        <stop offset="60%" stopColor="#065f46" />
        <stop offset="100%" stopColor="#022c22" />
      </linearGradient>
      <filter id="qe-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#qe-glow)" />

    <g filter="url(#qe-shadow)">
      {/* Wooden Rehal (Book Stand) Base */}
      <g transform="translate(18, 52)">
        {/* Left Wood Leg */}
        <path d="M4 14 L20 0 L24 2 L8 16 Z" fill="#78350f" />
        {/* Right Wood Leg */}
        <path d="M40 14 L24 0 L20 2 L36 16 Z" fill="#92400e" />
        {/* Center Pivot Notch */}
        <circle cx="22" cy="2" r="2.5" fill="#451a03" />
      </g>

      {/* Open Holy Quran Book */}
      {/* Left Page (Cream) */}
      <g transform="translate(40, 36)">
        {/* Green Cover Base (Left & Right) */}
        <path d="M0 6 C-14 4 -24 0 -26 -4 L-26 16 C-24 20 -14 24 0 26 Z" fill="url(#qe-cover)" />
        <path d="M0 6 C14 4 24 0 26 -4 L26 16 C24 20 14 24 0 26 Z" fill="url(#qe-cover)" />

        {/* Paper Leaves (Left Open Page) */}
        <path d="M-1 4 C-13 2 -22 -2 -24 -5 L-24 13 C-22 17 -13 21 -1 23 Z" fill="#fef9c3" />
        <path d="M-1 3 C-13 1 -22 -3 -24 -6 L-24 12 C-22 16 -13 20 -1 22 Z" fill="#ffffff" />
        {/* Ornate Gold Border on Left Page */}
        <path d="M-4 5 C-12 3 -19 0 -21 -3 L-21 9 C-19 13 -12 16 -4 18 Z" fill="none" stroke="#ca8a04" strokeWidth="0.8" />
        {/* Quranic Text Lines */}
        <line x1="-6" y1="8" x2="-18" y2="4" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />
        <line x1="-6" y1="11" x2="-18" y2="7" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />
        <line x1="-6" y1="14" x2="-18" y2="10" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />

        {/* Paper Leaves (Right Open Page) */}
        <path d="M1 4 C13 2 22 -2 24 -5 L24 13 C22 17 13 21 1 23 Z" fill="#fef9c3" />
        <path d="M1 3 C13 1 22 -3 24 -6 L24 12 C22 16 13 20 1 22 Z" fill="#ffffff" />
        {/* Ornate Gold Border on Right Page */}
        <path d="M4 5 C12 3 19 0 21 -3 L21 9 C19 13 12 16 4 18 Z" fill="none" stroke="#ca8a04" strokeWidth="0.8" />
        {/* Quranic Text Lines */}
        <line x1="6" y1="8" x2="18" y2="4" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />
        <line x1="6" y1="11" x2="18" y2="7" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />
        <line x1="6" y1="14" x2="18" y2="10" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />

        {/* Golden Ribbon Bookmark hanging from spine */}
        <path d="M0 6 L0 28 L3 25 L6 28 L6 6 Z" fill="#eab308" />
      </g>

      {/* Spiritual Golden Crescent Moon & Star at top */}
      <g transform="translate(40, 16)">
        <path d="M3 -6 A7 7 0 0 0 -4 4 A7 7 0 1 1 3 -6 Z" fill="#facc15" />
        <circle cx="2" cy="-1" r="1.5" fill="#fef08a" />
      </g>
    </g>
  </svg>
);

// 23. Football Game: 3D Soccer Ball with Golden Star Trails
export const FootballGame3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="fb-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="fb-ball" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="65%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </radialGradient>
      <filter id="fb-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#fb-glow)" />

    <g filter="url(#fb-shadow)">
      {/* Motion Speed Trails / Goal Net in background */}
      <path d="M14 26 Q24 20 38 24" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" fill="none" />
      <path d="M12 40 Q22 36 36 40" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
      <path d="M16 54 Q26 50 40 52" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" fill="none" />

      {/* 3D Soccer Ball */}
      <g transform="translate(42, 40)">
        {/* Ball Sphere base */}
        <circle cx="0" cy="0" r="22" fill="url(#fb-ball)" />

        {/* Center Black Pentagon */}
        <polygon points="0,-7 6,-3 4,4 -4,4 -6,-3" fill="#0f172a" />

        {/* Connecting seam lines and surrounding black patches */}
        {/* Top patch */}
        <polygon points="0,-16 4,-20 -4,-20" fill="#0f172a" />
        <line x1="0" y1="-7" x2="0" y2="-16" stroke="#0f172a" strokeWidth="1.4" />

        {/* Top-Right patch */}
        <polygon points="16,-8 21,-5 19,-1" fill="#0f172a" />
        <line x1="6" y1="-3" x2="16" y2="-8" stroke="#0f172a" strokeWidth="1.4" />

        {/* Bottom-Right patch */}
        <polygon points="13,13 18,17 11,20" fill="#0f172a" />
        <line x1="4" y1="4" x2="13" y2="13" stroke="#0f172a" strokeWidth="1.4" />

        {/* Bottom-Left patch */}
        <polygon points="-13,13 -18,17 -11,20" fill="#0f172a" />
        <line x1="-4" y1="4" x2="-13" y2="13" stroke="#0f172a" strokeWidth="1.4" />

        {/* Top-Left patch */}
        <polygon points="-16,-8 -21,-5 -19,-1" fill="#0f172a" />
        <line x1="-6" y1="-3" x2="-16" y2="-8" stroke="#0f172a" strokeWidth="1.4" />

        {/* Specular curved highlight on top-left of ball */}
        <ellipse cx="-7" cy="-7" rx="7" ry="4" fill="#ffffff" opacity="0.6" transform="rotate(-30 -7 -7)" />
      </g>

      {/* Floating Golden Stars */}
      <polygon points="66,18 67.5,21 71,21.5 68.5,23.5 69.5,27 66,25 62.5,27 63.5,23.5 61,21.5 64.5,21" fill="#facc15" />
    </g>
  </svg>
);

// Map of project IDs to 3D Icon components
export const PROJECT_3D_ICONS: Record<string, React.FC<IconProps>> = {
  'dw-like-earning': LikeEarning3D,
  'dw-lucky-spin': LuckySpin3D,
  'dw-quiz': Quiz3D,
  'dw-micro-job': MicroJob3D,
  'dw-shop': Shop3D,
  'dw-mobile-recharge': MobileRecharge3D,
  'dw-ads-view': AdsView3D,
  'dw-drive-offer': DriveOffer3D,
  'dw-network-marketing': NetworkMarketing3D,
  'dw-data-entry': DataEntry3D,
  'dw-social-tasks': SocialTasks3D,
  'dw-content-writing': ContentWriting3D,
  'dw-affiliate-marketing': AffiliateMarketing3D,
  'dw-online-survey': OnlineSurvey3D,
  'dw-job-post': JobPost3D,
  'dw-social-marketing': SocialMarketing3D,
  'dw-smart-earning': SmartEarning3D,
  'dw-learning-earning': LearningEarning3D,
  'dw-leadership': Leadership3D,
  'dw-target-bonus': TargetBonus3D,
  'dw-monthly-salary': MonthlySalary3D,
  'dw-quran-education': QuranEducation3D,
  'dw-football-game': FootballGame3D,
};
