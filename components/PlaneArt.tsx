type Props = {
  accent: string;
  className?: string;
};

/** Illustration stylisée d'un avion RC (vue de profil, nez à droite). */
export default function PlaneArt({ accent, className }: Props) {
  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="118" cy="126" rx="72" ry="8" fill="#0f172a" opacity="0.08" />
      <path d="M40 68 L40 32 Q40 25 46 30 L82 66 Z" fill={accent} />
      <rect x="26" y="70" width="40" height="11" rx="5.5" fill={accent} opacity="0.85" />
      <rect x="36" y="63" width="152" height="32" rx="16" fill="#ffffff" />
      <rect x="44" y="82" width="136" height="6" rx="3" fill={accent} opacity="0.3" />
      <path d="M92 64 Q100 42 124 42 Q148 42 154 64 Z" fill="#1e293b" />
      <rect x="176" y="61" width="18" height="36" rx="9" fill={accent} />
      <g transform="rotate(-16 118 86)">
        <rect x="74" y="77" width="88" height="18" rx="9" fill={accent} />
      </g>
      <rect x="136" y="92" width="5" height="16" rx="2.5" fill="#334155" />
      <circle cx="138" cy="112" r="9" fill="#1e293b" />
      <circle cx="138" cy="112" r="3.5" fill="#e2e8f0" />
      <circle cx="56" cy="102" r="5.5" fill="#1e293b" />
      <circle cx="56" cy="102" r="2" fill="#e2e8f0" />
      <ellipse cx="201" cy="79" rx="3.5" ry="27" fill="#1e293b" opacity="0.8" />
      <circle cx="197" cy="79" r="7" fill="#1e293b" />
    </svg>
  );
}
