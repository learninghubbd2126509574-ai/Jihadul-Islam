import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Professional Typing Job: 3D Mechanical Keyboard + Floating Document & Glowing Inspiration Bulb
export const TypingJob3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="tj3-base" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="tj3-key-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#bae6fd" />
      </linearGradient>
      <linearGradient id="tj3-key-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="tj3-key-purple" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
      <linearGradient id="tj3-bulb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <radialGradient id="tj3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
      </radialGradient>
      <filter id="tj3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0c4a6e" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#tj3-glow)" />

    <g filter="url(#tj3-shadow)">
      {/* Background Floating Document */}
      <g transform="translate(18, 12)">
        <rect x="0" y="2" width="30" height="38" rx="4" fill="#0369a1" opacity="0.3" />
        <rect x="0" y="0" width="30" height="38" rx="4" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
        <rect x="5" y="6" width="14" height="3.5" rx="1.5" fill="#0284c7" />
        <rect x="5" y="13" width="20" height="2" rx="1" fill="#94a3b8" />
        <rect x="5" y="18" width="17" height="2" rx="1" fill="#cbd5e1" />
        <rect x="5" y="23" width="19" height="2" rx="1" fill="#94a3b8" />
        <rect x="5" y="28" width="12" height="2" rx="1" fill="#cbd5e1" />
      </g>

      {/* 3D Glowing Idea Bulb (Top Right) */}
      <g transform="translate(52, 14)">
        <circle cx="0" cy="0" r="8" fill="#facc15" opacity="0.25" />
        <path d="M-5 -2 C-5 -6 5 -6 5 -2 C5 1 2 3 2 6 L-2 6 C-2 3 -5 1 -5 -2 Z" fill="url(#tj3-bulb)" stroke="#ca8a04" strokeWidth="0.8" />
        <rect x="-2" y="6" width="4" height="2" rx="0.5" fill="#94a3b8" />
        <polygon points="0,-9 0,-11 -2,-10" fill="#facc15" />
        <line x1="-8" y1="-5" x2="-10" y2="-7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="-5" x2="10" y2="-7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 3D Mechanical Keyboard in Foreground */}
      <g transform="translate(10, 36)">
        {/* Underbody Shadow */}
        <rect x="0" y="4" width="60" height="28" rx="7" fill="#082f49" />
        {/* Main Chassis */}
        <rect x="0" y="0" width="60" height="28" rx="7" fill="url(#tj3-base)" stroke="#7dd3fc" strokeWidth="1.2" />
        {/* Glossy top edge highlight */}
        <path d="M6 3 L54 3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        {/* Row 1 Keys */}
        {[5, 13, 21, 29, 37, 45].map((x, i) => (
          <g key={`r1-${i}`}>
            <rect x={x} y="6" width="6.5" height="5" rx="1.5" fill="#0284c7" />
            <rect x={x} y="5" width="6.5" height="5" rx="1.5" fill="url(#tj3-key-cyan)" />
          </g>
        ))}
        {/* Enter key */}
        <rect x="53" y="6" width="4" height="11" rx="1.5" fill="#7e22ce" />
        <rect x="53" y="5" width="4" height="11" rx="1.5" fill="url(#tj3-key-purple)" />

        {/* Row 2 Keys */}
        {[5, 13, 21, 29, 37, 45].map((x, i) => (
          <g key={`r2-${i}`}>
            <rect x={x} y="12" width="6.5" height="5" rx="1.5" fill="#0e7490" />
            <rect x={x} y="11" width="6.5" height="5" rx="1.5" fill={i % 2 === 0 ? 'url(#tj3-key-blue)' : 'url(#tj3-key-cyan)'} />
          </g>
        ))}

        {/* Row 3 - Spacebar & Modifier keys */}
        <rect x="5" y="18" width="8" height="5" rx="1.5" fill="#0369a1" />
        <rect x="5" y="17" width="8" height="5" rx="1.5" fill="url(#tj3-key-cyan)" />
        {/* Illuminated Spacebar */}
        <rect x="15" y="18" width="30" height="5" rx="2" fill="#0284c7" />
        <rect x="15" y="17" width="30" height="5" rx="2" fill="#38bdf8" />
        <rect x="17" y="18" width="26" height="1.5" rx="0.75" fill="#ffffff" opacity="0.8" />
        {/* Right key */}
        <rect x="47" y="18" width="10" height="5" rx="1.5" fill="#7e22ce" />
        <rect x="47" y="17" width="10" height="5" rx="1.5" fill="url(#tj3-key-purple)" />
      </g>
    </g>
  </svg>
);

