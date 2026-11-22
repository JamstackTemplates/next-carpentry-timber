/**
 * Zig-zag carpenter's folding rule with brass hinges and centimetre ticks,
 * used as a section divider and along the top edge of the footer.
 */
export function FoldingRuleDivider({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const height = compact ? 34 : 44;
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 44"
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid slice"
        className="block w-full"
      >
        {/* Four articulated wooden rule arms in a subtle zig-zag */}
        <g stroke="var(--text)" strokeWidth="1.4" strokeLinejoin="round">
          <polygon points="-20,17 310,9 310,25 -20,33" fill="var(--band)" />
          <polygon points="300,9 610,21 610,37 300,25" fill="var(--band-deep)" />
          <polygon points="600,21 910,9 910,25 600,37" fill="var(--band)" />
          <polygon points="900,9 1220,21 1220,37 900,25" fill="var(--band-deep)" />
        </g>

        {/* Millimetre & centimetre ticks along the four segments */}
        <g stroke="var(--text)" strokeLinecap="round" opacity="0.72">
          {Array.from({ length: 24 }, (_, i) => {
            const x = 18 + i * 12;
            const yTop = 16.2 - (x / 310) * 7.2;
            const len = i % 5 === 0 ? 7.5 : 4;
            return <line key={`a-${i}`} x1={x} y1={yTop} x2={x} y2={yTop + len} strokeWidth={i % 5 === 0 ? 1.2 : 0.9} />;
          })}
          {Array.from({ length: 24 }, (_, i) => {
            const x = 318 + i * 12;
            const yTop = 9.7 + ((x - 300) / 310) * 11.4;
            const len = i % 5 === 0 ? 7.5 : 4;
            return <line key={`b-${i}`} x1={x} y1={yTop} x2={x} y2={yTop + len} strokeWidth={i % 5 === 0 ? 1.2 : 0.9} />;
          })}
          {Array.from({ length: 24 }, (_, i) => {
            const x = 618 + i * 12;
            const yTop = 20.5 - ((x - 600) / 310) * 11.4;
            const len = i % 5 === 0 ? 7.5 : 4;
            return <line key={`c-${i}`} x1={x} y1={yTop} x2={x} y2={yTop + len} strokeWidth={i % 5 === 0 ? 1.2 : 0.9} />;
          })}
          {Array.from({ length: 24 }, (_, i) => {
            const x = 918 + i * 12;
            const yTop = 9.8 + ((x - 900) / 320) * 11.4;
            const len = i % 5 === 0 ? 7.5 : 4;
            return <line key={`d-${i}`} x1={x} y1={yTop} x2={x} y2={yTop + len} strokeWidth={i % 5 === 0 ? 1.2 : 0.9} />;
          })}
        </g>

        {/* Brass hinge plates and rivets at the folds */}
        {[
          { cx: 305, cy: 17 },
          { cx: 605, cy: 29 },
          { cx: 905, cy: 17 },
        ].map((hinge, idx) => (
          <g key={idx}>
            <rect
              x={hinge.cx - 11}
              y={hinge.cy - 9}
              width="22"
              height="18"
              rx="3"
              fill="var(--brass)"
              stroke="var(--text)"
              strokeWidth="1.4"
            />
            <circle cx={hinge.cx} cy={hinge.cy} r="3.4" fill="var(--brass-soft)" stroke="var(--text)" strokeWidth="1.2" />
            <circle cx={hinge.cx - 6.5} cy={hinge.cy} r="1.2" fill="var(--text)" />
            <circle cx={hinge.cx + 6.5} cy={hinge.cy} r="1.2" fill="var(--text)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Straight folding-rule lead-time scale (0–20 weeks) with a brass range bar
 * for each service on the Services cutting list.
 */
export function LeadTimeRule({
  leadWeeks,
  maxScale = 20,
}: {
  leadWeeks: readonly [number, number];
  maxScale?: number;
}) {
  const [min, max] = leadWeeks;
  const clampedMin = Math.max(0, Math.min(maxScale, min));
  const clampedMax = Math.max(clampedMin, Math.min(maxScale, max));
  const startX = 12 + (clampedMin / maxScale) * 216;
  const endX = 12 + (clampedMax / maxScale) * 216;
  const barWidth = Math.max(10, endX - startX);

  return (
    <div className="w-full max-w-[15rem]" aria-hidden="true">
      <svg viewBox="0 0 240 44" className="block w-full h-auto">
        {/* Timber rule body */}
        <rect
          x="4"
          y="6"
          width="232"
          height="20"
          rx="2"
          fill="var(--band)"
          stroke="var(--text)"
          strokeWidth="1.4"
        />

        {/* Brass hinge joints at 5, 10, 15 weeks */}
        {[5, 10, 15].map(w => {
          const x = 12 + (w / maxScale) * 216;
          return (
            <g key={w}>
              <line x1={x} y1="6" x2={x} y2="26" stroke="var(--brass)" strokeWidth="2.5" opacity="0.55" />
              <circle cx={x} cy="16" r="1.5" fill="var(--text)" opacity="0.45" />
            </g>
          );
        })}

        {/* Week tick marks (0..20) */}
        {Array.from({ length: maxScale + 1 }, (_, w) => {
          const x = 12 + (w / maxScale) * 216;
          const major = w % 5 === 0;
          return (
            <line
              key={w}
              x1={x}
              y1="6"
              x2={x}
              y2={major ? '14' : '10.5'}
              stroke="var(--text)"
              strokeWidth={major ? '1.3' : '0.85'}
              opacity={major ? 0.85 : 0.55}
            />
          );
        })}

        {/* Highlighted brass lead-time bar */}
        <rect
          x={startX}
          y="14"
          width={barWidth}
          height="9"
          rx="1.5"
          fill="var(--brass)"
          stroke="var(--text)"
          strokeWidth="1.2"
        />
        <circle cx={startX + 3.5} cy="18.5" r="1.1" fill="var(--paper)" />
        <circle cx={startX + barWidth - 3.5} cy="18.5" r="1.1" fill="var(--paper)" />

        {/* Scale numerals */}
        {[0, 5, 10, 15, 20].map(w => {
          const x = 12 + (w / maxScale) * 216;
          return (
            <text
              key={w}
              x={x}
              y="39"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="600"
              fill="var(--muted)"
              fontFamily="var(--font-sans)"
            >
              {w === 20 ? '20w' : w}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
