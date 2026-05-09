/** Ilustrasi splash — megaphone & shield, gaya mendekati desain */
export function SplashIllustration() {
  return (
    <svg
      className="splash-illustration"
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d9a4" />
          <stop offset="100%" stopColor="#c17f4a" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="168" rx="120" ry="18" fill="rgba(0,0,0,0.15)" />
      <path
        d="M160 28 L230 55 L230 120 Q230 165 160 185 Q90 165 90 120 L90 55 Z"
        fill="url(#shieldGrad)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
      />
      <circle cx="160" cy="95" r="36" fill="rgba(90,55,40,0.25)" />
      <path
        d="M118 92 Q160 72 202 92 L198 118 Q160 108 122 118 Z"
        fill="#d97a3a"
      />
      <ellipse cx="145" cy="118" rx="22" ry="26" fill="#f2a04a" />
      <ellipse cx="152" cy="140" rx="28" ry="14" fill="#2a1810" />
      <rect x="175" y="78" width="78" height="44" rx="12" fill="#5c3d2a" />
      <path d="M253 88 L285 100 L253 112 Z" fill="#e8c89a" />
      <rect x="182" y="88" width="58" height="24" rx="6" fill="#f5e6d3" opacity="0.25" />
    </svg>
  )
}