// 2. Email Marketing: 3D Glossy Violet Envelope Opening with Cyan Rocket Arrow, Gold Coins & @ Badge
export const EmailMarketing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="em3-env" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
      <linearGradient id="em3-flap" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#e9d5ff" />
      </linearGradient>
      <linearGradient id="em3-arrow" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>
      <linearGradient id="em3-coin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <radialGradient id="em3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
      <filter id="em3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#3b0764" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#em3-glow)" />

    <g filter="url(#em3-shadow)">
      {/* Soaring 3D Cyan Arrow shooting out from letter */}
      <g transform="translate(36, 12)">
        <path d="M0 24 L14 10 L14 15 L26 4 L14 -7 L14 -2 L-2 18 Z" fill="#083344" opacity="0.3" />
        <path d="M0 22 L14 8 L14 13 L26 2 L14 -9 L14 -4 L-2 16 Z" fill="url(#em3-arrow)" />
        <polygon points="26,2 14,-9 14,-4" fill="#ffffff" opacity="0.6" />
      </g>

      {/* Floating 3D Gold Coins */}
      <g transform="translate(14, 18)">
        <ellipse cx="6" cy="6" rx="6" ry="6" fill="#a16207" />
        <circle cx="6" cy="5.2" r="5.5" fill="url(#em3-coin)" stroke="#fef08a" strokeWidth="0.8" />
        <text x="6" y="8" fontSize="6" fontWeight="900" fill="#854d0e" textAnchor="middle">$</text>
      </g>

      <g transform="translate(56, 32)">
        <ellipse cx="5" cy="5" rx="5" ry="5" fill="#a16207" />
        <circle cx="5" cy="4.2" r="4.5" fill="url(#em3-coin)" stroke="#fef08a" strokeWidth="0.8" />
      </g>

      {/* 3D Envelope Body */}
      <g transform="translate(14, 26)">
        {/* Base Shadow */}
        <rect x="0" y="3" width="52" height="34" rx="7" fill="#3b0764" />
        {/* Base Envelope Box */}
        <rect x="0" y="0" width="52" height="34" rx="7" fill="url(#em3-env)" stroke="#d8b4fe" strokeWidth="1.2" />

        {/* Paper Letter peeking out */}
        <rect x="8" y="-10" width="36" height="24" rx="3.5" fill="#ffffff" stroke="#c084fc" strokeWidth="0.9" />
        <line x1="13" y1="-5" x2="25" y2="-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="-1" x2="31" y2="-1" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />

        {/* Open Flap Triangles */}
        <path d="M0 0 L26 19 L52 0 Z" fill="url(#em3-flap)" opacity="0.95" />
        <path d="M0 34 L19 16" stroke="#4c1d95" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M52 34 L33 16" stroke="#4c1d95" strokeWidth="1.6" strokeLinecap="round" />

        {/* Center 3D Heart/@ Badge */}
        <circle cx="26" cy="18" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
        <circle cx="26" cy="18" r="7.5" fill="#7c3aed" />
        <text x="26" y="22" fontSize="10" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">@</text>
      </g>
    </g>
  </svg>
);

// 3. Form Fill-Up: 3D Crisp Clipboard + Document with Green Checkmarks + Sleek Stylus Pen
export const FormFillup3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ff3-board" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="ff3-clip" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="ff3-pen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <radialGradient id="ff3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <filter id="ff3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#064e3b" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ff3-glow)" />

    <g filter="url(#ff3-shadow)">
      {/* 3D Clipboard Base */}
      <g transform="translate(16, 12)">
        <rect x="0" y="3" width="46" height="54" rx="7" fill="#064e3b" />
        <rect x="0" y="0" width="46" height="54" rx="7" fill="url(#ff3-board)" stroke="#6ee7b7" strokeWidth="1.2" />

        {/* Paper Sheet on Clipboard */}
        <rect x="4" y="6" width="38" height="44" rx="4" fill="#ffffff" />
        
        {/* Form Header Banner */}
        <rect x="8" y="10" width="18" height="3.5" rx="1.5" fill="#059669" />
        <rect x="28" y="10" width="10" height="3.5" rx="1.5" fill="#d1fae5" />

        {/* Row 1: Checkbox & Line */}
        <rect x="8" y="17" width="6.5" height="6.5" rx="1.8" fill="#10b981" />
        <path d="M10 20.2 L12 22 L14 18.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="17" y="19" width="19" height="2.5" rx="1.2" fill="#64748b" />

        {/* Row 2: Checkbox & Line */}
        <rect x="8" y="26" width="6.5" height="6.5" rx="1.8" fill="#10b981" />
        <path d="M10 29.2 L12 31 L14 27.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="17" y="28" width="16" height="2.5" rx="1.2" fill="#64748b" />

        {/* Row 3: Checkbox & Line */}
        <rect x="8" y="35" width="6.5" height="6.5" rx="1.8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
        <rect x="17" y="37" width="18" height="2.5" rx="1.2" fill="#94a3b8" />

        {/* Top Gold Binder Clip */}
        <g transform="translate(15, -4)">
          <rect x="0" y="1" width="16" height="8" rx="2.5" fill="#78350f" />
          <rect x="0" y="0" width="16" height="8" rx="2.5" fill="url(#ff3-clip)" stroke="#fde047" strokeWidth="0.8" />
          <path d="M4 0 C4 -3 12 -3 12 0" stroke="#fef08a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* 3D Cyan Stylus Pen Filling the Form */}
      <g transform="translate(48, 40) rotate(-32)">
        {/* Pen Shadow */}
        <rect x="-3" y="-24" width="7" height="28" rx="2.5" fill="#0f172a" opacity="0.35" />
        {/* Pen Body */}
        <rect x="-3" y="-25" width="7" height="25" rx="2" fill="url(#ff3-pen)" stroke="#bae6fd" strokeWidth="0.8" />
        {/* Silver Ring */}
        <rect x="-3" y="-8" width="7" height="3" fill="#e2e8f0" />
        {/* Chrome Nib */}
        <polygon points="-3,-5 4,-5 0.5,3" fill="#cbd5e1" />
        <circle cx="0.5" cy="3" r="1" fill="#0284c7" />
      </g>
    </g>
  </svg>
);

