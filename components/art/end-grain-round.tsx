import type { CSSProperties } from 'react';
import type { TimberSwatch } from '../../content/timbers';

/** Deterministic integer hash from a string seed (timber ID). */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic pseudo-random generator in [0, 1). */
function mulberry32(a: number) {
  return function next() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Builds a closed organic growth-ring path with gentle deterministic wobble. */
function buildRingPath(
  cx: number,
  cy: number,
  radius: number,
  wobble: number,
  phase1: number,
  phase2: number,
  points = 36,
): string {
  const coords: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * Math.PI * 2;
    const wave =
      Math.sin(theta * 2 + phase1) * wobble * 0.55 +
      Math.cos(theta * 3 + phase2) * wobble * 0.35 +
      Math.sin(theta * 5 + phase1 * 1.7) * wobble * 0.15;
    const r = radius + wave;
    coords.push([cx + Math.cos(theta) * r, cy + Math.sin(theta) * r]);
  }
  let d = '';
  for (let i = 0; i < points; i++) {
    const prev = coords[(i - 1 + points) % points];
    const curr = coords[i];
    const next = coords[(i + 1) % points];
    const midX = (curr[0] + next[0]) / 2;
    const midY = (curr[1] + next[1]) / 2;
    if (i === 0) {
      const startX = (prev[0] + curr[0]) / 2;
      const startY = (prev[1] + curr[1]) / 2;
      d += `M ${startX.toFixed(2)} ${startY.toFixed(2)} `;
    }
    d += `Q ${curr[0].toFixed(2)} ${curr[1].toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)} `;
  }
  return `${d}Z`;
}

export const DEFAULT_SWATCH: TimberSwatch = {
  base: '#DFC295',
  grain: '#A87943',
  heart: '#6B4322',
};

type EndGrainRoundProps = {
  /** Timber colour swatch (`base`, `grain`, `heart`). */
  swatch?: TimberSwatch;
  /** Timber ID or string seed controlling the deterministic ring wobble and crack angle. */
  seed?: string;
  /** Number of growth rings drawn inside the log cross-section. */
  rings?: number;
  /** Rendered pixel width/height (or omit and control via className). */
  size?: number;
  /** Enables the slow outward hover/focus ring ripple (off under reduced motion). */
  interactive?: boolean;
  /** Accessible label for standalone meaningful rounds; omit when decorative. */
  label?: string;
  className?: string;
};

/**
 * Signature visual motif: an end-grain log cross-section with organic growth rings,
 * darker heartwood centre, radial medullary rays, outer bark and a single radial check crack.
 */
