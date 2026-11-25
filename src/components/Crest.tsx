/** Vector redraw of the school crest: gold shield, blue cross, S·L, red & green ribbons. */
export const SHIELD_PATH =
  "M10 14 Q50 4 90 14 L90 58 Q90 92 50 112 Q10 92 10 58 Z";

export function Crest({
  className = "",
  ribbons = true,
  mono = false,
}: {
  className?: string;
  ribbons?: boolean;
  mono?: boolean;
}) {
  const gold = mono ? "currentColor" : "var(--gold)";
  const blue = mono ? "var(--ink)" : "var(--lapis)";
  return (
    <svg
      viewBox={ribbons ? "-6 -16 112 150" : "6 2 88 114"}
      className={className}
      role="img"
      aria-label="Crest of Petit Séminaire Saint Léon Kabgayi"
    >
      {ribbons && !mono && (
        <>
          <path d="M-4 -14 H104 V2 H-4 Z" fill="var(--imigongo-red)" />
          <text x="50" y="-2.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#141414" fontFamily="var(--font-sans)" letterSpacing="1.5">
            SEMINAIRE
          </text>
        </>
      )}
      <path d={SHIELD_PATH} fill={gold} stroke={mono ? "none" : "#141414"} strokeWidth="2.5" />
      <path d="M45 16 H55 V108 L50 111 L45 108 Z" fill={blue} />
      <path d="M14 38 H86 V48 H14 Z" fill={blue} />
      <text x="30" y="80" textAnchor="middle" fontSize="26" fontWeight="800" fill={blue} fontFamily="var(--font-sans)">S</text>
      <text x="70" y="80" textAnchor="middle" fontSize="26" fontWeight="800" fill={blue} fontFamily="var(--font-sans)">L</text>
      {ribbons && !mono && (
        <>
          <path d="M-4 118 H104 V134 H-4 Z" fill="var(--green)" />
          <text x="50" y="130" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#fff" fontFamily="var(--font-sans)" letterSpacing="1.5">
            SAINT LEON
          </text>
        </>
      )}
    </svg>
  );
}