// 4. Data Entry: 3D Holographic Cylinder Database + Floating Spreadsheet Grid & Data Sparks
export const DataEntryJob3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dej3-cyl1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0c4a6e" />
      </linearGradient>
      <linearGradient id="dej3-cyl2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <linearGradient id="dej3-sheet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f0fdf4" />
      </linearGradient>
      <radialGradient id="dej3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <filter id="dej3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0c4a6e" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#dej3-glow)" />

    <g filter="url(#dej3-shadow)">
      {/* 3D Stacked Database Discs (Left-Bottom) */}
      <g transform="translate(10, 24)">
        {/* Disc 3 (Bottom) */}
        <g transform="translate(0, 20)">
          <path d="M0 7 C0 11.5 12 15 26 15 C40 15 52 11.5 52 7 L52 13 C52 17.5 40 21 26 21 C12 21 0 17.5 0 13 Z" fill="#047857" />
          <ellipse cx="26" cy="7" rx="26" ry="7.5" fill="url(#dej3-cyl2)" stroke="#a7f3d0" strokeWidth="1" />
          <circle cx="12" cy="11" r="1.5" fill="#a7f3d0" />
          <circle cx="18" cy="12" r="1.5" fill="#34d399" />
        </g>

        {/* Disc 2 (Middle) */}
        <g transform="translate(0, 10)">
          <path d="M0 7 C0 11.5 12 15 26 15 C40 15 52 11.5 52 7 L52 13 C52 17.5 40 21 26 21 C12 21 0 17.5 0 13 Z" fill="#0369a1" />
          <ellipse cx="26" cy="7" rx="26" ry="7.5" fill="url(#dej3-cyl1)" stroke="#7dd3fc" strokeWidth="1" />
          <circle cx="12" cy="11" r="1.5" fill="#7dd3fc" />
          <circle cx="18" cy="12" r="1.5" fill="#38bdf8" />
        </g>

        {/* Disc 1 (Top) */}
        <g transform="translate(0, 0)">
          <path d="M0 7 C0 11.5 12 15 26 15 C40 15 52 11.5 52 7 L52 13 C52 17.5 40 21 26 21 C12 21 0 17.5 0 13 Z" fill="#0c4a6e" />
          <ellipse cx="26" cy="7" rx="26" ry="7.5" fill="url(#dej3-cyl1)" stroke="#bae6fd" strokeWidth="1" />
          <circle cx="12" cy="11" r="1.5" fill="#ffffff" />
          <circle cx="18" cy="12" r="1.5" fill="#38bdf8" />
        </g>
      </g>

      {/* Floating 3D Spreadsheet Grid Panel */}
      <g transform="translate(32, 12)">
        <rect x="0" y="2" width="36" height="28" rx="4" fill="#0f172a" opacity="0.3" />
        <rect x="0" y="0" width="36" height="28" rx="4" fill="url(#dej3-sheet)" stroke="#10b981" strokeWidth="1.2" />

        {/* Excel Green Title Bar */}
        <rect x="0" y="0" width="36" height="6.5" rx="4" fill="#059669" />
        <circle cx="4" cy="3.2" r="1" fill="#ffffff" />
        <circle cx="7.5" cy="3.2" r="1" fill="#ffffff" />

        {/* Spreadsheet Cells */}
        {/* Row 1 */}
        <rect x="3" y="8.5" width="8" height="4" rx="1" fill="#d1fae5" />
        <rect x="13" y="8.5" width="9" height="4" rx="1" fill="#f1f5f9" />
        <rect x="24" y="8.5" width="9" height="4" rx="1" fill="#dbeafe" />

        {/* Row 2 */}
        <rect x="3" y="14" width="8" height="4" rx="1" fill="#d1fae5" />
        <rect x="13" y="14" width="9" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
        <rect x="24" y="14" width="9" height="4" rx="1" fill="#f1f5f9" />

        {/* Row 3 */}
        <rect x="3" y="19.5" width="8" height="4" rx="1" fill="#d1fae5" />
        <rect x="13" y="19.5" width="9" height="4" rx="1" fill="#f1f5f9" />
        <rect x="24" y="19.5" width="9" height="4" rx="1" fill="#10b981" />
      </g>

      {/* Upward Growth Arrow */}
      <g transform="translate(54, 38)">
        <circle cx="6" cy="6" r="8" fill="#10b981" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <path d="M3 8 L6 4 L9 8 M6 4 L6 10" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  </svg>
);

