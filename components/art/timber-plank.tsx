import type { TimberSwatch } from '../../content/timbers';

/**
 * Long sawn timber board rendered in a species' swatch colours,
 * with wavy contour grain lines, sawn end bevel and optional fiddleback figure ripples.
 */
export function TimberPlankBackdrop({
  swatch,
  fiddleback = false,
  className = '',
}: {
  swatch: TimberSwatch;
  fiddleback?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Main board face */}
      <rect x="0" y="0" width="640" height="160" fill={swatch.base} />

      {/* Subtle darker heartwood band running along the board */}
      <path
        d="M0 44 C150 32, 290 60, 460 40 C540 31, 600 48, 640 42 L640 118 C540 126, 420 100, 260 116 C140 128, 60 108, 0 114 Z"
        fill={swatch.heart}
        opacity="0.18"
      />

      {/* Wavy wood-grain contour lines */}
      <g fill="none" stroke={swatch.grain} strokeLinecap="round" opacity="0.52">
        <path d="M0 16 C130 8, 250 24, 400 14 C510 8, 585 20, 640 15" strokeWidth="1.4" />
        <path d="M0 36 C115 44, 240 28, 375 38 C495 47, 575 32, 640 37" strokeWidth="1.2" />
        <path d="M0 60 C150 51, 270 72, 430 58 C535 50, 595 64, 640 59" strokeWidth="1.6" />
        <path d="M0 84 C140 96, 280 74, 420 86 C525 94, 590 78, 640 84" strokeWidth="1.3" />
        <path d="M0 110 C125 102, 265 120, 410 108 C520 99, 590 114, 640 109" strokeWidth="1.5" />
        <path d="M0 136 C135 144, 255 128, 395 138 C510 146, 585 132, 640 137" strokeWidth="1.2" />
      </g>

      {/* Optional rippled fiddleback figure (for blackwood / myrtle) */}
      {fiddleback ? (
        <g stroke={swatch.heart} strokeWidth="7" opacity="0.11">
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={28 + i * 44} y1="0" x2={16 + i * 44} y2="160" />
          ))}
        </g>
      ) : null}

      {/* Sawn right board end shadow */}
      <rect x="628" y="0" width="12" height="160" fill={swatch.heart} opacity="0.34" />
    </svg>
  );
}
