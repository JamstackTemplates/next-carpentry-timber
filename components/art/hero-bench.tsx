import { EndGrainRound } from './end-grain-round';

/**
 * Hero artwork: "Slab on the bench."
 * A large 17-ring end-grain log round leaning on a solid timber workbench in three-quarter view,
 * surrounded by a jack plane with curling shavings, marking gauge, carpenter's pencil and
 * half-open brass-hinged folding rule, with a pencilled dimension line across the slab.
 */
export function HeroBenchArt({
  foundedYear = 2009,
  className = '',
}: {
  foundedYear?: number;
  className?: string;
}) {
  const rings = 17;
  return (
    <figure className={`relative m-0 select-none ${className}`}>
      <svg
        viewBox="0 0 640 500"
        role="img"
        aria-label="Illustration of a freshly cut 17-ring timber slab resting on a joiner's workbench beside a hand plane, wood shavings, marking gauge, carpenter's pencil and folding rule."
        className="block w-full h-auto overflow-visible"
      >
        {/* Soft architectural construction grid behind the bench */}
        <g stroke="var(--line)" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.55">
          <line x1="50" y1="60" x2="600" y2="60" />
          <line x1="110" y1="30" x2="110" y2="440" />
          <line x1="560" y1="30" x2="560" y2="440" />
        </g>

        {/* Ground shadow beneath the workbench */}
        <ellipse cx="330" cy="462" rx="255" ry="20" fill="var(--text)" opacity="0.11" />

        {/* === JOINER'S WORKBENCH (3/4 perspective) === */}
        <g stroke="var(--text)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          {/* Back legs & lower stretcher */}
          <polygon points="102,320 132,320 132,448 102,448" fill="var(--band-deep)" />
          <polygon points="502,320 532,320 532,448 502,448" fill="var(--band-deep)" />
          <polygon points="132,402 502,402 502,422 132,422" fill="var(--band)" />

          {/* Front legs */}
          <polygon points="74,335 110,335 110,466 74,466" fill="var(--band)" />
          <polygon points="110,335 126,326 126,456 110,466" fill="var(--band-deep)" />
          <polygon points="518,335 554,335 554,466 518,466" fill="var(--band)" />
          <polygon points="554,335 570,326 570,456 554,466" fill="var(--band-deep)" />

          {/* Bench top surface */}
          <polygon points="36,300 106,248 614,248 584,300" fill="var(--band)" />
          {/* Bench top grain lines */}
          <path d="M84 265 C220 261, 390 270, 594 264" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.45" />
          <path d="M62 282 C200 288, 370 276, 588 283" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.45" />
          {/* Bench dog holes */}
          {[148, 224, 300, 520].map(x => (
            <polygon
              key={x}
              points={`${x},276 ${x + 14},276 ${x + 11},284 ${x - 3},284`}
              fill="var(--text)"
              opacity="0.72"
            />
          ))}

          {/* Thick bench front apron */}
          <polygon points="36,300 584,300 584,344 36,344" fill="var(--band-deep)" />
          {/* Right return side of top */}
          <polygon points="584,300 614,248 614,290 584,344" fill="var(--muted)" opacity="0.55" />

          {/* Front timber face vice with brass screw & bar */}
          <rect x="74" y="308" width="128" height="44" rx="2" fill="var(--band)" />
          <line x1="84" y1="322" x2="192" y2="322" stroke="var(--muted)" strokeWidth="1" opacity="0.5" />
          <circle cx="138" cy="330" r="10" fill="var(--brass)" />
          <circle cx="138" cy="330" r="4" fill="var(--brass-soft)" />
          <line x1="106" y1="354" x2="170" y2="310" stroke="var(--text)" strokeWidth="3.2" />
          <circle cx="106" cy="354" r="4.5" fill="var(--brass)" />
          <circle cx="170" cy="310" r="4.5" fill="var(--brass)" />
        </g>

        {/* === LARGE END-GRAIN SLAB LEANING ON THE BENCH === */}
        {/* Contact shadow on bench top */}
        <ellipse cx="384" cy="272" rx="122" ry="16" fill="var(--text)" opacity="0.16" />

        {/* Back thickness / bark cylinder depth behind the face */}
        <g transform="translate(262, 24)">
          <ellipse cx="144" cy="134" rx="128" ry="126" fill="#54331A" stroke="var(--text)" strokeWidth="1.8" />
          {/* Bark texture lines on the slab thickness */}
          <path d="M234 54 L252 60 M248 92 L266 96 M252 134 L270 136 M246 178 L264 178" stroke="#361E0D" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Signature EndGrainRound nested inside the hero scene */}
        <g transform="translate(248, 20)">
          <svg width="268" height="268" viewBox="0 0 200 200">
            <EndGrainRound
              seed="heartwood-hero-slab"
              rings={rings}
              swatch={{ base: '#E4C592', grain: '#9E6E38', heart: '#653C1D' }}
              interactive
            />
          </svg>
        </g>

        {/* === PENCILLED DIMENSION LINE ACROSS THE SLAB === */}
        <g stroke="var(--pencil)" strokeWidth="1.4" strokeLinecap="round" fill="none">
          {/* Witness lines */}
          <line x1="258" y1="36" x2="258" y2="10" strokeDasharray="3 3" opacity="0.8" />
          <line x1="506" y1="36" x2="506" y2="10" strokeDasharray="3 3" opacity="0.8" />
          {/* Main dimension bar */}
          <line x1="262" y1="18" x2="502" y2="18" />
          <path d="M270 13 L260 18 L270 23" />
          <path d="M494 13 L504 18 L494 23" />
        </g>
        <text
          x="382"
          y="14"
          textAnchor="middle"
          fontFamily="var(--font-pencil)"
          fontSize="24"
          fill="var(--pencil)"
        >
          Ø 680 mm · tasmanian blackwood
        </text>

        {/* Ring-count pencil pointer */}
        <g stroke="var(--muted)" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M222 146 Q250 144 276 154" />
          <path d="M270 149 L277 154 L268 157" />
        </g>
        <text
          x="214"
          y="138"
          textAnchor="end"
          fontFamily="var(--font-pencil)"
          fontSize="25"
          fill="var(--text)"
        >
          {rings} rings
        </text>
        <text
          x="214"
          y="160"
          textAnchor="end"
          fontFamily="var(--font-pencil)"
          fontSize="22"
          fill="var(--muted)"
        >
          building since {foundedYear}
        </text>

        {/* === JACK PLANE & CURLING SHAVINGS (left side of bench) === */}
        <g transform="translate(88, 224)" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Plane sole & cast-iron body */}
          <polygon points="8,44 132,44 140,34 140,48 8,48" fill="var(--muted)" />
          <path d="M12 44 L18 28 L128 28 L136 44 Z" fill="#3B312B" />
          {/* Wooden front knob */}
          <path d="M26 28 C23 18, 22 10, 31 10 C40 10, 39 18, 36 28 Z" fill="#7D412B" />
          {/* Plane iron & brass lever cap */}
          <polygon points="56,30 78,6 92,11 72,30" fill="#D5D0C8" />
          <polygon points="50,32 70,13 80,18 63,32" fill="var(--brass)" />
          {/* Rear wooden tote handle */}
          <path d="M100 30 C105 16, 118 6, 126 10 C131 13, 125 22, 120 30 C123 36, 126 40, 122 42 L98 42 Z" fill="#7D412B" />

          {/* Curling golden wood shavings spilling out of the throat */}
          <path
            d="M52 24 C38 8, 12 10, 14 23 C16 33, 30 32, 31 24 C32 18, 22 17, 21 22"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="2.4"
          />
          <path
            d="M44 38 C24 38, 0 42, -8 54 C-14 63, -2 70, 6 62 C12 56, 5 49, -1 53"
            fill="var(--band)"
            stroke="var(--text)"
            strokeWidth="1.4"
          />
          <path
            d="M78 48 C90 54, 106 52, 112 61 C116 68, 105 74, 98 67"
            fill="none"
            stroke="var(--brass-soft)"
            strokeWidth="2.2"
          />
        </g>

        {/* === WOODEN MARKING GAUGE (front-centre) === */}
        <g transform="translate(260, 274)" stroke="var(--text)" strokeWidth="1.45" strokeLinejoin="round">
          <rect x="0" y="9" width="112" height="10" rx="1.5" fill="var(--paper)" />
          {/* Fence block */}
          <rect x="26" y="0" width="24" height="28" rx="2.5" fill="#966239" />
          {/* Brass thumbscrew */}
          <circle cx="38" cy="14" r="4.5" fill="var(--brass)" />
          {/* Steel marking pin */}
          <line x1="100" y1="19" x2="100" y2="27" strokeWidth="1.8" />
        </g>

        {/* === FLAT CARPENTER'S PENCIL === */}
        <g transform="translate(388, 276) rotate(-8)" stroke="var(--text)" strokeWidth="1.4" strokeLinejoin="round">
          <polygon points="0,3 92,3 92,13 0,13" fill="var(--pencil)" />
          <polygon points="92,3 110,8 92,13" fill="var(--band)" />
          <polygon points="104,6.3 110,8 104,9.7" fill="var(--text)" />
          <line x1="12" y1="8" x2="80" y2="8" stroke="var(--paper)" strokeWidth="0.9" opacity="0.6" />
        </g>

        {/* === HALF-OPEN FOLDING RULE (front-right corner) === */}
        <g transform="translate(424, 306)" stroke="var(--text)" strokeWidth="1.45" strokeLinejoin="round">
          <polygon points="0,12 126,0 128,14 2,26" fill="var(--band)" />
          <polygon points="122,2 154,68 140,74 108,8" fill="var(--band-deep)" />
          {/* Ticks */}
          {[18, 34, 50, 66, 82, 98].map(x => (
            <line key={x} x1={x} y1={11 - x * 0.08} x2={x + 1} y2={17 - x * 0.08} strokeWidth="1" opacity="0.7" />
          ))}
          {/* Brass hinge */}
          <circle cx="122" cy="8" r="8.5" fill="var(--brass)" />
          <circle cx="122" cy="8" r="3" fill="var(--brass-soft)" />
        </g>
      </svg>
    </figure>
  );
}