// 5. Code Entry & Validation: 3D Terminal Window with Matrix Lines & Emerald Shield
export const CodeEntry3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ce3-term" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="ce3-shield" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="ce3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <filter id="ce3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#78350f" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ce3-glow)" />

    <g filter="url(#ce3-shadow)">
      {/* 3D Code Editor Window */}
      <g transform="translate(12, 16)">
        <rect x="0" y="3" width="56" height="42" rx="7" fill="#020617" />
        <rect x="0" y="0" width="56" height="42" rx="7" fill="url(#ce3-term)" stroke="#f59e0b" strokeWidth="1.2" />

        {/* Header Bar with Mac Dots */}
        <rect x="0" y="0" width="56" height="9" rx="7" fill="#334155" />
        <circle cx="6" cy="4.5" r="1.8" fill="#ef4444" />
        <circle cx="11.5" cy="4.5" r="1.8" fill="#eab308" />
        <circle cx="17" cy="4.5" r="1.8" fill="#22c55e" />

        {/* Code Syntax Characters */}
        <text x="8" y="22" fontSize="9" fontWeight="900" fill="#38bdf8" fontFamily="monospace">&lt;/&gt;</text>
        <line x1="28" y1="20" x2="48" y2="20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="28" x2="32" y2="28" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="35" x2="22" y2="35" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Floating 3D Emerald Verification Shield */}
      <g transform="translate(44, 34)">
        <path d="M12 0 L24 4 C24 16 16 24 12 28 C8 24 0 16 0 4 Z" fill="#064e3b" />
        <path d="M12 0 L24 4 C24 16 16 24 12 28 C8 24 0 16 0 4 Z" fill="url(#ce3-shield)" stroke="#a7f3d0" strokeWidth="1" />
        <path d="M7 13 L10.5 16.5 L17 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  </svg>
);

// 6. Facebook / Marketing Analytics: 3D Loudspeaker Megaphone + Golden Sound Rings & Thumbs Up
export const MarketingAnalytics3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ma3-mega" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="ma3-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <radialGradient id="ma3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
      <filter id="ma3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#1e3a8a" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ma3-glow)" />

    <g filter="url(#ma3-shadow)">
      {/* 3D Megaphone Body */}
      <g transform="translate(14, 20)">
        {/* Handle */}
        <rect x="18" y="24" width="7" height="15" rx="3.5" fill="#1e3a8a" transform="rotate(-15 18 24)" />
        {/* Cone Shadow */}
        <polygon points="12,18 36,8 36,36 12,26" fill="#0f172a" opacity="0.3" />
        {/* Cone Body */}
        <polygon points="10,16 34,6 34,34 10,24" fill="url(#ma3-mega)" stroke="#60a5fa" strokeWidth="1" />
        {/* Megaphone Bell Rim */}
        <ellipse cx="34" cy="20" rx="5" ry="14" fill="url(#ma3-rim)" stroke="#fef08a" strokeWidth="1" />
        {/* Rear Cap */}
        <ellipse cx="10" cy="20" rx="3.5" ry="4.5" fill="#93c5fd" />
      </g>

      {/* Dynamic Sound Waves */}
      <path d="M54 26 C57 32 57 42 54 48" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 20 C65 30 65 48 60 56" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" />

      {/* Floating 3D Thumbs-up Badge */}
      <g transform="translate(42, 10)">
        <circle cx="9" cy="9" r="9" fill="#1d4ed8" />
        <circle cx="9" cy="8.2" r="8.5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="0.8" />
        {/* Thumbs up */}
        <path d="M6 10 L7 10 L8 6 C8 5 9 5 10 6 L10 10 L13 10 C14 10 14 11 13.5 12 L12 14 L7 14 Z" fill="#ffffff" />
      </g>
    </g>
  </svg>
);

// 7. Lead Generation: 3D Archery Target Bullseye + Golden Piercing Arrow
export const LeadGeneration3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="lg3-arrow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <radialGradient id="lg3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </radialGradient>
      <filter id="lg3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#881337" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#lg3-glow)" />

    <g filter="url(#lg3-shadow)">
      {/* 3D Target Rings */}
      <g transform="translate(40, 42)">
        {/* Ring 1 - Base Outer Red */}
        <ellipse cx="0" cy="0" rx="27" ry="24" fill="#9f1239" />
        <ellipse cx="0" cy="-2" rx="26" ry="23" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.2" />

        {/* Ring 2 - White */}
        <ellipse cx="0" cy="-2" rx="19" ry="16.5" fill="#ffffff" />

        {/* Ring 3 - Red */}
        <ellipse cx="0" cy="-2" rx="12" ry="10.5" fill="#e11d48" />

        {/* Ring 4 - Golden Bullseye */}
        <ellipse cx="0" cy="-2" rx="5.5" ry="5" fill="#facc15" stroke="#fef08a" strokeWidth="1" />
      </g>

      {/* Golden Arrow Piercing Bullseye */}
      <g transform="translate(40, 39)">
        {/* Shaft */}
        <line x1="0" y1="-2" x2="22" y2="-24" stroke="url(#lg3-arrow)" strokeWidth="3" strokeLinecap="round" />
        {/* Feathers */}
        <polygon points="22,-24 16,-24 19,-20" fill="#f59e0b" />
        <polygon points="22,-24 22,-18 19,-20" fill="#facc15" />
      </g>

      {/* Sparkles of Impact */}
      <circle cx="34" cy="34" r="1.8" fill="#fef08a" />
      <circle cx="46" cy="35" r="1.5" fill="#fef08a" />
      <polygon points="40,28 41.5,32 45,33 41.5,34 40,38 38.5,34 35,33 38.5,32" fill="#ffffff" />
    </g>
  </svg>
);