export function EndGrainRound({
  swatch = DEFAULT_SWATCH,
  seed = 'heartwood',
  rings = 10,
  size,
  interactive = true,
  label,
  className = '',
}: EndGrainRoundProps) {
  const rand = mulberry32(hashSeed(seed));
  const phase1 = rand() * Math.PI * 2;
  const phase2 = rand() * Math.PI * 2;
  const pithX = 100 + (rand() - 0.5) * 9;
  const pithY = 100 + (rand() - 0.5) * 9;
  const crackAngle = (0.35 + rand() * 0.55) * Math.PI; // lower-right quadrant bias

  const outerPath = buildRingPath(100, 100, 92, 3.2, phase1, phase2, 40);
  const cambiumPath = buildRingPath(100, 100, 84, 2.8, phase1, phase2, 40);
  const heartRadius = 46;
  const heartPath = buildRingPath(pithX, pithY, heartRadius, 2.2, phase1 + 0.4, phase2 - 0.3, 32);

  const ringCount = Math.max(4, Math.min(20, rings));
  const ringPaths = Array.from({ length: ringCount }, (_, i) => {
    const t = (i + 1) / (ringCount + 1);
    const r = 7 + t * 74;
    const cx = pithX + (100 - pithX) * t;
    const cy = pithY + (100 - pithY) * t;
    const wobble = 0.8 + t * 2.1;
    return {
      index: i,
      d: buildRingPath(cx, cy, r, wobble, phase1 + t * 0.9, phase2 - t * 0.7, 32),
      isHeart: r <= heartRadius + 2,
      strokeWidth: i % 3 === 0 ? 1.55 : 1.05,
    };
  });

  // Medullary rays radiating gently from pith
  const rayCount = 12;
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i / rayCount) * Math.PI * 2 + phase1 * 0.2;
    const startR = 10 + (i % 3) * 6;
    const endR = 54 + (i % 4) * 7;
    return {
      x1: (pithX + Math.cos(angle) * startR).toFixed(1),
      y1: (pithY + Math.sin(angle) * startR).toFixed(1),
      x2: (pithX + Math.cos(angle) * endR).toFixed(1),
      y2: (pithY + Math.sin(angle) * endR).toFixed(1),
    };
  });

  // Single radial check crack from pith to outer rim
  const cMidAngle = crackAngle + 0.04;
  const crackTipX = (pithX + Math.cos(crackAngle) * 85).toFixed(1);
  const crackTipY = (pithY + Math.sin(crackAngle) * 85).toFixed(1);
  const crackL1X = (pithX + Math.cos(cMidAngle - 0.05) * 44).toFixed(1);
  const crackL1Y = (pithY + Math.sin(cMidAngle - 0.05) * 44).toFixed(1);
  const crackR1X = (pithX + Math.cos(cMidAngle + 0.05) * 44).toFixed(1);
  const crackR1Y = (pithY + Math.sin(cMidAngle + 0.05) * 44).toFixed(1);
  const crackEdgeLX = (pithX + Math.cos(crackAngle - 0.032) * 84).toFixed(1);
  const crackEdgeLY = (pithY + Math.sin(crackAngle - 0.032) * 84).toFixed(1);
  const crackEdgeRX = (pithX + Math.cos(crackAngle + 0.032) * 84).toFixed(1);
  const crackEdgeRY = (pithY + Math.sin(crackAngle + 0.032) * 84).toFixed(1);

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`${interactive ? 'end-grain-interactive' : ''} ${className}`.trim()}
    >
      {/* Rough outer bark */}
      <path d={outerPath} fill={swatch.heart} stroke="#23160C" strokeWidth="2.2" strokeLinejoin="round" />

      {/* Sapwood face */}
      <path d={cambiumPath} fill={swatch.base} stroke={swatch.grain} strokeWidth="1.5" />

      {/* Darker heartwood centre */}
      <path d={heartPath} fill={swatch.heart} fillOpacity="0.28" />

      {/* Medullary rays */}
      <g stroke={swatch.grain} strokeWidth="0.9" strokeLinecap="round" opacity="0.45">
        {rays.map((ray, i) => (
          <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
        ))}
      </g>

      {/* Growth rings */}
      <g fill="none" strokeLinecap="round">
        {ringPaths.map(ring => (
          <path
            key={ring.index}
            d={ring.d}
            className="egr-ring"
            style={{ '--ring-index': ring.index } as CSSProperties}
            stroke={ring.isHeart ? swatch.heart : swatch.grain}
            strokeWidth={ring.strokeWidth}
            opacity={ring.isHeart ? 0.85 : 0.72}
          />
        ))}
      </g>

      {/* Pith dot */}
      <circle cx={pithX.toFixed(1)} cy={pithY.toFixed(1)} r="3.4" fill={swatch.heart} />

      {/* Radial check crack — stays dark split wood in both light and dark modes */}
      <path
        d={`M ${pithX.toFixed(1)} ${pithY.toFixed(1)} L ${crackL1X} ${crackL1Y} L ${crackEdgeLX} ${crackEdgeLY} L ${crackTipX} ${crackTipY} L ${crackEdgeRX} ${crackEdgeRY} L ${crackR1X} ${crackR1Y} Z`}
        fill="#23160C"
        opacity="0.9"
      />
    </svg>
  );
}
