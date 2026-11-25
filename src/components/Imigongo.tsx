/**
 * Imigongo — the geometric relief art of eastern Rwanda (traditionally
 * black, red-earth and white). Used here as a band/divider motif.
 */
type Variant = "classic" | "gold" | "navy";

const palettes: Record<Variant, [string, string, string]> = {
  classic: ["#141414", "var(--imigongo-red)", "var(--ivory)"],
  gold: ["var(--ink)", "var(--gold)", "var(--navy)"],
  navy: ["var(--navy)", "var(--gold)", "var(--ink)"],
};

export function ImigongoBand({
  variant = "classic",
  className = "",
  height = 28,
}: {
  variant?: Variant;
  className?: string;
  height?: number;
}) {
  const [a, b, c] = palettes[variant];
  const id = `img-${variant}-${height}`;
  return (
    <svg className={className} width="100%" height={height} aria-hidden="true">
      <defs>
        <pattern id={id} width={height * 2} height={height} patternUnits="userSpaceOnUse">
          <rect width={height * 2} height={height} fill={a} />
          {/* nested chevrons */}
          <path d={`M0 ${height} L${height} 0 L${height * 2} ${height} Z`} fill={b} />
          <path d={`M${height * 0.35} ${height} L${height} ${height * 0.3} L${height * 1.65} ${height} Z`} fill={c} />
          <path d={`M${height * 0.7} ${height} L${height} ${height * 0.62} L${height * 1.3} ${height} Z`} fill={a} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Large concentric-diamond field (background art). */
export function ImigongoField({ className = "", stroke = "currentColor", opacity = 0.12 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%" style={{ opacity }}>
      <defs>
        <pattern id="imi-field" width="80" height="80" patternUnits="userSpaceOnUse">
          {[0, 10, 20, 30].map((i) => (
            <path key={i} d={`M40 ${i} L${80 - i} 40 L40 ${80 - i} L${i} 40 Z`} fill="none" stroke={stroke} strokeWidth="1.4" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#imi-field)" />
    </svg>
  );
}