// 8. Video Submit Work: 3D Cinema Clapperboard + Glowing Ruby Play Button
export const VideoSubmit3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="vs3-clap" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="vs3-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <radialGradient id="vs3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </radialGradient>
      <filter id="vs3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#881337" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#vs3-glow)" />

    <g filter="url(#vs3-shadow)">
      {/* 3D Clapperboard Base */}
      <g transform="translate(14, 20)">
        <rect x="0" y="3" width="52" height="40" rx="7" fill="#020617" />
        <rect x="0" y="0" width="52" height="40" rx="7" fill="url(#vs3-clap)" stroke="#e2e8f0" strokeWidth="1.2" />

        {/* Top Slanted Clapper Arm */}
        <g transform="translate(0, -6) rotate(-10)">
          <rect x="0" y="0" width="52" height="12" rx="3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          {/* Zebra stripes */}
          <polygon points="6,0 12,0 7,12 1,12" fill="#ffffff" />
          <polygon points="18,0 24,0 19,12 13,12" fill="#ffffff" />
          <polygon points="30,0 36,0 31,12 25,12" fill="#ffffff" />
          <polygon points="42,0 48,0 43,12 37,12" fill="#ffffff" />
        </g>

        {/* Big 3D Ruby Play Button in Center */}
        <g transform="translate(26, 20)">
          <rect x="-14" y="-8" width="28" height="18" rx="6" fill="#9f1239" />
          <rect x="-14" y="-10" width="28" height="18" rx="6" fill="url(#vs3-ruby)" stroke="#fda4af" strokeWidth="1" />
          {/* Glass Gloss highlight */}
          <path d="M-12 -9 L12 -9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          {/* White Play Triangle */}
          <polygon points="-3,-5 6,0 -3,5" fill="#ffffff" />
        </g>
      </g>
    </g>
  </svg>
);

// 9. Product Selling: 3D Luxury Amber Shopping Bag + Gift Ribbons & Gold Coins
export const OfferSelling3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="os3-bag" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="os3-coin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <radialGradient id="os3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <filter id="os3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#78350f" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#os3-glow)" />

    <g filter="url(#os3-shadow)">
      {/* 3D Shopping Bag */}
      <g transform="translate(18, 16)">
        {/* Handles */}
        <path d="M12 12 C12 2 32 2 32 12" stroke="#d97706" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M12 10 C12 0 32 0 32 10" stroke="#fef08a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Bag Shadow */}
        <polygon points="4,14 40,14 44,48 0,48" fill="#78350f" opacity="0.3" />
        {/* Bag Body */}
        <polygon points="4,12 40,12 44,46 0,46" fill="url(#os3-bag)" stroke="#fef08a" strokeWidth="1.2" />

        {/* Center Gift Star / Percent Badge */}
        <circle cx="22" cy="28" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <circle cx="22" cy="28" r="7.5" fill="#f59e0b" />
        <text x="22" y="32" fontSize="9" fontWeight="900" fill="#ffffff" textAnchor="middle">%</text>
      </g>

      {/* Floating Gold Coin */}
      <g transform="translate(48, 18)">
        <ellipse cx="6" cy="6" rx="6" ry="6" fill="#a16207" />
        <circle cx="6" cy="5.2" r="5.5" fill="url(#os3-coin)" stroke="#fef08a" strokeWidth="0.8" />
        <text x="6" y="8" fontSize="6" fontWeight="900" fill="#854d0e" textAnchor="middle">$</text>
      </g>
    </g>
  </svg>
);

// 10. Photo Editing: 3D Painter's Palette + Vibrant Paint Dots & Fine Brush
export const PhotoEditing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="pe3-pal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="50%" stopColor="#fba759" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <radialGradient id="pe3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
      <filter id="pe3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#7c2d12" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#pe3-glow)" />

    <g filter="url(#pe3-shadow)">
      {/* 3D Wooden Palette */}
      <g transform="translate(12, 14)">
        <path d="M28 0 C46 0 56 12 56 28 C56 44 44 52 28 52 C12 52 0 42 0 26 C0 10 12 0 28 0 Z" fill="#9a3412" />
        <path d="M28 -2 C46 -2 56 10 56 26 C56 42 44 50 28 50 C12 50 0 40 0 24 C0 8 12 -2 28 -2 Z" fill="url(#pe3-pal)" stroke="#ffedd5" strokeWidth="1.2" />

        {/* Thumb Hole */}
        <ellipse cx="42" cy="34" rx="4.5" ry="6" fill="#9a3412" />

        {/* Colorful Paint Blobs */}
        <circle cx="16" cy="14" r="5" fill="#ef4444" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        <circle cx="28" cy="8" r="5" fill="#facc15" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        <circle cx="40" cy="12" r="5" fill="#3b82f6" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        <circle cx="12" cy="27" r="5" fill="#10b981" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        <circle cx="20" cy="38" r="5" fill="#a855f7" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
      </g>

      {/* 3D Artist Brush diagonally across */}
      <g transform="translate(48, 22) rotate(42)">
        <rect x="-2" y="-30" width="5" height="32" rx="2" fill="#713f12" />
        <rect x="-2.5" y="2" width="6" height="5" rx="1" fill="#cbd5e1" />
        <path d="M-2.5 7 C-2.5 12 3.5 12 3.5 7 Z" fill="#3b82f6" />
      </g>
    </g>
  </svg>
);

// 11. Video Editing: 3D Crimson Cinema Reel Camera + Sharp Scissors
export const VideoEditing3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ve3-cam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e11d48" />
        <stop offset="50%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <radialGradient id="ve3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
      </radialGradient>
      <filter id="ve3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#881337" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ve3-glow)" />

    <g filter="url(#ve3-shadow)">
      {/* 3D Camera Body */}
      <g transform="translate(14, 24)">
        {/* Film Reels on top */}
        <circle cx="14" cy="-4" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="14" cy="-4" r="3" fill="#cbd5e1" />
        <circle cx="28" cy="-4" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="28" cy="-4" r="3" fill="#cbd5e1" />

        {/* Camera Box */}
        <rect x="0" y="3" width="38" height="28" rx="6" fill="#4c0519" />
        <rect x="0" y="0" width="38" height="28" rx="6" fill="url(#ve3-cam)" stroke="#fda4af" strokeWidth="1.2" />

        {/* Lens Funnel */}
        <polygon points="38,6 52,0 52,28 38,22" fill="#881337" />
        <polygon points="38,4 52,-2 52,26 38,20" fill="#be123c" stroke="#fecdd3" strokeWidth="1" />
        <ellipse cx="52" cy="12" rx="2" ry="14" fill="#38bdf8" />
      </g>

      {/* Chrome Scissors Cutting Film */}
      <g transform="translate(14, 46)">
        <circle cx="6" cy="14" r="4.5" fill="none" stroke="#facc15" strokeWidth="2" />
        <circle cx="18" cy="14" r="4.5" fill="none" stroke="#facc15" strokeWidth="2" />
        <line x1="9" y1="11" x2="22" y2="0" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="11" x2="2" y2="0" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

// 12. Computer Training: 3D Desktop PC + Academic Graduation Cap & Diploma
export const ComputerTraining3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ct3-mon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <radialGradient id="ct3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
      <filter id="ct3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#1e3a8a" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ct3-glow)" />

    <g filter="url(#ct3-shadow)">
      {/* 3D Desktop Monitor */}
      <g transform="translate(14, 22)">
        <rect x="0" y="3" width="52" height="34" rx="6" fill="#0f172a" />
        <rect x="0" y="0" width="52" height="34" rx="6" fill="url(#ct3-mon)" stroke="#93c5fd" strokeWidth="1.2" />
        {/* Inner Screen */}
        <rect x="4" y="4" width="44" height="26" rx="3" fill="#0f172a" />
        <path d="M8 12 L14 17 L8 22" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="18" y1="22" x2="26" y2="22" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />

        {/* Stand */}
        <rect x="22" y="34" width="8" height="6" fill="#475569" />
        <ellipse cx="26" cy="40" rx="12" ry="3" fill="#334155" />
      </g>

      {/* 3D Black Academic Cap (Mortarboard) perched on monitor */}
      <g transform="translate(38, 12)">
        <polygon points="0,0 20,-6 0,-12 -20,-6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        <polygon points="0,2 20,-4 0,-10 -20,-4" fill="#1e293b" />
        {/* Golden Tassel */}
        <line x1="0" y1="-4" x2="16" y2="3" stroke="#facc15" strokeWidth="1.5" />
        <circle cx="16" cy="4" r="1.5" fill="#facc15" />
      </g>
    </g>
  </svg>
);

// 13. Social Media Management: 3D Smartphone with Notification Bell & Chat Hearts
export const SocialManagement3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sm3-phone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <radialGradient id="sm3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
      </radialGradient>
      <filter id="sm3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0c4a6e" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#sm3-glow)" />

    <g filter="url(#sm3-shadow)">
      {/* 3D Smartphone */}
      <g transform="translate(18, 14)">
        <rect x="0" y="3" width="32" height="52" rx="6" fill="#082f49" />
        <rect x="0" y="0" width="32" height="52" rx="6" fill="url(#sm3-phone)" stroke="#bae6fd" strokeWidth="1.2" />

        {/* Screen */}
        <rect x="3" y="5" width="26" height="42" rx="3.5" fill="#0f172a" />
        <circle cx="16" cy="49" r="1.5" fill="#ffffff" opacity="0.8" />
      </g>

      {/* Floating 3D Love Chat Bubble */}
      <g transform="translate(38, 16)">
        <rect x="0" y="2" width="26" height="18" rx="6" fill="#9f1239" opacity="0.3" />
        <rect x="0" y="0" width="26" height="18" rx="6" fill="#f43f5e" stroke="#fecdd3" strokeWidth="1" />
        <polygon points="6,18 10,18 4,23" fill="#f43f5e" />
        {/* Heart */}
        <path d="M13 12 C13 12 8 8 8 5.5 C8 4 9.5 3 11 4 C12 5 13 6 13 6 C13 6 14 5 15 4 C16.5 3 18 4 18 5.5 C18 8 13 12 13 12 Z" fill="#ffffff" />
      </g>

      {/* Floating Golden Bell */}
      <g transform="translate(42, 42)">
        <circle cx="8" cy="8" r="9" fill="#f59e0b" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
        <path d="M8 3 C6 3 5 5 5 7 L4 10 L12 10 L11 7 C11 5 10 3 8 3 Z" fill="#ffffff" />
        <circle cx="8" cy="11.5" r="1.2" fill="#ffffff" />
      </g>
    </g>
  </svg>
);

// 14. Content Writing: 3D Golden Fountain Pen + Open Leather Notebook
export const ContentWritingJob3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cw3-book" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <linearGradient id="cw3-pen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <radialGradient id="cw3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      <filter id="cw3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#064e3b" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#cw3-glow)" />

    <g filter="url(#cw3-shadow)">
      {/* 3D Open Journal */}
      <g transform="translate(12, 18)">
        {/* Cover */}
        <rect x="0" y="3" width="56" height="42" rx="5" fill="#022c22" />
        <rect x="0" y="0" width="56" height="42" rx="5" fill="url(#cw3-book)" stroke="#6ee7b7" strokeWidth="1.2" />

        {/* Paper Pages */}
        <rect x="4" y="3" width="23" height="36" rx="2" fill="#ffffff" />
        <rect x="29" y="3" width="23" height="36" rx="2" fill="#f8fafc" />

        {/* Ruled text lines */}
        {[8, 14, 20, 26, 32].map((y) => (
          <line key={`l1-${y}`} x1="7" y1={y} x2="23" y2={y} stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        {[8, 14, 20, 26, 32].map((y) => (
          <line key={`l2-${y}`} x1="32" y1={y} x2="48" y2={y} stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />
        ))}
      </g>

      {/* 3D Golden Fountain Pen */}
      <g transform="translate(48, 38) rotate(-40)">
        <rect x="-3" y="-30" width="6" height="32" rx="2" fill="url(#cw3-pen)" stroke="#fef08a" strokeWidth="0.8" />
        <polygon points="-3,2 3,2 0,9" fill="#ca8a04" />
        <circle cx="0" cy="9" r="0.8" fill="#ca8a04" />
      </g>
    </g>
  </svg>
);

// 15. Drop Shipping: 3D Express Delivery Parcel Box + Green Pin & Speed Streaks
export const DropShipping3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ds3-box" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <radialGradient id="ds3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <filter id="ds3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#78350f" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#ds3-glow)" />

    <g filter="url(#ds3-shadow)">
      {/* 3D Cardboard Parcel Box */}
      <g transform="translate(16, 22)">
        {/* Isometric Cube Faces */}
        {/* Top Face */}
        <polygon points="24,0 48,12 24,24 0,12" fill="#fbbf24" stroke="#fef08a" strokeWidth="1" />
        <polygon points="24,12 24,24 21,22.5 21,10.5" fill="#b45309" />
        {/* Left Face */}
        <polygon points="0,12 24,24 24,46 0,34" fill="url(#ds3-box)" stroke="#d97706" strokeWidth="0.8" />
        {/* Right Face */}
        <polygon points="24,24 48,12 48,34 24,46" fill="#b45309" stroke="#92400e" strokeWidth="0.8" />

        {/* Shipping Label on Left Face */}
        <polygon points="4,22 16,28 16,36 4,30" fill="#ffffff" />
        <line x1="6" y1="26" x2="14" y2="30" stroke="#0f172a" strokeWidth="1" />
      </g>

      {/* Floating 3D Green Location Pin */}
      <g transform="translate(48, 12)">
        <path d="M8 0 C3.5 0 0 3.5 0 8 C0 14 8 20 8 20 C8 20 16 14 16 8 C16 3.5 12.5 0 8 0 Z" fill="#10b981" stroke="#6ee7b7" strokeWidth="1" />
        <circle cx="8" cy="8" r="3.5" fill="#ffffff" />
      </g>
    </g>
  </svg>
);

// 16. Gaming Tournament: 3D Esports Controller + Golden Trophy Cup & Stars
export const GamingTournament3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gt3-pad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#6d28d9" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <linearGradient id="gt3-trophy" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <radialGradient id="gt3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
      </radialGradient>
      <filter id="gt3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#3b0764" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#gt3-glow)" />

    <g filter="url(#gt3-shadow)">
      {/* 3D Gamepad Body */}
      <g transform="translate(10, 24)">
        <rect x="2" y="5" width="56" height="32" rx="14" fill="#1e1b4b" />
        <rect x="2" y="2" width="56" height="32" rx="14" fill="url(#gt3-pad)" stroke="#c4b5fd" strokeWidth="1.2" />

        {/* D-Pad on Left */}
        <g transform="translate(14, 14)">
          <rect x="3" y="0" width="4" height="10" rx="1" fill="#ede9fe" />
          <rect x="0" y="3" width="10" height="4" rx="1" fill="#ede9fe" />
        </g>

        {/* Action Buttons on Right */}
        <circle cx="43" cy="14" r="2.5" fill="#f43f5e" />
        <circle cx="48" cy="19" r="2.5" fill="#3b82f6" />
        <circle cx="38" cy="19" r="2.5" fill="#eab308" />
        <circle cx="43" cy="24" r="2.5" fill="#10b981" />

        {/* Center Thumbsticks */}
        <circle cx="25" cy="22" r="4.5" fill="#312e81" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="35" cy="22" r="4.5" fill="#312e81" stroke="#a78bfa" strokeWidth="1" />
      </g>

      {/* Floating 3D Golden Trophy Cup */}
      <g transform="translate(42, 8)">
        <path d="M4 0 L20 0 L18 10 C18 14 14 16 12 16 C10 16 6 14 6 10 Z" fill="url(#gt3-trophy)" stroke="#fef08a" strokeWidth="1" />
        {/* Handles */}
        <path d="M4 3 C0 3 0 9 4 9" stroke="#facc15" strokeWidth="1.6" fill="none" />
        <path d="M20 3 C24 3 24 9 20 9" stroke="#facc15" strokeWidth="1.6" fill="none" />
        {/* Stand */}
        <rect x="10.5" y="16" width="3" height="4" fill="#a16207" />
        <rect x="8" y="20" width="8" height="3" rx="1" fill="#713f12" />
      </g>
    </g>
  </svg>
);

// 17. Website Visit: 3D Holographic Globe + Orbiting Ring & Sharp Click Pointer
export const WebsiteVisit3D: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="wv3-globe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <radialGradient id="wv3-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
      </radialGradient>
      <filter id="wv3-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#083344" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="35" fill="url(#wv3-glow)" />

    <g filter="url(#wv3-shadow)">
      {/* 3D Cyan Globe Sphere */}
      <g transform="translate(18, 16)">
        <circle cx="22" cy="24" r="22" fill="#082f49" />
        <circle cx="22" cy="22" r="22" fill="url(#wv3-globe)" stroke="#67e8f9" strokeWidth="1.2" />

        {/* Latitude & Longitude grid lines */}
        <ellipse cx="22" cy="22" rx="22" ry="9" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.6" />
        <ellipse cx="22" cy="22" rx="10" ry="22" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.6" />
        <line x1="0" y1="22" x2="44" y2="22" stroke="#ffffff" strokeWidth="0.9" opacity="0.6" />

        {/* Green Continents */}
        <path d="M12 14 C16 12 20 18 16 22 C12 24 8 18 12 14 Z" fill="#34d399" opacity="0.8" />
        <path d="M26 24 C30 20 34 26 32 30 C28 32 24 28 26 24 Z" fill="#34d399" opacity="0.8" />
      </g>

      {/* Orbiting Ring */}
      <ellipse cx="40" cy="38" rx="30" ry="12" stroke="#facc15" strokeWidth="1.8" fill="none" transform="rotate(-20 40 38)" strokeDasharray="6 3" />

      {/* Sharp 3D White Mouse Pointer Cursor */}
      <g transform="translate(44, 42)">
        <polygon points="0,0 6,18 9,13 16,13" fill="#0f172a" />
        <polygon points="0,-1 6,16 9,11 16,11" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
      </g>
    </g>
  </svg>
);

// Map of Job IDs to specialized 3D icons
export const JOB_3D_ICONS: Record<string, React.FC<IconProps>> = {
  'typing-job': TypingJob3D,
  'email-marketing': EmailMarketing3D,
  'form-fillup-work': FormFillup3D,
  'data-entry-work': DataEntryJob3D,
  'code-entry': CodeEntry3D,
  'facebook-marketing': MarketingAnalytics3D,
  'lead-generation': LeadGeneration3D,
  'video-submit-work': VideoSubmit3D,
  'product-selling-work': OfferSelling3D,
  'photo-editing': PhotoEditing3D,
  'video-editing': VideoEditing3D,
  'computer-training': ComputerTraining3D,
  'social-media-management': SocialManagement3D,
  'content-writing': ContentWritingJob3D,
  'drop-shipping': DropShipping3D,
  'gaming-tournament': GamingTournament3D,
  'website-visit': WebsiteVisit3D,
};
